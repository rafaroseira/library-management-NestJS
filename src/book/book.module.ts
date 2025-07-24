import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Employee } from 'src/employee/employee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Employee])],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
