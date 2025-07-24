import { IsNumber } from "class-validator";

export class CreateLoanDTO {

    @IsNumber()
    employeeId: number;

    @IsNumber()
    bookId: number;

    @IsNumber()
    studentId: number;

}