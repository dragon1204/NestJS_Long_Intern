import { Body, Controller, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { VegetableService } from './vegetable.service';
import { NewVegetableDto } from './dto/new-vegetable.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateImportedDto } from './dto/update-imported.dto';
import { UpdateSoldDto } from './dto/update-sold.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('vegetable')
export class VegetableController {
    constructor(private readonly vegetableService: VegetableService) { }

    @ApiOperation({ summary: "Used to create a new vegetable" })
    @Post('')
    async create(@Body() dto: NewVegetableDto) {
        return await this.vegetableService.create(dto);
    }

    @ApiOperation({ summary: "Used to show the list vegetable" })
    @Get('')
    async findAll(
        @Query('skip') skip : number,
        @Query('take') take : number
    ) {
        return await this.vegetableService.findMany(skip, take);
    }

    @ApiOperation({ summary: "Used to change the price of vegetable" })
    @Patch('price/:id')
    async updatePrice(@Param('id') id: number, @Body() dto: UpdatePriceDto) {
        return await this.vegetableService.updatePrice(id, dto);
    }

    @ApiOperation({ summary: "Used to change the imported vegetable" })
    @Patch('imported/:id')
    async updateImported(@Param('id') id: number, @Body() dto: UpdateImportedDto) {
        return await this.vegetableService.updateImported(id, dto);
    }

    @ApiOperation({ summary: "Used to the sold vegetable" })
    @Patch('sold/:id')
    async updateSold(@Param('id') id: number, @Body() dto: UpdateSoldDto) {
        return await this.vegetableService.updateSold(id, dto);
    }

    @ApiOperation({ summary: "Used to get the revenue vegetable " })
    @Get('revenue')
    async getPriceList(
        @Query('type') type: 'day' | 'week' | 'month',
        @Query('gardenId') gardenId?: string,
        @Query('vegetableId') vegetableId?: string,
    ) {
        return this.vegetableService.getPriceList(type, gardenId ? Number(gardenId) : undefined, vegetableId ? Number(vegetableId) : undefined);
    }

    @ApiOperation({ summary: "Used to get the total revenue vegetable" })
    @Get('all/revenue')
    async getTotalRevenue(
        @Query('type') type: 'day' | 'week' | 'month',
        @Query('gardenId') gardenId?: string,
        @Query('vegetableId') vegetableId?: string,
    ) {
        return this.vegetableService.getTotalRevenue(type, gardenId ? Number(gardenId) : undefined, vegetableId ? Number(vegetableId) : undefined);
    }
}
