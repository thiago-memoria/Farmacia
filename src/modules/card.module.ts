import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardsController } from "src/controllers/card.controler";
import { CardEntity } from "src/entities/card.entity";
import { CardsService } from "src/services/card.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity])
      ],

      controllers: [CardsController],
      providers: [CardsService],
      exports: [CardsService],
})
export class CardsModule{}