import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Req,
    Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt_auth.guard';
import { CreateProductDto } from './dto/product.dto';
import { UpdateProductDto } from './dto/updateproduct.dto';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
    ApiQuery
} from '@nestjs/swagger';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product successfully created' })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    create(@Req() req, @Body() dto: CreateProductDto) {
        return this.productService.create(req.user.id, dto);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get all products with pagination and sorting' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'sortBy', required: false, enum: ['price', 'rating', 'createdAt'] })
    @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
    @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async findAll(
        @Req() req,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('sortBy') sortBy?: 'price' | 'rating' | 'createdAt',
        @Query('order') order?: 'asc' | 'desc',
    ) {
        return this.productService.findAll(req.user.id, {
            page: page ? Number(page) : undefined,
            limit: limit ? Number(limit) : undefined,
            sortBy,
            order,
        });
    }

    @Get('search')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Search products by name or description' })
    @ApiQuery({ name: 'term', required: true, type: String })
    @ApiResponse({ status: 200, description: 'Products matching search term' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    search(
        @Req() req,
        @Query('term') term: string
    ) {
        return this.productService.search(req.user.id, term);
    }

    @Get('filter')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Filter products by category, price range, or rating' })
    @ApiQuery({ name: 'category', required: false, type: String })
    @ApiQuery({ name: 'minPrice', required: false, type: Number })
    @ApiQuery({ name: 'maxPrice', required: false, type: Number })
    @ApiQuery({ name: 'minRating', required: false, type: Number })
    @ApiResponse({ status: 200, description: 'Filtered products' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    filter(
        @Req() req,
        @Query('category') category?: string,
        @Query('minPrice') minPrice?: number,
        @Query('maxPrice') maxPrice?: number,
        @Query('minRating') minRating?: number,
    ) {
        return this.productService.filter(req.user.id, {
            category,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            minRating: minRating ? Number(minRating) : undefined,
        });
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get a single product by ID' })
    @ApiResponse({ status: 200, description: 'Product found' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update a product' })
    @ApiResponse({ status: 200, description: 'Product updated' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    update(@Req() req, @Param('id') id: string, @Body() dto: UpdateProductDto) {
        return this.productService.update(req.user.id, id, dto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete a product' })
    @ApiResponse({ status: 200, description: 'Product deleted' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    remove(@Req() req, @Param('id') id: string) {
        return this.productService.remove(req.user.id, id);
    }
}