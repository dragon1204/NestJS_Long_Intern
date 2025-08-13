import { IsNumber, IsPositive } from "class-validator";

export class UpdateImportedDto {
    @IsNumber()
    @IsPositive()
    imported : number;
}