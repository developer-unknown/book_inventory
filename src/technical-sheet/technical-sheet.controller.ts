import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TechnicalSheetService } from './technical-sheet.service';
import { CreateTechnicalSheetDto } from './dto/create-technical-sheet.dto';
import { UpdateTechnicalSheetDto } from './dto/update-technical-sheet.dto';

@Controller('technical-sheet')
export class TechnicalSheetController {
  constructor(private readonly technicalSheetService: TechnicalSheetService) {}

  @Get(':isbn')
  findOne(@Param('isbn') isbn: string) {
    return this.technicalSheetService.findOne( isbn );
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTechnicalSheetDto: UpdateTechnicalSheetDto) {
    return this.technicalSheetService.update(id, updateTechnicalSheetDto);
  }
  
}
