import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('book')
export class BookController {

    constructor(private readonly bookService: BookService){}

    @Get("/")
    async findAll(){
        return await this.bookService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post("/new")
    async create(@Body(ValidationPipe) createBookDTO: CreateBookDTO, @Request() req){
        
        await this.bookService.create(createBookDTO, req.user.userId);

        return {
            statusCode: HttpStatus.CREATED,
            message: "Book successfully added"
        };
    }

    @Get("/search")
    async findByTitle(@Query("title") title: string){
        return await this.bookService.findByTitle(title);
    }

    @Get(":id")
    async findOne(@Param("id", ParseIntPipe) id: number){
        return await this.bookService.findOne(id);
    }

}