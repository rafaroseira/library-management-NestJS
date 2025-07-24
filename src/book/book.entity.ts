import { Employee } from 'src/employee/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity("books")
export class Book {

  constructor(title: string, author: string, totalCopies: number, employee: Employee){
    this.title = title;
    this.author = author;
    this.totalCopies = totalCopies;
    this.availableCopies = totalCopies;
    this.addedBy = employee;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ name: "total_copies", nullable: false })
  totalCopies: number;

  @Column({ name: "available_copies", nullable: false })
  availableCopies: number;

  @ManyToOne(() => Employee, {
    eager: false,
    cascade: false,
    onDelete: "RESTRICT",
    nullable: false
  })
  @JoinColumn({ name: "added_by" })
  addedBy: Employee;

}