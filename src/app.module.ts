import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { BookModule } from './book/book.module';
import { StudentModule } from './student/student.module';
import { LoanModule } from './loan/loan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from './config/databaseConfig';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    EmployeeModule,
    BookModule, 
    StudentModule, 
    LoanModule, 
    TypeOrmModule.forRoot(database), 
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, 
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('30m')
      })
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
