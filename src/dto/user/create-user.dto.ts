import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsEnum,
} from "class-validator";
import { Role } from "src/enum/role.enum";
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  
  @ApiProperty({
    example: 'Rafael Bastos',
    description: 'Nome do usuario',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'teste555@mailinator.com',
    description: 'Email do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '07/11/1990',
    description: 'Data de nascimento',
  })
  @IsOptional()
  @IsDateString()
  birthAt?: string;

  @ApiProperty({
    example: '1',
    description: 'Regra de acesso',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: number;
}
