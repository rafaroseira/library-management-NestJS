import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './dto/create-student.dto';

@Injectable()
export class StudentService {

    constructor(@InjectRepository(Student) private StudentRepository: Repository<Student>){}

    async create(createStudentDTO: CreateStudentDTO){
        
        const student = new Student(
            createStudentDTO.name,
            createStudentDTO.RA,
            createStudentDTO.phone
        );

        await this.StudentRepository.save(student);
    }
}
