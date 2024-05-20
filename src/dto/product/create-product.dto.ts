import { IsBoolean, IsString, IsObject, IsNumber } from 'class-validator';
import { CreateCategoryDto } from '../category/create-category.dto';
import { CreateShoppingDTO } from '../shopping/create-shopping.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {

    @ApiProperty({
        example: 'Produto de limpeza',
        description: 'descrição do produto',
      })
    @IsString()
    description: string;
    
    @ApiProperty({
        example: '30',
        description: 'Preço do produto',
      })
    @IsString()
    price: string;
    
    @ApiProperty({
        example: 'Higiene',
        description: 'tipo do produto',
      })
    @IsString()
    kind: string;

    @ApiProperty({
        example: true,
        description: 'O produto possui desconto?',
      })
    @IsBoolean()
    discount: boolean;
    
    @ApiProperty({
        example: '2',
        description: 'Quantidade do produto',
      })
    @IsNumber()
    amount: number;
    
    @ApiProperty({
        example: 'imagem',
        description: 'Imagem do produto',
    })
    @IsString()
    image: string;

    @ApiProperty({
        example: 'Sabonete Dove',
        description: 'Nome do produto',
    })
    @IsString()
    name: string

    @ApiProperty({
        example: 'CategoryDto',
        description: 'Categoria do produTo',
    })
    @IsObject()
    category: CreateCategoryDto;

    @ApiProperty({
        example: 'CreateShoppingDto',
        description: 'Categoria do produto',
    })
    @IsObject()
    shopping: CreateShoppingDTO;
}