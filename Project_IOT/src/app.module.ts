import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    UsersModule, 
    AuthModule,    
    ConfigModule.forRoot({
      isGlobal: true
    })],
  controllers: [],
  providers: [ PrismaService],
})
export class AppModule {}
