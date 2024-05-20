import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AddressDto } from "src/dto/address/address.dto";
import { AddressEntity } from "src/entities/address.entity";
import { Repository } from "typeorm";

@Injectable()
export class AddressService{
    constructor(
        @InjectRepository(AddressEntity)
        private AddressRepository: Repository<AddressEntity>,
    ){}

    async create(data: AddressDto){
        
        const address = this.AddressRepository.create(data);
        return this.AddressRepository.save(address);
    }

    findAll(){
        return this.AddressRepository.find();
    }
    
    async findOne(id: number){
        await this.exists(id);

        return this.AddressRepository.findOneBy({
            id,
        });
    }

    async remove(id: number){
        await this.exists(id);

        await this.AddressRepository.delete(id);
        
        return true;
    }

    async exists(id: number){
        if(
            !(await this.AddressRepository.exist({
                where: {
                    id,
                }
            }))
        ){
            throw new NotFoundException (`O endereço ${id} não existe.`);
        }
    }
}