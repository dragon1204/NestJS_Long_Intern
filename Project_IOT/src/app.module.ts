import { MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard } from './auth/guard/auth.guards';
import { EvnCheckMiddleware } from './common/midlleware/evn_check.midleware';


@Module({
  imports: [
    UsersModule, 
    PrismaModule,
    AuthModule,    
    ConfigModule.forRoot({
      isGlobal: true
    }), 
    PostsModule],
  controllers: [],
  providers: [ PrismaService, AtGuard],
})

export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(EvnCheckMiddleware).forRoutes('*');
  }
}
