import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} 
    
    @Post("register")
    async register(@Body() data: {email: string, password: string, name?: string, roles?: string[]}) {
        return this.authService.register(data);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    async login(@Body() data: {email: string, password: string}) {
        console.log('Received data:', data.email, data.password);
        if ( !data.email || !data.password) {
            throw new Error('Invalid login data');
        }
        return this.authService.login(data.email, data.password);
    }
}
