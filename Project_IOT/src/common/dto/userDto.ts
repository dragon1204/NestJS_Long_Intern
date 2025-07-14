import {IsNotEmpty, IsString} from "class-validator"
import { Role } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "the email of the user", example: "Long1234@gmail.com"})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({description: "the password of the user", example: "1234"})
    password: string;

    @IsString()
    @ApiProperty()
    name: string;

    @ApiProperty()
    roles: Role[];
}

