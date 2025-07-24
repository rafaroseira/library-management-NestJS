import { Body, Controller, Get, HttpStatus, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';

@Controller('book')
export class BookController {

    constructor(private readonly bookService: BookService){}

    @Get("/")
    async findAll(){
        return await this.bookService.findAll();
    }

    @Post("/new")
    async create(@Body(ValidationPipe) createBookDTO: CreateBookDTO){
        await this.bookService.create(createBookDTO);

        return {
            statusCode: HttpStatus.CREATED,
            message: "Book successfuly added"
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