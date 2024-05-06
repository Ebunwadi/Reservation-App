import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';

@Injectable()
export class NotificationsService {
  constructor(private readonly configService: ConfigService) {}

  private readonly transporter = nodemailer.createTransport({
    service: this.configService.get('MAIL_SERVICE'),
    auth: {
      user: this.configService.get('MAIL_USER'),
      pass: this.configService.get('MAIL_PASSWORD'),
    },
  });

  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get('MAIL_USER'),
      to: email,
      subject: 'Reservation App Notification',
      text,
    });
  }
}
