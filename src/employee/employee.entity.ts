import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false})
  email: string;

  @Column({ nullable: false })
  password: string;

  constructor(name: string, email: string, password: string){
    this.name = name;
    this.email = email,
    this.password = password;
  }

}