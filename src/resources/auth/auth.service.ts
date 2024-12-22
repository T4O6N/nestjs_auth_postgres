import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { DateConverter } from 'src/utils/date-converter.util';

export interface IToken {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  //NOTE - sign in
  async signIn(signInDto: SignInDto): Promise<IToken> {
    await this.findUser(signInDto.username);

    const user = await this.prisma.user.create({
      data: {
        ...signInDto,
        username: signInDto.username,
        password: signInDto.password,
        created_at: DateConverter.formatToVientianeString(),
        updated_at: DateConverter.formatToVientianeString(),
      },
    });

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    return { accessToken, refreshToken };
  }

  //NOTE - refresh token
  async refreshToken(token: any): Promise<IToken> {
    const findUser = await this.prisma.user.findFirst({
      where: {
        id: token.user.id,
      },
    });

    if (!findUser) {
      throw new BadRequestException('User not found');
    }

    const accessToken = await this.createAccessToken(findUser);
    const refreshToken = await this.createRefreshToken(findUser);

    return { accessToken, refreshToken };
  }

  //NOTE - get user profile
  async getUserProfile(user: any) {
    const findUser = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    return findUser;
  }

  //NOTE - find user
  async findUser(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
  }

  //NOTE - create access token
  async createAccessToken(payload: any) {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      // expiresIn: '1h',
    });

    return access_token;
  }

  //NOTE - create refresh token
  async createRefreshToken(payload: any) {
    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      // expiresIn: '7d',
    });

    return refresh_token;
  }
}
