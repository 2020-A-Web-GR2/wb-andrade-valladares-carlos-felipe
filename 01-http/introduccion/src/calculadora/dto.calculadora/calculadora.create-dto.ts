import {IsInt, IsNumber, IsOptional, IsPositive} from "class-validator";

export class CalculadoraCreateDto {

    @IsInt()
    n1: number;

    @IsInt()
    n2: number;

    @IsNumber()
    @IsOptional()
    @IsPositive()
    n2d: number;

}