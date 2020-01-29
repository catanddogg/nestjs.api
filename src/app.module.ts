import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './books/book.entity';
import { BookModule } from './books/book.module';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mongodb',
    host: 'localhost',
    port:  27017,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    database: 'bookstoredb',
    entities: [Book, User],
    synchronize: true   
  }),
  BookModule,
  UserModule
],
})
export class AppModule {}
