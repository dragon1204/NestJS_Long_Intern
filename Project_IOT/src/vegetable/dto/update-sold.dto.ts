import { IsNumber, IsPositive } from "class-validator";

export class UpdateSoldDto {
    @IsNumber()
    @IsPositive()
    sold : number;
}