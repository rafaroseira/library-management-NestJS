import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './loan.entity';
import { Employee } from 'src/employee/employee.entity';
import { Book } from 'src/book/book.entity';
import { Student } from 'src/student/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, Employee, Book, Student])],
  providers: [LoanService],
  controllers: [LoanController]
})
export class LoanModule {}
