import { Module } from '@nestjs/common';
import { TechnicalSheetService } from './technical-sheet.service';
import { TechnicalSheetController } from './technical-sheet.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalSheet } from './entities/technical-sheet.entity';
import { BookModule } from 'src/book/book.module';

@Module({
  imports: [
    BookModule,
    TypeOrmModule.forFeature([TechnicalSheet]),
  ],
  controllers: [TechnicalSheetController],
  providers: [TechnicalSheetService],
})
export class TechnicalSheetModule {}
