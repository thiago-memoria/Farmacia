import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";
import { solicitacaoCompraStatus } from "src/enum/solicitacaoCompraStatus.enum";
import { modoPagamento } from "src/enum/modoPagamento.enum";

@Entity({
  name: "shoppings",
})
export class ShoppingEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id?: number;

  @Column()
  storeAddress: string;

  @Column()
  deliveryAddress: string;

  @Column()
  deliveryTime: string;

  @Column()
  duration: string;

  @Column({
    default: solicitacaoCompraStatus.Created,
  })
  status: number;

  @Column()
  verificationCode: string;

  @Column()
  value: string;

  @Column({
    default: modoPagamento.Credit,
  })
  modoPagamento: number;

  @OneToMany(
    () => ProductEntity,
    (productEntity) => productEntity.shoppingEntity,{
      cascade:true
    }
  )
  @JoinTable()
  productEntity: ProductEntity[];

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.shoppingEntity, {
  })
  userEntity: UserEntity;
}
