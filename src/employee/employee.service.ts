import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {

    private readonly SALT_ROUNDS = 12;

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){}

    async create(createEmployeeDTO: CreateEmployeeDTO) {

        const hashedPassword = await bcrypt.hash(
            createEmployeeDTO.password, 
            this.SALT_ROUNDS
          );

        const employee = new Employee(
            createEmployeeDTO.name,
            createEmployeeDTO.email,
            hashedPassword
        );
        
        await this.employeeRepository.save(employee);
        
    }
}
