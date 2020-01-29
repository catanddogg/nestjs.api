import { Controller, Post, Get, Body, Request } from "@nestjs/common";
import { RequestGetBookByIdView } from "./view-models/request/request-get-book-by-id.view";
import { BookService } from "./book.service";
import { RequestAddBookView } from "./view-models/request/request-add-book.view";
import { RequestUpdateBookView } from "./view-models/request/request-update-book.view";
import { RequestDeleteBookView } from "./view-models/request/request-delete-book.view";

@Controller('book')
export class BookController{
    constructor(private readonly bookService: BookService){ }

    @Get('getBookById')
    async getBookById(@Body() requestModel: RequestGetBookByIdView, @Request() request){        
        let result = await this.bookService.getBookById(requestModel);

        return result;
    }

    @Get('getAllBooks')
    async getAllBooks(@Request() request){
        let result = await this.bookService.getAllBooks();
        
        return result;
    }

    @Post('addBook')
    async addBook(@Body() requestModel: RequestAddBookView, @Request() request){
        let result = await this.bookService.addBook(requestModel);

        return result;
    }

    @Post('updateBook')
    async updateBook(@Body() requestModel: RequestUpdateBookView, @Request() request){
        let result = await this.bookService.updateBook(requestModel);

        return result;
    }

    @Post('deleteBook')
    async deleteBook(@Body() requestModel: RequestDeleteBookView, @Request() request){
        let result = await this.bookService.deleteBook(requestModel);

        return result;
    }
}