import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { BookModule } from './book/book.module';
import { StudentModule } from './student/student.module';
import { LoanModule } from './loan/loan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database } from './config/databaseConfig';

@Module({
  imports: [EmployeeModule, BookModule, StudentModule, LoanModule, TypeOrmModule.forRoot(database)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
