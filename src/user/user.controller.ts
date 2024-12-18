import {
  Controller,
  Res,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.userService.registerUser(email, password);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const user = await this.userService.loginUser(email, password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }
    const token = this.authService.login(user);

    response.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Enable secure cookies in production
      sameSite: 'strict',
    });

    // Return the user object with token
    return {
      user: {
        id: user._id,
        email: user.email,
      },
    };
    return this.authService.login(user);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.userService.resetPassword(email, oldPassword, newPassword);
  }
}
