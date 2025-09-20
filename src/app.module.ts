import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { TechnicalSheetModule } from './technical-sheet/technical-sheet.module';
import { Book } from './book/entities/book.entity';
import { TechnicalSheet } from './technical-sheet/entities/technical-sheet.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BookModule,
    TechnicalSheetModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Book, TechnicalSheet],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
