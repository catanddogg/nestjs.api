import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository"
import { BaseResultView } from "src/base-models/base-result.view";
import { ResponseGetAllUsersView } from "./view-models/response/response-get-all-users.view";
import { RequestGetUserByIdView } from "./view-models/request/request-get-user-by-id.view";
import { ResponseGetUserByIdView } from "./view-models/response/response-get-user-by-id.view";
import { RequestCreateUserView } from "./view-models/request/request-create-user.view";
import { RequestUpdateUserView } from "./view-models/request/request-update-user.view";
import { RequestDeleteUserView } from "./view-models/request/request-delete-user.view";

@Injectable()
export class UserService{

    constructor( @InjectRepository(User)
    private readonly userRepository: UserRepository) {}
    
    async getAllUsers(): Promise<BaseResultView<ResponseGetAllUsersView>>{
        let result =  new BaseResultView<ResponseGetAllUsersView>();

        let users = await this.userRepository.find();

        if(users == null){
            result.isSuccess = false;
            result.message = "user not found";
        }

        result.data = new ResponseGetAllUsersView();
        result.data.users = users;

        result.isSuccess =  true;
        result.message = "users successfully found";

        return result;
    }

    async getUserById(requestModel: RequestGetUserByIdView): Promise<BaseResultView<ResponseGetUserByIdView>>{
        let result =  new BaseResultView<ResponseGetUserByIdView>();

        let user = await this.userRepository.findOne(requestModel.userId);

        if(user == null){
            result.isSuccess = false;
            result.message = "user not found";

            return result;
        }

        result.data =  new ResponseGetUserByIdView();
        result.data.id = user.id;
        result.data.email = user.email;
        result.data.name = user.name;
        result.data.password = user.password;

        result.isSuccess = true;
        result.message = "user successfully found";

        return result;
    }

    async createUser(requestModel:  RequestCreateUserView): Promise<BaseResultView>{
        let result = new BaseResultView();

        let user =  new User();
        user.email = requestModel.email;
        user.name = requestModel.name;
        user.password = requestModel.password;
        
        let insertData = await this.userRepository.insert(user);

        if(insertData == null){
            result.isSuccess = false;
            result.message = "user not insert"
        }

        result.isSuccess = true;
        result.message = "user successfully insert"

        return result;
    }   

    async updateUser(requestModel: RequestUpdateUserView): Promise<BaseResultView> {
        let result =  new BaseResultView();

        let user = await this.userRepository.findOne(requestModel.id);

        if(user == null){
            result.isSuccess = false;
            result.message = "user not found";

            return result;
        }
        
        if(requestModel.email !== "" && requestModel.email !== undefined){
            user.email = requestModel.email;
        }
        if(requestModel.name !== "" && requestModel.name !== undefined){
            user.name = requestModel.name;
        }

        await this.userRepository.update(user._id.toString(), user);

        result.isSuccess = true;
        result.message = "user successfully update";

        return result;     
    }

    async deleteUser(requestModel: RequestDeleteUserView): Promise<BaseResultView>{
        let result =  new BaseResultView();

        let deleteResult = await this.userRepository.delete(requestModel.id);

        if(deleteResult == null){
            result.isSuccess = false;
            result.message = "user not found";

            return result;
        }

        result.isSuccess = true;
        result.message = "user successfully remove"

        return result;
    }

    //TODO
    // async resetPassword(){

    // }
}