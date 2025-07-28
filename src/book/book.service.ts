import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Like, Repository } from 'typeorm';
import { CreateBookDTO } from './dto/create-book.dto';
import { Employee } from 'src/employee/employee.entity';
import { UpdateBookDTO } from './dto/update-book.dto';

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

    async update(updateBookDTO: UpdateBookDTO, id: number){

        let book = await this.bookRepository.findOneBy({id});

        if(!book) throw new NotFoundException("Book not found");

        if(updateBookDTO.title !== undefined) book.title = updateBookDTO.title;
        if(updateBookDTO.author !== undefined) book.author = updateBookDTO.author;

        if(updateBookDTO.totalCopies !== undefined && updateBookDTO.totalCopies !== book.totalCopies){

            let currentTotalCopies: number = book.totalCopies;
            let newTotalCopies: number = updateBookDTO.totalCopies;

            if(newTotalCopies > currentTotalCopies){

                book.availableCopies += (newTotalCopies - currentTotalCopies);
                
            } else {

                let copiesLoaned:number = book.totalCopies - book.availableCopies;
                if(!(newTotalCopies >= copiesLoaned)) throw new BadRequestException("Not possible to update total copies while number of loaned copies is greater than the new total copies");

                book.availableCopies -= (Math.abs(newTotalCopies - currentTotalCopies));
                if(book.availableCopies < 0) book.availableCopies = 0;            
            
            }

            book.totalCopies = newTotalCopies;
        }

        await this.bookRepository.save(book);
    }

}
