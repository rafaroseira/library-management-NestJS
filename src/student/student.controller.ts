import { Body, Controller, HttpStatus, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDTO } from './dto/create-student.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService){}

    @UseGuards(JwtAuthGuard)
    @Post("/new")
    async create(@Body(ValidationPipe) createStudentDTO: CreateStudentDTO, @Request() req){
        await this.studentService.create(createStudentDTO, req.user.userId);
        
        return {
            statusCode: HttpStatus.CREATED,
            message: "Student successfully created"
        };
    }
}
