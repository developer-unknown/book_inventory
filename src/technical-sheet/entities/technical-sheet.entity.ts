import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from '../../book/entities/book.entity';

@Entity({ name: 'technical_sheets' })
export class TechnicalSheet {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar', {
        unique: true,
    })
    isbn: string;

    @Column('varchar', {
        nullable: true,
    })
    editorial: string;

    @Column('date')
    publicationDate: string;

    @Column('int')
    numPags: number;

    @OneToOne(
        () => Book, (book) => book.technicalSheet,
    )
    book: Book;
}
