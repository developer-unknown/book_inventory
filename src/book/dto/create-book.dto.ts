import { CreateTechnicalSheetDto } from 'src/technical-sheet/dto/create-technical-sheet.dto';
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateBookDto {

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    author: string;

    @IsOptional()
    @IsString()
    gender: string;

    @ValidateNested()
    @Type(
        () => CreateTechnicalSheetDto,
    )
    technicalSheet: CreateTechnicalSheetDto;
}
