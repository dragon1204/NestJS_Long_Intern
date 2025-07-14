import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "../common/dto/userDto";
import { LoginDto } from "../common/dto/LoginDto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('Authentication Secion')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {} 
    
    @ApiOperation({summary:"Used to Register"})
    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() data: UserDto) {
        return this.authService.register(data);
    }

    @ApiOperation({summary:"Used to Login"})
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

