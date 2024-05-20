import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateShoppingDTO } from "src/dto/shopping/create-shopping.dto";
import { UpdateShoppingDto } from "src/dto/shopping/update-shopping.dto";
import { ShoppingEntity } from "src/entities/shopping.entity";
import { Repository } from "typeorm";
import { UserEntity } from "src/entities/user.entity";
import { ProductService } from "./product.service";

import { FindByIdDto } from "src/dto/shopping/findByIdDto";
import { FindByUserIdDto } from "src/dto/product/findByUserIdDto";
import { findByEmailDto } from "src/dto/shopping/findByEmailDTO";
import { CreateProductDTO } from "src/dto/product/create-product.dto";
import { FindByStatus } from "src/dto/shopping/findByStatus.dto";

@Injectable()
export class ShoppingService {
  constructor(
    @InjectRepository(ShoppingEntity)
    private shoppingRepository: Repository<ShoppingEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private productService: ProductService,
  ) {}

  async create(data: CreateShoppingDTO) {
   const dataAtual = new Date();
   data.deliveryTime = dataAtual.toString();
   data.verificationCode = (Math.trunc(Math.random()*(9999-1000)+1000)).toString();
   
    const shopping = this.shoppingRepository.create(data);
    return this.shoppingRepository.save(shopping);
  }

  findAll() {
    return this.shoppingRepository.find();
  }

  async findOne(id: number) {
    await this.exists(id);

    return this.shoppingRepository.findOneBy({
      id,
    });
  }

  async findByUser(data: findByEmailDto) {
    const email = data.email;
    const user = await this.userRepository.findOneBy({
      email,
    });

    const idUser2 = user.id;

    const shopping = await this.shoppingRepository
      .createQueryBuilder("shopping")
      .leftJoinAndSelect("shopping.userEntity", "userEntity")
      .where("shopping.userEntity = :idUser2", { idUser2 })
      .getOne();

    const idUser3: FindByUserIdDto = { id: shopping.id };

    return this.productService.findByShopping(idUser3);
  }

  async findAllShoppingByUser(data: FindByIdDto) {
    const id = data.id;
    return this.shoppingRepository
      .createQueryBuilder("shopping")
      .leftJoinAndSelect("shopping.userEntity", "userEntity")
      .where("shopping.userEntity = :id", { id })
      .getMany();
  }

  async findAllShoppingByStatus(data: FindByStatus) {
    const id = data.id;
    console.log(data.status);
    const status = data.status;
    return this.shoppingRepository
      .createQueryBuilder("shopping")
      .leftJoinAndSelect("shopping.userEntity", "userEntity")
      .where("shopping.userEntity = :id", { id })
      .andWhere("shopping.status = :status", { status })
      .getMany();
  }

  async update(
    id: number,
    {
      storeAddress,
      deliveryAddress,
      deliveryTime,
      duration,
      value,
      modoPagamento,
    }: UpdateShoppingDto,
  ) {
    await this.exists(id);

    await this.shoppingRepository.update(id, {
      storeAddress,
      deliveryAddress,
      deliveryTime,
      duration,
      value,
      modoPagamento,
    });

    return this.findOne(id);
  }

  async updatePartial(
    id: number,
    {
      storeAddress,
      deliveryAddress,
      deliveryTime,
      duration,
      value,
      modoPagamento,
    }: UpdateShoppingDto,
  ) {
    await this.exists(id);

    const data: any = {};

    if (value) {
      data.value = value;
    }

    if (modoPagamento) {
      data.modoPagamento = modoPagamento;
    }

    if (duration) {
      data.duration = duration;
    }

    if (storeAddress) {
      data.storeAddress = storeAddress;
    }

    if (deliveryAddress) {
      data.deliveryAddress = deliveryAddress;
    }

    if (deliveryTime) {
      data.deliveryTime = deliveryTime;
    }

    await this.shoppingRepository.update(id, data);

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.exists(id);

    await this.shoppingRepository.delete(id);

    return true;
  }

  async exists(id: number) {
    if (
      !(await this.shoppingRepository.exist({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`A compra com o ${id} não existe.`);
    }
  }
}
