import { PartialType } from '@nestjs/swagger';
import { CreateShoppingDTO } from './create-shopping.dto';

export class UpdateShoppingDto extends PartialType(CreateShoppingDTO) {}
