import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AppController {
  @Get('health')
  health() {
    return {
      service: 'auth-service',
      status: 'running',
      port: 3001,
    };
  }
}