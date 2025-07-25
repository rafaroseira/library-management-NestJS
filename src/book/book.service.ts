import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Like, Repository } from 'typeorm';
import { CreateBookDTO } from './dto/create-book.dto';
import { Employee } from 'src/employee/employee.entity';

@Injectable()
export class BookService {

    constructor(@InjectRepository(Book) private bookRepository: Repository<Book>,
                @InjectRepository(Employee) private employeeRepository: Repository<Employee>){}

    async create(createBookDTO: CreateBookDTO, employeeId: number){

        const employee = await this.employeeRepository.findOneBy({id: employeeId});
        
        if(!employee) throw new NotFoundException("Employee not found");

        const book = new Book(
            createBookDTO.title,
            createBookDTO.author,
            createBookDTO.totalCopies,
            employee
        );

        await this.bookRepository.save(book);

    }

    async findByTitle(title: string){
        const books = await this.bookRepository.findBy({title: Like(`%${title}%`)});
        return books;
    }

    async findAll(){
        const books = await this.bookRepository.find();
        return books;
    }

    async findOne(id: number){
        const book = await this.bookRepository.findOneBy({id});
        return book;
    }

}
