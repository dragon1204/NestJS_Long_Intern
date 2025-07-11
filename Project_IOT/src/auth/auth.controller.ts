import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DataDto, LoginDto } from "./dto/dataDto";
import { Public } from "@prisma/client/runtime/library";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} 
    
    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() data: DataDto) {
        return this.authService.register(data);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    async login(@Body() data: LoginDto) {
        return this.authService.login(data);
    }

    // @Post("logout")
    //  @HttpCode(HttpStatus.OK)
    // logoutLocal(){
    //     return this.authService.logout();
    // }

    // @Post("refresh")
    // refreshTokens(){
    //     return this.authService.refreshTokens();
    // }

}

