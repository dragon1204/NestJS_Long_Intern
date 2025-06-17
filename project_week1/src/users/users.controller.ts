import { Controller, Get, Post, Delete, Put, Patch, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("list")
    findAll() {
        return this.usersService.findAll();
    }

    @Get("find/:id")
    findOne(@Param("id") id: string){
        return this.usersService.findOne(+id);
    }

    @Post("create")
    create(@Body() createUserDto: CreateUserDto) {
       return this.usersService.create(createUserDto);
    }

    @Put("update/:id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete("delete/:id")
    delete(@Param("id") id: string) {
        return this.usersService.delete(+id);
    }

}
