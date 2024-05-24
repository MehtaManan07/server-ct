import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHealth(): Record<string, string> {
    return {
      status:
        'Healthy as a horse!' + this.configService.get<string>('database.host'),
    };
  }
}
