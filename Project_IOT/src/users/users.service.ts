import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from 'src/users/dto/user-dto';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: CreateUserDto) {
        return this.prisma.user.create({ data });
    }

    async findAllUsers() {
        return this.prisma.user.findMany();
    }

    async findUserById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async findUserByEmail(email: string) {
        return this.prisma.user.findUnique({ where: { email } });
    }

    async updateUser(id: number, data: UpdateUserDto) {
        if (!this.checkId(id)) {
            console.log("UserId ", id, "khong ton tai");
        }
        else 
            return this.prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }

    async checkId(id : number){
        const user =  this.prisma.user.findUnique({where: { id }});
        if (!user)   return false;
        else return true;
    }
}
