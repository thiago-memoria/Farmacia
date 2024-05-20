import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controllers/product.controller';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductService } from 'src/services/product.service';



@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity])
  ],

  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
