import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    required: true,
    description: 'Username of user',
    example: 'tonpcst',
  })
  username: string;

  @ApiProperty({
    required: true,
    description: 'Password of user',
    example: '55736369',
  })
  password: string;
}
