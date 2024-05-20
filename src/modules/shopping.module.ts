import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShoppingController } from "src/controllers/shopping.controller";
import { ShoppingEntity } from "src/entities/shopping.entity";
import { ShoppingService } from "src/services/shopping.service";
import { UsersModule } from "./users.module";
import { UserEntity } from "src/entities/user.entity";
import { ProductEntity } from "src/entities/product.entity";
import { ProductService } from "src/services/product.service";

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([ShoppingEntity]),
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([ProductEntity]),
  ],

  controllers: [ShoppingController],
  providers: [ShoppingService, ProductService],
  exports: [ShoppingService, ProductService],
})
export class ShoppingModule {}
