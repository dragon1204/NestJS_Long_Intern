import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { UserDto } from 'src/common/dto/userDto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: UserDto) {
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

    async updateUser(id: number, data: UserDto) {
        return this.prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
