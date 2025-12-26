import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from '@infrastructure/config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@presentation/controllers/auth/auth.module';
import { DepartmentModule } from '@presentation/controllers/department/department.module';
import { EmployeeModule } from '@presentation/controllers/employee/employee.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    DepartmentModule,
    EmployeeModule
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
