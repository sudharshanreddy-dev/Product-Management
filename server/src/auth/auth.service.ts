import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from "../prisma/prisma.service";
import { SignupDto } from "./dto/signup.dto";
import * as bcrypt from 'bcryptjs';
import { SigninDto } from "./dto/signin.dto";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private config: ConfigService,
        private jwt: JwtService
    ) {}

    async signup(dto: SignupDto) {
        try {
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            const user = await this.prisma.user.create({
                data: {
                    name: dto.name,
                    email: dto.email,
                    password: hashedPassword
                },
                select: { id: true, name: true, email: true }
            });

            return user;
        } catch (error) {
            throw new UnauthorizedException('Registration failed');
        }
    }

    async signin(dto: SigninDto) {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email: dto.email },
                select: { id: true, name: true, email: true, password: true }
            });

            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const pwdCompare = await bcrypt.compare(dto.password, user.password);
            if (!pwdCompare) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const { access_token } = await this.generateToken(user.id, user.name, user.email);
            const userProfile = await this.getUserProfile(user.id);

            return { access_token, user: userProfile };
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }

    async getUserProfile(userId: string) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true }
        });
    }

    async generateToken(userId: string, name: string, email: string) {
        const payload = { sub: userId, name, email };

        return {
            access_token: this.jwt.sign(payload, {
                secret: this.config.get('JWT_SECRET'),
                expiresIn: '1h'
            }),
        };
    }
}