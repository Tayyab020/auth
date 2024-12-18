import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';
import { ProtectedController } from './protected.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'tayyab', // Replace with environment variable in production
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule), // Use forwardRef for circular dependency
  ],
  controllers: [ProtectedController], // Register the controller
  providers: [AuthService, JwtStrategyService],
  exports: [AuthService],
})
export class AuthModule {}
