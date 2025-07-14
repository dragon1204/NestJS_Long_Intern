import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from '../common/dto/PostDto';


@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async findAllPosts(){
        return this.prisma.post.findMany();
    }

    async createPosts(data : PostDto){
        return this.prisma.post.create({
            data : {
                title: data.title,
                content: data.content,
                user: {
                    connect: {
                        id: data.UserId,
                    }
                }
            }
        });
    }

    async updatePosts(id: number, data : PostDto){
        return this.prisma.post.update({
            where: {id}, data
        });
    }

    async deletePosts(id: number){
        return this.prisma.post.delete({ where: {id}});
    }

    async listPosts(){
    return this.prisma.post.findMany();
}

    
}

