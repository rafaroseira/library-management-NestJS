import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateBookDTO {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNumber()
    @Min(1)
    totalCopies: number;

}