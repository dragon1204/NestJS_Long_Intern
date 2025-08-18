import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guard/auth.guards';
import { RolesGuard } from 'src/auth/guard/roles.guards';
import { GardenService } from '../garden.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { GardenDto } from '../dto/garden.dto';
import { Role } from '@prisma/client';
import { ApiOperation } from '@nestjs/swagger';



@Controller('garden')
@UseGuards(AtGuard)
export class AdminGardenController {
    constructor(private readonly gardenService : GardenService){}

    @ApiOperation({ summary: "Used to get the total revenue vegetable" })
    @Post('admin/create')
    @UseGuards(RolesGuard)
    @Roles(Role.ADMIN)
    async AdminCreateGarden(userId : number, @Body() dto: GardenDto){
        return this.gardenService.create(userId, dto);
    }

    @ApiOperation({ summary: "Used to get the total revenue vegetable" })
    @Post('')
    async createGarden(@Req() Req, @Body() dto: GardenDto){
        const user = Req.user;
        return this.gardenService.create(user.id, dto);
    }

    @ApiOperation({ summary: "Used to get the total revenue vegetable" })
    @Get('list')
    async findMany(@Req() req){
        const user = req.user as {id: number; role:string}
        return this.gardenService.findMany(user.id, user.role);
    }

    @ApiOperation({ summary: "Used to get the total revenue vegetable" })
    @Get('detail/:id')
    async checkDetail(@Req() req, @Param('id') id : number){
        const user = req.user as {id : number; role: string};
        return this.gardenService.showDetail(user, id);
    }

    @ApiOperation({ summary: "Used to get the total revenue vegetable" })
    @Put('update/:id')
    async updateGarden(@Body() garden: GardenDto, @Param('id') id : number,@Req() req ){
        return this.gardenService.update(garden, id, req.user);
    }

    @ApiOperation({ summary: "Used to get the total revenue vegetable" })
    @Delete('delete/:id')
    async delete(@Param('id') id : number){
        return this.gardenService.delete(id);
    }
}
