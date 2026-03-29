import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from './schema/admin.schema';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME;
    const adminRole = process.env.ADMIN_ROLE || 'admin';

    if (!adminEmail || !adminPassword || !adminName) {
      throw new Error(
        'ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_NAME must be set in .env',
      );
    }

    const existingAdmin = await this.adminModel.findOne({ email: adminEmail });

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    if (!existingAdmin) {
      await this.adminModel.create({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: adminRole,
      });

      console.log('✅ Admin created');
    } else {
      // 🔥 Always sync password + role with ENV
      existingAdmin.password = hashedPassword;
      existingAdmin.role = adminRole;

      await existingAdmin.save();

      console.log('♻️ Admin updated from ENV');
    }
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ email });
  }

  async adminLogin(email: string, password: string) {
    const admin = await this.findByEmail(email);

    if (!admin) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: admin._id,
      email: admin.email,
      role: admin.role, // ✅ FIXED
    };

    const expiresInSeconds = 60 * 60 * 24;

    const token = this.jwtService.sign(payload, {
      expiresIn: expiresInSeconds,
    });

    return {
      access_token: token,
      expiresIn: expiresInSeconds,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  }
}
