import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "src/controllers/category.controller";
import { CategoryEntity } from "src/entities/category.entity";
import { CategoryService } from "src/services/category.service";


@Module({
    imports: [
      TypeOrmModule.forFeature([CategoryEntity])
    ],
  
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
  })
  export class CategoryModule {}