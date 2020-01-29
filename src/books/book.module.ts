import { Module } from "@nestjs/common";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookRepository } from "./book.repository";

@Module({
    imports: [TypeOrmModule.forFeature([BookRepository])],
    exports: [TypeOrmModule],
    providers: [BookService],
    controllers: [BookController]
})
export class BookModule { }