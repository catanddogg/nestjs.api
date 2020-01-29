import { IsNumber } from "class-validator";

export class RequestGetBookByIdView{
    @IsNumber()
    public bookId: number;
}