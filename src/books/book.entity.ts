import { Entity, Column, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book{

    @PrimaryGeneratedColumn()
    id: number;
     
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    price: number;

    @Column()
    image: string;

    @Column()
    authorListId: number;

    @Column()
    ratingList: [];
}