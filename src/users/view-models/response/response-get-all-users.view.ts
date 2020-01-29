export class ResponseGetAllUsersView{
    public users: Array<ResponseGetAllUsersViewItem>;

    constructor(){
        this.users = new Array<ResponseGetAllUsersViewItem>();
    }
}

export class ResponseGetAllUsersViewItem{
    public id: number;
    public email: string;
    public name: string;
    public password: string;
}