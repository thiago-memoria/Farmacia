import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from 'src/services/category.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/dto/category/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/category/update-category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() createcategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createcategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
