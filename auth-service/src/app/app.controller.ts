import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AppService } from './app.service';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  health() {
    return {
      service: 'auth-service',
      status: 'running',
      port: 3001,
    };
  }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.appService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.appService.login(dto);
  }
}