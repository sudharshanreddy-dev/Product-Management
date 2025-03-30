import {Controller, Get, Req, UseGuards} from '@nestjs/common';
import {UsersService} from "./users.service";
import {JwtAuthGuard} from "../auth/jwt_auth.guard";

@Controller('users')
export class UsersController {
    constructor(private  usersService: UsersService) {}

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req) {
        return this.usersService.getUserById(req.user.id);
    }
}
