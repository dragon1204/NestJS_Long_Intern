import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcryptjs';
import { Role } from "@prisma/client";
import { DataDto, LoginDto } from "./dto/dataDto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService, // Assuming you meant to use PrismaService here
    ) {}
    
 

    async register(data: DataDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const hashedData = {
            email: data.email,
            password: hashedPassword,
            name: data.name,
            roles: data.roles || [Role.USER], // Default to USER role if not provided
        }

        const  user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                roles: data.roles || [Role.USER], // Default to USER role if not provided
            }
        }
        );

        const tokens = await this.getTokens(hashedData);
        return tokens;
    }

    async login(data: LoginDto) {
        const user = await this.usersService.findUserByEmail(data.email);
        if (!user) {
            throw new Error('Email or password is incorrect');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if( !isPasswordValid){
            throw new Error('Email or password is incorrect');
        }

        const payload = { email: user.email, sub: user.id, roles: user.roles };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                roles: user.roles,
            },
        };
    }

    async logout(){}

    async refreshTokens(){}

   async getTokens(payload: any){
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(
                payload, 
                {
                    expiresIn: 60 * 15,
                    secret: process.env.JWT_SECRET,
                },
            ),
            this.jwtService.signAsync(
                payload, 
                {
                    expiresIn: '7d',
                    secret: process.env.REFRESH_SECRET,
                },
            ),
        ]);

        return {
            acess_token: at,
            refresh_token: rt,
        }
    }
}