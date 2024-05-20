import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressController } from "src/controllers/address.controler";
import { AddressEntity } from "src/entities/address.entity";
import { AddressService } from "src/services/address.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([AddressEntity])
    ],

    controllers: [AddressController],
    providers: [AddressService],
    exports: [AddressService],
})
export class AddressModule{}