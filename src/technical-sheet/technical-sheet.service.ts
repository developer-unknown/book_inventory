import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTechnicalSheetDto } from './dto/update-technical-sheet.dto';
import { TechnicalSheet } from './entities/technical-sheet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class TechnicalSheetService {

  constructor(
    @InjectRepository(TechnicalSheet)
    private readonly technicalSheetRepository: Repository<TechnicalSheet>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async findOne(isbn: string) {
    const technicalSheet = await this.technicalSheetRepository.findOneBy({ isbn });

    if ( !technicalSheet )
      throw new NotFoundException(`The technical sheet with isbn ${ isbn } does not exist`);

    const { id } = technicalSheet;
    const book = this.bookRepository.findOneBy({ technicalSheet: {id} 
    });

    return book;
  }

  async update(id: number, updateTechnicalSheetDto: UpdateTechnicalSheetDto) {
    const technicalSheet = await this.technicalSheetRepository.preload({id, ...updateTechnicalSheetDto});

    if ( !technicalSheet )
      throw new NotFoundException(`The technical sheet with id ${ id } does not exist`);

    try {
      await this.technicalSheetRepository.save(technicalSheet);
      return technicalSheet;
    } catch (error) {
      console.log('Error en la actualizacion');
    }
  }
}
