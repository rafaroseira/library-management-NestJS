import { Book } from 'src/book/book.entity';
import { Student } from 'src/student/student.entity';
import { Employee } from 'src/employee/employee.entity';
import { Loan } from 'src/loan/loan.entity';
import { DataSourceOptions } from 'typeorm';

export const database: DataSourceOptions = {
    type: "sqlite",
    database: "db.sqlite",
    synchronize: true,
    logging: true,
    entities: [Employee, Book, Student, Loan]
};