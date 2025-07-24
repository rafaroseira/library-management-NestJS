import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  constructor(name: string, RA: string, phone: string){
    this.name = name;
    this.RA = RA;
    this.phone = phone;
  }
}