import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private usersService: UsersService) {
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // issuer: 'your-issuer', // Optional, specify if you want to validate the issuer
            // audience: 'your-audience', // Optional, specify if you want to validate the
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: any){
        const user = await this.usersService.findUserById(payload.sub);
        if(!user) {
            throw new Error('Unauthorized');
        }
    
        return user;
    }
}

