import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcryptjs';
import { Role } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";



@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private prisma: PrismaService, // Assuming you meant to use PrismaService here
    ) {}
    
 

    async register(data: RegisterDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const hashedData = {
            email: data.email,
            password: hashedPassword,
            name: data.name,
            role: data.role ?? Role.USER, // Default to USER role if not provided
        }

        const  user = await this.usersService.createUser(
            {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: data.role ?? Role.USER , // Default to USER role if not provided
            }
        );

        console.log(user.email, " Register sucessfully!")
        const tokens = await this.getTokens(hashedData);
        return tokens;
    }


    async login(data: LoginDto) {
        const user = await this.usersService.findUserByEmail(data.email);

        if (!user) {
            throw new NotFoundException('Email is not founded');
        }

        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if( !isPasswordValid){
            throw new UnauthorizedException('Password is incorrect');
        }
        console.log(user.email, " Login sucessfully!")
        const payload = { email: user.email, sub: user.id, roles: user.role };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        };
    }

    // async logout(userId: number){
    //     await this.prisma.user.updateMany({
    //         where: {
    //             id: userId,
    //             hashedRt : {
    //                 not: null,
    //             },
    //         },
    //         data: {
    //             hashedRt: null,
    //         }
    //     })
    //     return true;
    // }

    async refreshTokens(){}

    // async updateRtHash(userId: number, rt: string): Promise<void> {
    //     const hash = await argon.hash(rt);
    //     await this.prisma.user.update({
    //         where: {
    //             id: userId,
    //         },
    //         data: {
    //             hashedRt: hash,
    //         },
    //      });
    // }

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