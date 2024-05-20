import { IsArray, IsEnum, IsNumber, IsObject, IsString } from "class-validator";
import { CreateUserDto } from "../user/create-user.dto";
import { CreateProductDTO } from "../product/create-product.dto";
import { AddressDto } from "../address/address.dto";
import { modoPagamento } from "src/enum/modoPagamento.enum";
import { ApiProperty } from '@nestjs/swagger';

export class CreateShoppingDTO {
  
  @ApiProperty({
    example: '12',
    description: 'Duração da compra',
  })
  @IsString()
  duration: string;

  @ApiProperty({
    example: 'Rua X',
    description: 'Endereço da loja',
  })
  @IsString()
  storeAddress: string;

  @ApiProperty({
    example: 'Rua Y',
    description: 'Endereço da entrega',
  })
  @IsString()
  deliveryAddress: string;

  @ApiProperty({
    example: '14:00',
    description: 'Horario da entrega',
  })
  @IsString()
  deliveryTime: string;

  @ApiProperty({
    example: '50',
    description: 'Valor do pedido',
  })
  @IsString()
  value: string;

  @ApiProperty({
    example:'2345',
    description:"Código de verificação"
  })
  @IsString()
  verificationCode: string;

  @ApiProperty({
    example: '1',
    description: 'Modo de pagamento',
  })
  @IsEnum(modoPagamento)
  modoPagamento: number;

  @ApiProperty({
    example: 'CreateUserDto',
    description: 'Usuario da compra',
  })
  user: CreateUserDto;
  
  @ApiProperty({
    example: 'ProductDto',
    description: 'Produtos da compra',
  })product: CreateProductDTO[];
}
