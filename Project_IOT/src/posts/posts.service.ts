import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/PostDto';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async findAllPosts(){
        return this.prisma.post.findMany();
    }

    async createPosts(data : Prisma.PostCreateInput){
        return this.prisma.post.create({ data });
    }

    async updatePosts(id: number, data : Prisma.PostCreateInput){
        return this.prisma.post.update({
            where: {id}, data
        });
    }

    async deletePosts(id: number){
        return this.prisma.post.delete({ where: {id}});
    }
    
}
