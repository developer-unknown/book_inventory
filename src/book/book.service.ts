import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {

  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    try {
      const book = this.bookRepository.create(createBookDto);
      await this.bookRepository.save(createBookDto);
      return book;
    } catch (error) {
      this.handlerDBExceptions( error );
    }
  }

  async findAll() {
    return await this.bookRepository.find({
      relations: {
        technicalSheet: true,
      },
    });
  }

  async findAuthor( author: string ) {
    return await this.bookRepository.find({
      where: {author},
    })
  }

  async findGender( gender: string ) {
    return await this.bookRepository.find({
      where: {gender},
    })
  }

  async findDate( date: string ) {
    return this.bookRepository
      .createQueryBuilder('book')
      .innerJoinAndSelect('book.technicalSheet', 'technicalSheet')
      .where('technicalSheet.publicationDate > :date', { date })
      .getMany();
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOneBy({ id });

    if ( !book )
      throw new NotFoundException(`The book with id ${ id } does not exist`);

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({id, ...updateBookDto});

    if ( !book )
      throw new NotFoundException(`The book with id ${ id } does not exist`);

    try {
      await this.bookRepository.save(book);
      return book;
    } catch (error) {
      this.handlerDBExceptions( error );
    }
  }

  async remove(id: number) {
    const book = await this.findOne( id );
    await this.bookRepository.remove( book );
  }

  private handlerDBExceptions( error: any ) {
    if ( error.sqlState === '23000' )
      throw new ConflictException( error.sqlMessage );

    console.log(`Error en la insercion: ${ error }`);
  }
}
