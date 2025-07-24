import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDTO } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){}

    async create(createEmployeeDTO: CreateEmployeeDTO) {

        const employee = new Employee(
            createEmployeeDTO.name,
            createEmployeeDTO.email,
            createEmployeeDTO.password
        );
        
        await this.employeeRepository.save(employee);
        
    }
}
