export class ResponseGetAllBooksView{
    public books: Array<ResponseGetAllBooksViewItem>;

    constructor(){
        this.books = new Array<ResponseGetAllBooksViewItem>();
    }
}

export class ResponseGetAllBooksViewItem{
    public id: number;
    
    public title: string;
    public description: string;    
    public price: number;
    public image: string;
    public authorListId: number;
    public ratingList: [];

    constructor(){
        this.ratingList = [];
    }
}