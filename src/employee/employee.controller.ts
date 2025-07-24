import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDTO } from './dto/create-employee.dto';

@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService){}

    @Post("/new")
    async create(@Body(ValidationPipe) createEmployeeDTO: CreateEmployeeDTO){
        await this.employeeService.create(createEmployeeDTO);

        return {
            statusCode: HttpStatus.CREATED,
            message: "Account successfully created"
        };
    }

}
