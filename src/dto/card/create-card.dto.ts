import {
  IsString,
  IsNumber
} from 'class-validator';
import { CreateUserDto } from '../user/create-user.dto';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCardDto {

  @ApiProperty({
    example: '5240 8952 2436 8284',
    description: 'Numero do cartao',
  })  
@IsString()
cardNumber: string;

@ApiProperty({
  example: '14/11/2025',
  description: 'Data de validade',
})
@IsString()
expirationDate: string;

@ApiProperty({
  example: '598',
  description: 'cvv',
})
@IsString()
cvv: string;

@ApiProperty({
  example: 'cpf ou cnpj',
  description: '60177-150',
})
@IsString()
cpf_cnpj: string;

@ApiProperty({
  example: 'Cartao principal',
  description: 'Apelido do cartao',
})
@IsString()
cardNickname: string;

@ApiProperty({
  example: 'Cartao 1',
  description: 'Nome do cartão',
})
@IsString()
name: string;

@ApiProperty({
  example: '1',
  description: 'tipo de cartao',
})
@IsNumber()
type: number;

@ApiProperty({
  example: 'CreateUserDto',
  description: 'Usuario do cartao',
})
user:CreateUserDto;
}
