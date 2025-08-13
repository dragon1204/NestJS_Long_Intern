import { Controller, Get, Post, Delete, Put, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/auth/guard/roles.guards';
import { Role } from '@prisma/client';
import { AtGuard } from 'src/auth/guard/auth.guards';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';

@ApiTags('Users Section')
@Controller('users')
@UseGuards( AtGuard, RolesGuard)// Use AuthGuard to protect the routes
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary:"Used to get the list of users"})
    @Get("list")
    @Roles(Role.USER)
    async findAllUsers() {
        return this.usersService.findAllUsers();
    }

    @ApiOperation({summary:"Used to find a user by Id"})
    @Get("find/:id")
    @Roles(Role.USER)
    async findUserById(@Param('id') id: string) {
        return this.usersService.findUserById(+id);
    }     
    
    @ApiOperation({summary:"Used to find a user by email"})
    @Get("find-email/:email")
    async findUserByEmail(@Param('email') email: string) {
        return this.usersService.findUserByEmail(email);
    } 

    @ApiOperation({summary:"Used to create a user"})
    @Post("create")
    @Roles(Role.ADMIN)
    async createUser(@Body() userData: UserDto) {
        return this.usersService.createUser(userData);
    }   

    @ApiOperation({summary:"Used to update a user with Id"})
    @Put("update/:id")
    @Roles(Role.ADMIN)
    async updateUser(@Param('id') id: string, @Body() userData: UserDto) {
        return this.usersService.updateUser(+id, userData);
    }       

    @ApiOperation({summary:"Used to delete a user with Id"})
    @Delete("delete/:id")
    @Roles(Role.ADMIN)
    async deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(+id);
    }

}
