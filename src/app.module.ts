import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { ProtectedController } from './auth/protected.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    UserModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    TestController,
    ProtectedController, // Make sure ProtectedController is included
  ],
  providers: [AppService],
})
export class AppModule {}
