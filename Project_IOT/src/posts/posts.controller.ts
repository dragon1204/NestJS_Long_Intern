import { Controller, Get,Put,Param, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { PostsService } from './posts.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AtGuard } from 'src/common/guards/auth.guards';
import { PostDto } from '../common/dto/PostDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts Section')
@Controller('posts')
@UseGuards( AtGuard, RolesGuard)
export class PostsController {
    constructor(private readonly PostsService: PostsService){}

    @ApiOperation({summary:"Used to create a post"})
    @Post("create")
    @Roles(Role.ADMIN, Role.USER)
    async createPosts(@Body() PostData: PostDto) {
        return this.PostsService.createPosts(PostData);
    }

    @ApiOperation({summary:"Used to get the list of posts"})
    @Get("list")
    @Roles(Role.ADMIN, Role.USER)
    async listPosts() {
        return this.PostsService.listPosts();
    }

    @ApiOperation({summary:"Used to update a post with Id"})
    @Post("update/:id")
    @Roles(Role.ADMIN)
    async updatePosts(
        @Param('id') id: number,
        @Body() data: PostDto
    ) {
        return this.PostsService.updatePosts(id, data);
    }
    
    @ApiOperation({summary:"Used to delete a post with Id"})
    @Delete("delete/:id")
    @Roles(Role.ADMIN)
    async deletePosts(@Param('id') id: number) {
        return this.PostsService.deletePosts(id);
    }
}
