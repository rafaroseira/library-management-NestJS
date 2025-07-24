import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { Employee } from '../employee/employee.entity';
import { Book } from "../book/book.entity";
import { Student } from "../student/student.entity";

@Entity("loans")
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, {
    eager: false,
    cascade: false,
    onDelete: "RESTRICT",
    nullable: false
  })
  @JoinColumn({ name: "employee_id" })
  employee: Employee;

  @ManyToOne(() => Book, {
    eager: false,
    cascade: false,
    onDelete: "RESTRICT",
    nullable: false
  })
  @JoinColumn({ name:"book_id" })
  book: Book;

  @ManyToOne(() => Student, {
    eager: false,
    cascade: false,
    onDelete: "RESTRICT",
    nullable: false
  })
  @JoinColumn({ name: "student_id" })
  student: Student;

  @Column({ name: "loan_date", type: "date", nullable: false })
  loanDate: Date;

  @Column({ name:"due_date", type: "date", nullable: false })
  dueDate: Date;

  @Column({ name:"returned_at", type: "date", nullable: true })
  returnedAt: Date;

  constructor(employee: Employee, book: Book, student: Student){
    this.employee = employee;
    this.book = book;
    this.student = student;
    this.loanDate = new Date();
    this.dueDate = new Date(this.loanDate);
    this.dueDate.setDate(this.loanDate.getDate() + 7);
  }
}