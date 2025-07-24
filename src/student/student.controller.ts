import { Body, Controller, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create-student.dto';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService){}

    @Post("/new")
    async create(@Body(ValidationPipe) createStudentDTO: CreateStudentDTO){
        await this.studentService.create(createStudentDTO);
        
        return {
            statusCode: HttpStatus.CREATED,
            message: "Student successfully created"
        };
    }
}
