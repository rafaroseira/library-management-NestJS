import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){}

    async validateEmployee(email: string, password: string){

        const employee = await this.employeeRepository.findOne({
            where: { email }
        });

        if(employee && employee.password === password){
            const { password, ...rest } = employee;
            return rest;
        }

        return null;
    }
}
