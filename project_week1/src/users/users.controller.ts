import { Controller, Get, Post, Delete, Put, Patch, Param, Body } from '@nestjs/common';
import { UsersService } from '../users/users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("list")
    async findAllUsers() {
        return this.usersService.findAllUsers();
    }

}
