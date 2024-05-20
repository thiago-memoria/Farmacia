import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateProductDTO } from "src/dto/product/create-product.dto";

import { FindByNameProductDto } from "src/dto/product/findByNameDto";
import { FindByUserIdDto } from "src/dto/product/findByUserIdDto";
import { UpdateProductDto } from "src/dto/product/update-product.dto";

import { ProductService } from "src/services/product.service";

@ApiTags("product")
@Controller("product")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() CreateProductDTO: CreateProductDTO) {
    return this.productService.create(CreateProductDTO);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get("/itens")
  findItens(){
    return this.productService.findProducts();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productService.findOne(+id);
  }

  @Post("/name")
  findOneByName(@Body() nameProduct: FindByNameProductDto) {
    return this.productService.findByName(nameProduct);
  }

  @Post("/shopping")
  findByUser(@Body() id: FindByUserIdDto) {
    return this.productService.findByShopping(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMercadoriaDto: UpdateProductDto,
  ) {
    return this.productService.update(+id, updateMercadoriaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productService.remove(+id);
  }
}
