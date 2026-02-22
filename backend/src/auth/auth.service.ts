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
    const adminRole = process.env.ADMIN_ROLE;

    if (!adminEmail || !adminPassword || !adminName) {
      throw new Error(
        'ADMIN_EMAIL, ADMIN_PASSWORD, and ADMIN_NAME must be set in .env',
      );
    }

    const adminExists = await this.adminModel.findOne({ email: adminEmail });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const admin = new this.adminModel({
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: adminRole,
      });
      await admin.save();
      console.log('Admin user created from ENV');
    } else {
      console.log('Admin already exists');
    }
  }

  async findByEmail(email: string) {
    return this.adminModel.findOne({ email });
  }

  async adminLogin(email: string, password: string) {
    const admin = await this.findByEmail(email);
    if (!admin) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid email or password');

    // ✅ Create JWT payload
    const payload = { sub: admin._id, email: admin.email, role: 'admin' };
    const expiresInSeconds = 60 * 60 * 24; // 1 day
    const token = this.jwtService.sign(payload, {
      expiresIn: expiresInSeconds,
    });
    // ✅ Return token + admin details
    return {
      access_token: token,
      expiresIn: expiresInSeconds, // in seconds
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    };
  }
}
