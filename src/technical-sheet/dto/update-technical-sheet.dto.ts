import { PartialType } from '@nestjs/mapped-types';
import { CreateTechnicalSheetDto } from './create-technical-sheet.dto';

export class UpdateTechnicalSheetDto extends PartialType(CreateTechnicalSheetDto) {}
