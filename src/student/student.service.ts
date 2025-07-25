import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDTO } from './dto/create-student.dto';
import { Employee } from 'src/employee/employee.entity';

@Injectable()
export class StudentService {

    constructor(@InjectRepository(Student) private studentRepository: Repository<Student>,
                @InjectRepository(Employee) private employeeRepository: Repository<Employee>){}

    async create(createStudentDTO: CreateStudentDTO, employeeId: number){

        if(await this.studentRepository.existsBy({ RA: createStudentDTO.RA })) throw new BadRequestException("Student already exists");

        const employee = await this.employeeRepository.findOneBy({id: employeeId});

        if(!employee) throw new NotFoundException("Employee not found");
        
        const student = new Student(
            createStudentDTO.name,
            createStudentDTO.RA,
            createStudentDTO.phone,
            employee
        );

        await this.studentRepository.save(student);
    }
}
