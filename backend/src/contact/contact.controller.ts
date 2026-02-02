import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  // 🔓 PUBLIC — submit contact form
  @Post()
  submit(@Body() body: CreateContactDto) {
    return this.contactService.create(body);
  }

  // 🔐 ADMIN — fetch all messages
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get('admin/all')
  getAllAdmin() {
    return this.contactService.findAll();
  }

  // 🔐 ADMIN — mark message as read
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch('admin/:id/read')
  markRead(@Param('id') id: string) {
    return this.contactService.markAsRead(id);
  }

  // 🔐 ADMIN — delete message
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
