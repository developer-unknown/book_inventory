import { IsDateString, IsOptional, IsPositive, IsString, Matches } from "class-validator";

export class CreateTechnicalSheetDto {


    @Matches(/^\d{3}-\d{1,5}-\d{1,7}-\d{1,7}-\d{1}$/)
    isbn: string;

    @IsOptional()
    @IsString()
    editorial: string;


    @IsDateString()
    publicationDate: string;

    @IsPositive()
    numPags: number;
}
