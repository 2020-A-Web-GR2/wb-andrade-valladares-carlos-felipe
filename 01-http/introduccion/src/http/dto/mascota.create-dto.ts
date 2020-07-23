// @IsAlpha()
// @IsNoEmpty()
// @MinLength()
// @MinLength()

// @IsAlpha() // @IsNotEmpty() // @MinLength() // @MaxLength() // @IsBoolean() // @IsEmpty() // @IsInt() // @IsPositive() // @IsOptional() // @IsNumber()
import {
    IsAlpha,
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    MaxLength,
    MinLength
} from "class-validator";

export class MascotaCreateDto {
    @IsNotEmpty()
    @IsAlpha()
    @MaxLength(60)
    @MinLength(3)
    nombre: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    edad: number; //enteros

    @IsNotEmpty()
    @IsBoolean()
    casada: boolean;

    @IsOptional()
    @IsBoolean()
    ligada?: boolean;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    peso: number; // decimales


}