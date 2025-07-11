import { Controller, Get,Put,Param, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { PostsService } from './posts.service';
import { Roles } from 'src/common/decorator/roles.decorator';

@Controller('posts')
@UseGuards( AuthGuard('jwt'), RolesGuard)
export class PostsController {
    constructor(private readonly PostsService: PostsService){}


    @Post("create")
    @Roles(Role.ADMIN, Role.USER)
    async createPosts(@Body() PostData: any) {
        return this.PostsService.createPosts(PostData);
    }

    @Post("update/:id")
    @Roles(Role.ADMIN)
    async updatePosts(
        @Param('id') id: number,
        @Body() data:any
    ) {
        return this.PostsService.updatePosts(id, data);
    }
    
    @Delete("delete/:id")
    @Roles(Role.ADMIN)
    async deletePosts(@Param('id') id: number) {
        return this.PostsService.deletePosts(id);
    }
}
