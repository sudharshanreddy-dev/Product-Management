import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNumber()
    @Min(0)
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @Min(0)
    @Max(5)
    @IsNotEmpty()
    rating: number;
}