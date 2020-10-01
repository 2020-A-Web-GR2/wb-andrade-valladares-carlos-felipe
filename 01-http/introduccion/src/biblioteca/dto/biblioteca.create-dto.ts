import {IsAlpha, IsInt, IsNotEmpty, IsPositive, MaxLength, MinLength} from "class-validator";

export class BibliotecaCreateDto {
    @IsNotEmpty()
    @MaxLength(60)
    @MinLength(3)
    nombre: string;

    @IsNotEmpty()
    @MaxLength(60)
    @MinLength(3)
    direccion: string;

    @IsNotEmpty()
    @MaxLength(60)
    @MinLength(3)
    estado: string;

    @IsNotEmpty()
    @MaxLength(60)
    @MinLength(3)
    categoria_libros: string;

    @IsNotEmpty()
    @IsInt()
    @IsPositive()
    numero_clientes: number; //enteros
}