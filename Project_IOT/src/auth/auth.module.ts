import { Module } from '@nestjs/common';
import { sign } from 'crypto';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth.jwt.strategy';


@Module({
    imports: [
        UsersModule, 
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,

            signOptions: {
                expiresIn: '1h' // Token expiration time
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, JwtModule]
})
export class AuthModule {}
