import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  private users: { email: string; password: string }[] = [];

  constructor(private readonly jwtService: JwtService) {}

  async register(dto: any) {
    const existingUser = this.users.find((user) => user.email === dto.email);

    if (existingUser) {
      return {
        message: 'User already exists',
      };
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = {
      email: dto.email,
      password: hash,
    };

    this.users.push(user);

    return {
      message: 'User registered',
      email: user.email,
    };
  }

  async login(dto: any) {
    const user = this.users.find((u) => u.email === dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, role: 'patient' };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}