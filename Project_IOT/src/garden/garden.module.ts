import { Module } from '@nestjs/common';
import { GardenController } from './garden.controller';
import { GardenService } from './garden.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [GardenController],
  providers: [GardenService]
})
export class GardenModule {}
