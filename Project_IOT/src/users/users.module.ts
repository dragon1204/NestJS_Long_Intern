import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';






@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    UsersService, 
    PrismaService,
  ],
  exports: [UsersService, PrismaService],
})
export class UsersModule {}
