import { Controller, Get, Post, Delete, Put, Patch, Param, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("list")
    async findAllUsers() {
        return this.usersService.findAllUsers();
    }

    @Get("find/:id")
    async findUserById(@Param('id') id: string) {
        return this.usersService.findUserById(+id);
    }       

    @Post("create")
    async createUser(@Body() userData: any) {
        return this.usersService.createUser(userData);
    }   

    @Put(":id")
    async updateUser(@Param('id') id: string, @Body() userData: any) {
        return this.usersService.updateUser(+id, userData);
    }       

    @Delete(":id")
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(+id);
    }

}
