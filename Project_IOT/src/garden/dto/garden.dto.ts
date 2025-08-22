import { IsInt, IsNumber, IsString, MaxLength } from "class-validator";

export class GardenDto {
    @IsString()
    @MaxLength(30)
    name : string;

}