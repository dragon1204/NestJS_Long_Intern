import { Controller, Get,Put,Param, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/roles.guards';
import { PostsService } from './posts.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { AtGuard } from 'src/auth/guard/auth.guards';
import { PostDto } from './dto/post-dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts Section')
@Controller('posts')
@UseGuards( AtGuard, RolesGuard)
export class PostsController {
    constructor(private readonly PostsService: PostsService){}

    @ApiOperation({summary:"Used to create a post"})
    @Post("create")
    @Roles(Role.ADMIN)
    async createPosts(@Body() PostData: PostDto, @Req() req) {
        return this.PostsService.createPosts(PostData, req.user.id);
    }

    @ApiOperation({summary:"Used to get the list of posts"})
    @Get("listAll")
    @Roles(Role.ADMIN)
    async listPosts() {
        return this.PostsService.listPosts();
    }

    @ApiOperation({summary:"Used to get the list of posts"})
    @Get("list")
    @Roles(Role.USER)
    async listPostsByUser(@Req() req) {
        const userId = req.user.id;
        console.log(userId);
        return this.PostsService.findPostByUserId(userId);
    }

    @ApiOperation({summary:"Used to update a post with Id"})
    @Post("update/:id")
    @Roles(Role.ADMIN)
    async updatePosts(
        @Param('id') id: number,
        @Body() data: PostDto
    ) {
        return this.PostsService.updatePost(id, data);
    }
    

    @ApiOperation({summary:"Used to delete a post with Id"})
    @Delete("delete/:id")
    @Roles(Role.ADMIN)
    async deletePosts(@Param('id') id: number) {
        return this.PostsService.deletePosts(id);
    }
}
