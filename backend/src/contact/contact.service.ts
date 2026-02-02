import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

const DAILY_MESSAGE_LIMIT = 10;

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name)
    private readonly contactModel: Model<Contact>,
  ) {}

  // Public: create contact message (24h limit)
  async create(data: CreateContactDto) {
    const last24Hours = new Date();
    last24Hours.setHours(last24Hours.getHours() - 24);

    const count = await this.contactModel.countDocuments({
      createdAt: { $gte: last24Hours },
    });

    if (count >= DAILY_MESSAGE_LIMIT) {
      throw new BadRequestException(
        'Daily message limit reached. Please try again later.',
      );
    }

    return this.contactModel.create(data);
  }

  // Admin: get all messages
  findAll() {
    return this.contactModel.find().sort({ createdAt: -1 });
  }

  // Admin: mark message as read
  async markAsRead(id: string) {
    const message = await this.contactModel.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    );

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return message;
  }

  // Admin: delete message
  async remove(id: string) {
    const deleted = await this.contactModel.findByIdAndDelete(id);

    if (!deleted) {
      throw new NotFoundException('Message not found');
    }

    return { success: true };
  }
}
