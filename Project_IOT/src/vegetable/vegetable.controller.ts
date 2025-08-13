import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { VegetableService } from './vegetable.service';
import { NewVegetableDto } from './dto/new-vegetable.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateImportedDto } from './dto/update-imported.dto';
import { UpdateSoldDto } from './dto/update-sold.dto';

@Controller('vegetable')
export class VegetableController {
    constructor(private readonly vegetableService : VegetableService){}

    @Post('create')
    async create(@Body() dto: NewVegetableDto){
        return await this.vegetableService.create(dto);
    }

    @Get('list')
    async findAll(){
        return await this.vegetableService.findMany();
    }

    @Put('update/price/:id')
    async updatePrice(@Param('id') id : number, @Body() dto : UpdatePriceDto){
        return await this.vegetableService.updatePrice(id, dto);
    }

    @Put('update/imported/:id')
    async updateImported(@Param('id') id : number, @Body() dto : UpdateImportedDto){
        return await this.vegetableService.updateImported(id, dto);
    }

    @Put('update/sold/:id')
    async updateSold(@Param('id') id : number, @Body() dto : UpdateSoldDto){
        return await this.vegetableService.updateSold(id, dto);
    }
}
