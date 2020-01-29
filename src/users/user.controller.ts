import { Controller, Get, Body, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { ResponseGetAllUsersView } from "./view-models/response/response-get-all-users.view";
import { BaseResultView } from "src/base-models/base-result.view";
import { RequestGetUserByIdView } from "./view-models/request/request-get-user-by-id.view";
import { ResponseGetUserByIdView } from "./view-models/response/response-get-user-by-id.view";
import { RequestCreateUserView } from "./view-models/request/request-create-user.view";
import { RequestUpdateUserView } from "./view-models/request/request-update-user.view";
import { RequestDeleteUserView } from "./view-models/request/request-delete-user.view";

@Controller('user')
export class UserController{

    constructor(private readonly userService: UserService) {}

    @Get('getAllUsers')
    async getAllUsers(): Promise<BaseResultView<ResponseGetAllUsersView>>{
        let result = await this.userService.getAllUsers();
        
        return result;
    }

    @Get('getUserById')
    async getUserById(@Body() requestModel: RequestGetUserByIdView): Promise<BaseResultView<ResponseGetUserByIdView>>{
        let result =  await this.userService.getUserById(requestModel);

        return result;
    }

    @Post('createUser')
    async createUser(@Body() requestModel: RequestCreateUserView): Promise<BaseResultView>{
        let result = await this.userService.createUser(requestModel);
        
        return result;
    }

    @Post('updateUser')
    async updateUser(@Body() requestModel: RequestUpdateUserView): Promise<BaseResultView>{
        let result = await this.userService.updateUser(requestModel);
        
        return result;
    }

    @Post('deleteUser')
    async deleteUser(@Body() requestModel: RequestDeleteUserView): Promise<BaseResultView>{
        let result = await this.userService.deleteUser(requestModel);

        return result;
    }
}