import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/employee/employee.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmployeeService } from 'src/employee/employee.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    PassportModule,
    JwtModule.register({
      secret: "SECRET",
      signOptions: { expiresIn: "1m" }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, EmployeeService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
