import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ){}

  async create(data: CreateUserDto) {
    if(
      await this.userRepository.exist({
        where:{
          email: data.email,
        },
      })
    ){
      throw new BadRequestException('Este e-mail já está sendo usado.');
    }
    
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);

  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    await this.exists(id);

    return this.userRepository.findOneBy({
      id,
    });
  }

  async update(id: number, { email, name, birthAt, role }: UpdateUserDto) {
    await this.exists(id);

    const salt = await bcrypt.genSalt();

    await this.userRepository.update(id, {
      email,
      name,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    });

    return this.findOne(id);
  }

  async updatePartial(
    id: number,
    { email, name, birthAt, role }: UpdateUserDto,
  ){
    await this.exists(id);

    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (role) {
      data.role = role;
    }

    await this.userRepository.update(id, data);

    return this.findOne(id);

  }

  async remove(id: number) {
    await this.exists(id);

    await this.userRepository.delete(id);

    return true;
  }

  async exists(id: number){
    if(
      !(await this.userRepository.exist({
        where: {
          id,
        },
      }))
    ){
      throw new NotFoundException(`O usuário ${id} não existe.`);
    }
  }

}
