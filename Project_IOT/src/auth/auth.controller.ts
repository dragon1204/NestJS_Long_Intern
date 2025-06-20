import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} 
    
    @Post("register")
    async register(@Body() data: {email: string, password: string, name?: string}) {
        return this.authService.register(data);
    }

    @HttpCode(HttpStatus.OK)
    @Post("Login")
    async login(@Body() data: {email: string, password: string}) {
        return this.authService.login(data.email, data.password);
    }
}
