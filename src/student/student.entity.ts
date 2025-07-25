import { Employee } from 'src/employee/employee.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity("students")
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  RA: string;

  @Column({ nullable: false })
  phone: string;

  @ManyToOne(() => Employee, {
    eager: false,
    cascade: false,
    onDelete: "RESTRICT",
    nullable: false
  })
  @JoinColumn({name: "added_by"})
  addedBy: Employee;

  constructor(name: string, RA: string, phone: string, employee: Employee){
    this.name = name;
    this.RA = RA;
    this.phone = phone;
    this.addedBy = employee;
  }
}