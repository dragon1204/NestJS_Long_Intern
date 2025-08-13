import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GardenDto } from './dto/garden.dto';
import { RoleUserDto } from 'src/users/dto/role-user.dto';

@Injectable()
export class GardenService {
    constructor(private prisma: PrismaService){}

    async create(userId : number, dto: GardenDto){
        return this.prisma.garden.create({
            data: {
                name: dto.name,
                ownerId: userId
            }
        })
    }

    async findMany(dto: RoleUserDto){
        if(dto.role === 'ADMIN'){
            return this.prisma.garden.findMany({
                include: {
                    owner: true,
                    vegetables: true,
                    sales: true,
                    sensors: true,
                },
            });
        }
        return this.prisma.garden.findMany({
            where: {
                ownerId: dto.id,
            },
            include: {
                vegetables: true,
                sales: true,
                sensors: true,
            },
        });
        
    }

    async showDetail(user : {id : number, role: string}, gardenId: number){
        const garden = await this.prisma.garden.findUnique({
            where:{
                id : gardenId,
            }
        });

        if(!garden) {
            throw new NotFoundException('Garden not found');
        }

        if(user.role === 'ADMIN' || garden.ownerId === user.id) {
            return garden;
        }

        throw new ForbiddenException('This garden is not belong you!');

    }

    async update(user ,gardenId: number, gardenDto: GardenDto){
        const garden = await this.prisma.garden.findUnique({
            where:{
                id : gardenId,
            }
        });

        if(!garden) {
            throw new NotFoundException('Garden not found');
        }

        if(user.role === 'ADMIN' || garden.ownerId === user.id) {
            return this.prisma.garden.update({
                where: { id : gardenId },
                data: {
                    name: gardenDto.name,
                }
            });
        }

        throw new ForbiddenException('This garden is not belong you!');

    }

    async delete(gardenId : number){
        const garden = await this.prisma.garden.findUnique({
            where:{ id : gardenId}
        })

        if(!garden){
            throw new NotFoundException('Garden not found');
        }

        await this.prisma.garden.delete({where: {id : gardenId}});

    }

    async checkValidId(id : number){
        const isValid = await this.prisma.garden.findUnique({
            where:{
                id : id,
            }
        })
        if(!isValid)    return false;
        else    return true;
    }

}
