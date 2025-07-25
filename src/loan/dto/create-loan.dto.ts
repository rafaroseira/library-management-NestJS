import { IsNumber } from "class-validator";

export class CreateLoanDTO {

    @IsNumber()
    bookId: number;

    @IsNumber()
    studentId: number;

}