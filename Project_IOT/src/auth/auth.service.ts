import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}
    
    async register(data: {email: string, password: string, name?: string}) {
        const user = await this.usersService.createUser(data);
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findUserByEmail(email);
        if (!user) {
            throw new Error('Email or password is incorrect');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if( !isPasswordValid){
            throw new Error('Email or password is incorrect');
        }

        const payload = { email: user.email, sub: user.id };
        const token = this.jwtService.sign(payload);

        return {
            access_token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
}