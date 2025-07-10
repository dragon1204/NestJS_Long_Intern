import { ConsoleLogger, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
   

    constructor(private usersService: UsersService) {
        console.log("JwtStrategy initialized");
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
        
    }

    async validate(payload: any){
        console.log("Validating JWT payload:", payload);
        const user = await this.usersService.findUserByEmail(payload.email);

        if(!user) {
            throw new UnauthorizedException('User not found');
        }
        else{
            console.log("User found: ", user);
        }
    
        return user;
    }
}

