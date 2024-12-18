import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard'; // Make sure to import the JWT guard

@Controller('protected')
export class ProtectedController {
  @UseGuards(JwtAuthGuard) // Protect this route using JwtAuthGuard
  @Get()
  getProtectedResource() {
    return { message: 'You accessed a protected route!' };
  }
}
