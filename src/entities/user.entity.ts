import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ShoppingEntity } from "./shopping.entity";
import { AddressEntity } from "./address.entity";
import { Role } from "src/enum/role.enum";
import { CardEntity } from "./card.entity";

@Entity({
  name: "users",
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column({
    length: 63,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column({
    type: "date",
    nullable: true,
  })
  birthAt?: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({
    default: Role.User,
  })
  role: number;

  @Column()
  cpf: string;

  @Column()
  numero: string;

  @OneToMany(
  () => ShoppingEntity,
  (shoppingEntity) => shoppingEntity.userEntity,
  )
  shoppingEntity: ShoppingEntity[];

  @OneToMany(() => AddressEntity, (addressEntity) => addressEntity.userEntity)
  addressEntity: AddressEntity[];

  @OneToMany(() => CardEntity, (cardEntity) => cardEntity.userEntity)
  cardEntity: CardEntity[];
}
