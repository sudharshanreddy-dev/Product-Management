import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProductDto } from './product.dto';
import { IsOptional, IsNumber, Min, Max } from 'class-validator';

export class UpdateProductDto extends PartialType(
    OmitType(CreateProductDto, ['rating'] as const)
) {
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating?: number;
}