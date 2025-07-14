import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"email for logining", example:"Long1234@gmail.com"})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description:"password for logining", example: "1234"})
    password: string;
}
