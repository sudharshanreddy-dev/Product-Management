import { Controller, Post, Body, Res, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt_auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignupDto) {
        return this.authService.signup(dto);
    }

    @Post('signin')
    async signin(
        @Body() dto: SigninDto,
        @Res({ passthrough: true }) res: Response
    ) {
        const { access_token, user } = await this.authService.signin(dto);

        res.cookie('jwt', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 60 * 60 * 1000, // 1 hour
            path: '/',
        });

        return {
            message: 'Login successful',
            user
        };
    }

    @Post('logout')
    @UseGuards(JwtAuthGuard)
    logout(
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request
    ) {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            path: '/',
        });

        return { message: 'Logout successful' };
    }
}