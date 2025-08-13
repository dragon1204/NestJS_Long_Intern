import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/auth/guard/auth.guards';
import { RolesGuard } from 'src/auth/guard/roles.guards';
import { GardenService } from './garden.service';
import { Roles } from 'src/common/decorator/roles.decorator';
import { GardenDto } from './dto/garden.dto';



@Controller('garden')
@UseGuards(AtGuard)
export class GardenController {
    constructor(private readonly gardenService : GardenService){}

    @Post('admin/create')
    @UseGuards(RolesGuard)
    @Roles("ADMIN")
    async AdminCreateGarden(userId : number, @Body() dto: GardenDto){
        return this.gardenService.create(userId, dto);
    }

    @Post('create')
    async createGarden(@Req() Req, @Body() dto: GardenDto){
        const user = Req.user;
        return this.gardenService.create(user.id, dto);
    }

    @Get('list')
    async findMany(@Req() req){
        const user = req.user as {id: number; role:string}
        return this.gardenService.findMany(user);
    }
    @Get('detail/:id')
    async checkDetail(@Req() req, @Param('id') id : number){
        const user = req.user as {id : number; role: string};
        return this.gardenService.showDetail(user, id);
    }

    @Put('update/:id')
    async updateGarden(@Body() garden: GardenDto, @Param('id') id : number,@Req() req ){
        return this.gardenService.update(garden, id, req.user);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id : number){
        return this.gardenService.delete(id);
    }
}
