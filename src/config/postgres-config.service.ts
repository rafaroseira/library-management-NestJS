import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Book } from 'src/book/book.entity';
import { Employee } from 'src/employee/employee.entity';
import { Loan } from 'src/loan/loan.entity';
import { Student } from 'src/student/student.entity';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
    
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            host: this.configService.get<string>("DB_HOST"),
            port: this.configService.get<number>("DB_PORT"),
            username: this.configService.get<string>("DB_USERNAME"),
            password: this.configService.get<string>("DB_PASSWORD"),
            database: this.configService.get<string>("DB_NAME"),
            entities: [Book, Employee, Loan, Student],
            synchronize: true
        };
    }
}