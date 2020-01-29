export class ResponseGetBookByIdView{
    public id: string;
    
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