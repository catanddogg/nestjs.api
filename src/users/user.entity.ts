import { Entity, Column, PrimaryGeneratedColumn, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id: number;
     
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    email: string;

    @Column()
    name : string;
    
    @Column()
    password : string;
}