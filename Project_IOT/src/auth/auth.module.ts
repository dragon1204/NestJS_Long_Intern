import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { JwtStrategy, RtStrategy } from './strategy';
import { AtGuard } from 'src/common/guards/auth.guards';
import { Prisma } from '@prisma/client';
import { PrismaModule } from 'src/prisma/prisma.module';




@Module({
    imports: [
        UsersModule, 
        PassportModule,
        PrismaModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: '15m' // Token expiration time
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, RtStrategy, RolesGuard, AtGuard],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
