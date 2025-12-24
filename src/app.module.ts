import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '@presentation/controllers/auth/auth.module';
import { PrismaModule } from '@infrastructure/config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
