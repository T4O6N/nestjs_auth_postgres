import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import { AuthService, IToken } from './auth.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @Version('1')
  @ApiOperation({
    summary: 'Sign in',
  })
  async signIn(@Body() signInDto: SignInDto): Promise<IToken> {
    return await this.authService.signIn(signInDto);
  }

  @Post('refresh-token')
  @Version('1')
  @ApiOperation({
    summary: 'Refresh token',
  })
  async refreshToken(@Req() token: Request): Promise<IToken> {
    return await this.authService.refreshToken(token);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  @Version('1')
  @ApiOperation({
    summary: 'Get user profile',
  })
  async getUserProfile(@Req() req: Request) {
    return await this.authService.getUserProfile(req['user']);
  }
}
