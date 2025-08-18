import { IsNumber, IsString } from "class-validator";

export class NewVegetableDto{
    @IsString()
    name : string;

    @IsNumber()
    imported ?: number

    @IsNumber()
    sold ?: number

    @IsNumber()
    price ? : number
}