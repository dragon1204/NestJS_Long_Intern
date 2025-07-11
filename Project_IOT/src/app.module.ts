import { Module} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard } from './common/guards/auth.guards';


@Module({
  imports: [
    UsersModule, 
    PrismaModule,
    AuthModule,    
    ConfigModule.forRoot({
      isGlobal: true
    }), PostsModule],
  controllers: [],
  providers: [ PrismaService, AtGuard],
})
export class AppModule {}
