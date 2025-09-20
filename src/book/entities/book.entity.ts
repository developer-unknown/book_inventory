import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TechnicalSheet } from '../../technical-sheet/entities/technical-sheet.entity';

@Entity({ name: 'books' })
export class Book {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    title: string;

    @Column('varchar')
    author: string;

    @Column('varchar', {
        nullable: true,
    })
    gender: string;

    @OneToOne(
        () => TechnicalSheet,
        ( technicalSheet ) => technicalSheet.book,
        {
            cascade: true,
            eager: true,
        },
    )
    @JoinColumn()
    technicalSheet: TechnicalSheet;
}
