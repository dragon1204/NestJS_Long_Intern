import {IsNotEmpty, IsString} from "class-validator"
import { Role } from "@prisma/client";

export class DataDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    name: string;

    roles: Role[];
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
