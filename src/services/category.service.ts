import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { CategoryEntity } from 'src/entities/category.entity';
import { CreateCategoryDto } from 'src/dto/category/create-category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity)
        private categoryRepository: Repository<CategoryEntity>,
    ){}

    async create(data: CreateCategoryDto) {

        const card = this.categoryRepository.create(data);
    
        return this.categoryRepository.save(card);
    
      }
    
      findAll() {
        return this.categoryRepository.find();
      }
    
      async findById(id: number) {
        await this.exists(id);
    
        return this.categoryRepository.findOneBy({
          id,
        });
      }
      
      async remove(id: number) {
        await this.exists(id);
    
        await this.categoryRepository.delete(id);
    
        return true;
      }
    
      async exists(id: number){
        if(
          !(await this.categoryRepository.exist({
            where: {
              id,
            },
          }))
        ){
          throw new NotFoundException(`A categoria com o ${id} não existe.`);
        }
      }
}