import { IsInt, IsString, MaxLength } from "class-validator";

export class GardenDto {
    @IsString()
    @MaxLength(30)
    name : string;
}