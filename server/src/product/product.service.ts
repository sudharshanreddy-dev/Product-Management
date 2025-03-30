import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/updateproduct.dto';
import { ProductNotFoundException } from './exceptions/product-not-found.exception';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, dto: CreateProductDto) {
        return this.prisma.product.create({
            data: {
                ...dto,
                userId,
            },
        });
    }

    async findAll(
        userId: string,
        pagination?: {
            page?: number;
            limit?: number;
            sortBy?: 'price' | 'rating' | 'createdAt';
            order?: 'asc' | 'desc';
        }
    ) {
        const { page = 1, limit = 10, sortBy, order = 'asc' } = pagination || {};

        const [products, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({
                where: { userId },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: sortBy ? { [sortBy]: order } : undefined,
            }),
            this.prisma.product.count({ where: { userId } })
        ]);

        return {
            products,
            page,
            limit,
            total
        };
    }

    async findOne(id: string) {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) throw new ProductNotFoundException();
        return product;
    }

    async update(userId: string, id: string, dto: UpdateProductDto) {
        const product = await this.findOne(id);
        if (product.userId !== userId) throw new ProductNotFoundException();

        return this.prisma.product.update({
            where: { id },
            data: dto,
        });
    }

    async remove(userId: string, id: string) {
        const product = await this.findOne(id);
        if (product.userId !== userId) throw new ProductNotFoundException();

        return this.prisma.product.delete({ where: { id } });
    }

    async search(userId: string, searchTerm: string) {
        return this.prisma.product.findMany({
            where: {
                userId,
                OR: [
                    { name: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                ],
            },
        });
    }

    async filter(
        userId: string,
        filters: {
            category?: string;
            minPrice?: number;
            maxPrice?: number;
            minRating?: number;
        }
    ) {
        const { category, minPrice, maxPrice, minRating } = filters;
        return this.prisma.product.findMany({
            where: {
                userId,
                AND: [
                    category ? { category } : {},
                    minPrice || maxPrice
                        ? {
                            price: {
                                ...(minPrice && { gte: minPrice }),
                                ...(maxPrice && { lte: maxPrice }),
                            },
                        }
                        : {},
                    minRating ? { rating: { gte: minRating } } : {},
                ],
            },
        });
    }
}