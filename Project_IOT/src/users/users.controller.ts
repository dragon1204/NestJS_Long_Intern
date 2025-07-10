import { Controller, Get, Post, Delete, Put, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator/roles.decorator';
import { Role } from 'src/common/enum/role.enum';
import { RolesGuard } from 'src/common/guards/roles.guards';


@Controller('users')
@UseGuards(AuthGuard('jwt')) // Use AuthGuard to protect the routes
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get("list")
    async findAllUsers() {
        return this.usersService.findAllUsers();
    }


    @Get("find/:id")
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async findUserById(@Param('id') id: string) {
        return this.usersService.findUserById(+id);
    }     
    
    @Get("find-email/:email")
    async findUserByEmail(@Param('email') email: string) {
        return this.usersService.findUserByEmail(email);
    } 

    @Post("create")
    // @Roles(Role.ADMIN)
    async createUser(@Body() userData: any) {
        return this.usersService.createUser(userData);
    }   

    @Put("update/:id")
    async updateUser(@Param('id') id: string, @Body() userData: any) {
        return this.usersService.updateUser(+id, userData);
    }       

    @Delete("delete/:id")
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(+id);
    }

}
