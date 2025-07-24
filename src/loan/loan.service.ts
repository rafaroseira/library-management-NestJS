import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from './loan.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employee/employee.entity';
import { Book } from 'src/book/book.entity';
import { Student } from 'src/student/student.entity';
import { CreateLoanDTO } from './dto/create-loan.dto';

@Injectable()
export class LoanService {

    constructor(@InjectRepository(Loan) private loanRepository: Repository<Loan>,
                @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
                @InjectRepository(Book) private bookRepository: Repository<Book>,
                @InjectRepository(Student) private studentRepository: Repository<Student>){}

    async create(createLoanDTO: CreateLoanDTO){

        const employee = await this.employeeRepository.findOneBy({id: createLoanDTO.employeeId});
        const book = await this.bookRepository.findOneBy({id: createLoanDTO.bookId});
        const student = await this.studentRepository.findOneBy({id: createLoanDTO.studentId});

        if(!employee) throw new NotFoundException("Employee not found");
        if(!book) throw new NotFoundException("Book not found");
        if(!student) throw new NotFoundException("Student not found");
        if(book.availableCopies === 0) throw new BadRequestException("The requested book has no copies available");

        return this.loanRepository.manager.transaction(async (manager) => {
            book.availableCopies--;
            await manager.save(book);
            return manager.save(new Loan(employee, book, student));
          });

    }

    async close(id: number) {
        const loan = await this.loanRepository.findOne({
          where: { id },
          relations: {
            book: true
          }
        });
    
        if (!loan) throw new NotFoundException("Loan not found");
        if (loan.returnedAt) throw new BadRequestException("Loan already closed");
    
        await this.loanRepository.manager.transaction(async (manager) => {
          loan.returnedAt = new Date();
          loan.book.availableCopies++;
          
          await manager.save(loan);
          await manager.save(loan.book);
        });
    }
    
}
