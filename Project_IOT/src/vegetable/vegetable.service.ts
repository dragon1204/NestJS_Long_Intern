import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewVegetableDto } from './dto/new-vegetable.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateImportedDto } from './dto/update-imported.dto';
import { UpdateSoldDto } from './dto/update-sold.dto';

@Injectable()
export class VegetableService {
    constructor(private prisma : PrismaService){}

    async create(dto : NewVegetableDto){
        this.prisma.vegetable.create({
            data: {
                name : dto.name,
                gardenId : dto.gardenId,
        }})
    }

    async findMany(){
        this.prisma.vegetable.findMany()
    }

    async updateImported(id : number,dto : UpdateImportedDto){
        const exist = await this.checkExist(id);
        if(!exist) 
            throw new NotFoundException('không tồn tại id này');

        return this.prisma.vegetable.update({
            where: {
                id : id,
            },
            data: {
                imported : dto.imported,
            }
        })
    }

    async updateSold(id : number, dto : UpdateSoldDto){
        const exist = await this.checkExist(id);
        if(!exist) 
            throw new NotFoundException('không tồn tại id này');

        return this.prisma.vegetable.update({
            where: {
                id : id,
            },
            data: {
                sold : dto.sold,
            }
        })
    }


    async updatePrice(id : number, dto : UpdatePriceDto){
        const exist = await this.checkExist(id);
        if(!exist) 
            throw new NotFoundException('không tồn tại id này');

        return this.prisma.vegetable.update({
            where: {
                id : id,
            },
            data: {
                price : dto.price,
            }
        })
    }



    async checkExist(id : number) { 
        const isExist = await this.prisma.vegetable.findUnique({where : {id : id}});
        if(!isExist)
            return false;
        return true;
    }

}
