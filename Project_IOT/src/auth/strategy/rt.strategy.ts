import { ConsoleLogger, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(private usersService: UsersService) {
        const rtSecret = process.env.REFRESH_SECRET;
        if (!rtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: rtSecret,
            passReqToCallback: true, // Allows us to access the request object
        }); 
    }

    async validate(req: Request,payload: any){
        const refreshToken = req.get('Authorization')?.replace('Bearer ', '').trim();
        const user = await this.usersService.findUserByEmail(payload.email);
        return {user, refreshToken}; 
    }
}

