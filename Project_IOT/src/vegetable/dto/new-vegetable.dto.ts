import { IsNumber, IsString } from "class-validator";

export class NewVegetableDto{
    @IsString()
    name : string;

    @IsNumber()
    gardenId : number;
}