import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { ControlerController } from './controler/controler.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController, ControlerController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
