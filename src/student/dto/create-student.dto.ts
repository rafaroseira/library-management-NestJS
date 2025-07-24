import { IsNotEmpty, IsNumberString, IsString, MaxLength, MinLength } from "class-validator";

export class CreateStudentDTO {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(7)
    @MinLength(7)
    RA: string

    @IsNumberString()
    @IsNotEmpty()
    @MaxLength(11)
    @MinLength(11)
    phone: string;

}