import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput) {
        return this.prisma.user.create({ data });
    }

    async findAllUsers() {
        return this.prisma.user.findMany();
    }

    async findUserById(id: number) {
        return this.prisma.user.findUnique({ where: { id } });
    }

    async updateUser(id: number, data: Prisma.UserUpdateInput) {
        return this.prisma.user.update({ where: { id }, data });
    }

    async deleteUser(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
