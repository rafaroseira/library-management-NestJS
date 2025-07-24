import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/employee/employee.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>,
                                            private jwtService: JwtService){}

    async validateEmployee(email: string, password: string){

        const employee = await this.employeeRepository.findOneBy({email});
        if(!employee) throw new UnauthorizedException("Invalid credentials");

        const match = await bcrypt.compare(password, employee.password)
        if (!match) throw new UnauthorizedException('Invalid credentials');

        const { password: _  , ...rest } = employee;

        return rest;
    }

    async login(employee: any) {
        const payload = { email: employee.email, sub: employee.id };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
