import { HttpException, HttpStatus } from '@nestjs/common';

export class ProductNotFoundException extends HttpException {
    constructor() {
        super('Product not found or not owned by user', HttpStatus.NOT_FOUND);
    }
}