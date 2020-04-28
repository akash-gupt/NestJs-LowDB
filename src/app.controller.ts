import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LowdbService } from './lowdb/lowdb.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller()
export class AppController {
  constructor(private readonly lowdbService: LowdbService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { email, name, password } = body;
    const isUserExist = await this.lowdbService.find({ email }, 'auths');
    if (isUserExist) {
      throw new HttpException(
        `You are already registered with us.`,
        HttpStatus.NOT_ACCEPTABLE,
      );
    }

    const createdUser = await this.lowdbService.add(body, 'auths');
    return createdUser;
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const user = await this.lowdbService.find({ email, password }, 'auths');
    if (!user) {
      throw new HttpException(
        `You are not registered with us.`,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
