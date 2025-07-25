import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Employee } from 'src/employee/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Employee])],
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule {}
