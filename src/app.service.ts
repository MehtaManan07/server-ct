import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): Record<string, string> {
    return { status: 'Healthy as a horse!' + process.env.PG_HOST };
  }
}
