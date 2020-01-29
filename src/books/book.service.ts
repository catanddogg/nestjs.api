import { Injectable } from "@nestjs/common";
import { ResponseGetBookByIdView } from "./view-models/response/response-get-book-by-id.view";
import { RequestGetBookByIdView } from "./view-models/request/request-get-book-by-id.view";
import { BaseResultView } from "src/base-models/base-result.view";
import { InjectRepository } from "@nestjs/typeorm";
import { Book } from "./book.entity";
import { BookRepository } from "./book.repository";
import { ResponseGetAllBooksView } from "./view-models/response/response-get-all-books.view";
import { RequestAddBookView } from "./view-models/request/request-add-book.view";
import { RequestDeleteBookView } from "./view-models/request/request-delete-book.view";
import { RequestUpdateBookView } from "./view-models/request/request-update-book.view";

@Injectable()
export class BookService{
 constructor(
     @InjectRepository(Book)
     private readonly bookRepository: BookRepository){ }

 async getBookById(requestModel: RequestGetBookByIdView): Promise<BaseResultView<ResponseGetBookByIdView>>{
    let result = new BaseResultView<ResponseGetBookByIdView>();

    let book = await this.bookRepository.findOne(requestModel.bookId);

    if(book == null){
        result.isSuccess = false;
        result.message = "book not found";
    }

    result.data = new ResponseGetBookByIdView();

    result.data.id = book._id.toString();
    result.data.image = book.image;
    result.data.price = book.price;
    result.data.ratingList = book.ratingList;
    result.data.title = book.title;
    result.data.description = book.description;
    result.data.authorListId = book.authorListId;    

    result.isSuccess = true;
    result.message = "book get successfully";
    
    return result;
 }

 async getAllBooks():Promise<BaseResultView<ResponseGetAllBooksView>> {
    let result = new BaseResultView<ResponseGetAllBooksView>();

    let books = await this.bookRepository.find();

    if(books === null){
         result.isSuccess = false;
         result.message = "books not found";

         return result;
    }
    
    result.data =  new ResponseGetAllBooksView();

    result.data.books = books;

    result.isSuccess = true;
    result.message = "books get successfully";

    return result;
 }

 async addBook(requestModel: RequestAddBookView): Promise<BaseResultView> {
    let result = new BaseResultView();

    let book =  new Book();
    book.title = requestModel.title;
    book.description = requestModel.description;
    book.image = requestModel.image;
    book.price = requestModel.price;
    book.ratingList = requestModel.ratingList;
    book.authorListId = requestModel.authorListId;

    let insertData = await this.bookRepository.insert(book);        

    if(insertData == null){
        result.isSuccess = false;
        result.message = "book not insert";

        return result;
    }

    result.isSuccess = true;
    result.message = "book successfully inserted";

    return result;
 }

 async updateBook(requestModel: RequestUpdateBookView): Promise<BaseResultView>{
    let result = new BaseResultView();

    let book = await this.bookRepository.findOne(requestModel.id);

    if(book == null){
        result.isSuccess = false;
        result.message = "book not found";

        return result;
    }

    if(requestModel.image !== "" && requestModel.image !== undefined){
        book.image = requestModel.image;
    }
    if(requestModel.price !== 0 && requestModel.price !== undefined){
        book.price = requestModel.price;
    }
    if(requestModel.title !== "" && requestModel.title !== undefined){
        book.title = requestModel.title;
    }
    if(requestModel.description !== "" && requestModel.description !== undefined){
        book.description = requestModel.description;
    }
    if(requestModel.authorListId !== 0 && requestModel.authorListId !== undefined){
        book.authorListId = requestModel.authorListId;
    } 

    await this.bookRepository.update(book._id.toString(), book);

    result.isSuccess = true;
    result.message = "book successfully updated";

    return result;
 }

 async deleteBook(requestModel: RequestDeleteBookView): Promise<BaseResultView> {
    let result = new BaseResultView();
     
    let deleteResult =  await this.bookRepository.delete(requestModel.bookId);

    if(deleteResult == null){
        result.isSuccess = false;
        result.message = "book not found";

        return result;
    }  

    result.isSuccess = true;
    result.message = "book successfully removed";    

    return result;
 }
}