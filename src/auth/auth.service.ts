import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
                                            private jwtService: JwtService){}

    async validateEmployee(email: string, password: string){

        const employee = await this.employeeRepository.findOneBy({email});

        if(employee && employee.password === password){
            const { password, ...rest } = employee;
            return rest;
        }

        return null;
    }

    async login(employee: any) {
        const payload = { email: employee.email, sub: employee.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
