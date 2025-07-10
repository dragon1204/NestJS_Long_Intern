import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/common/guards/roles.guards';





@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService, 
    PrismaService,
    { 
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  exports: [UsersService, PrismaService],
})
export class UsersModule {}
