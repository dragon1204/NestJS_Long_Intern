import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/post-dto';


@Injectable()
export class PostsService {
    constructor(private prisma: PrismaService) {}

    async findAllPosts(){
        return this.prisma.post.findMany();
    }

    async findPostByUserId(userId : number){
        console.log("userId:", userId);
        return this.prisma.post.findMany({
            where: {
                userID : userId,
            }
        })
    }

    async createPosts(data : PostDto, userId: number){
        return this.prisma.post.create({
            data : {
                title: data.title,
                content: data.content,
                user: {
                    connect: {
                        id: userId,
                    }
                }
            }
        });
    }

    

    async updatePost(id: number, data : PostDto){
        if(!this.checkPostId){
            console.log("post", id, "không tồn tại");
            return;
        }
        else
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

    async checkPostId(id : number){
        const post = this.prisma.post.findUnique({where: {id}});
        if(!post)   return false;
        return true;
    }
    
}

