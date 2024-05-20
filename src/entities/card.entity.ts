import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tipoCartao } from "src/enum/tipoCartao.enum";
import { UserEntity } from "./user.entity";

@Entity({
    name: 'cards',
})
export class CardEntity{

    @PrimaryGeneratedColumn({
      })
      id: number;

    @Column()
    cardNumber: string;

    @Column()
    expirationDate: string;

    @Column()
    cvv: string;

    @Column()
    cpf_cnpj: string;

    @Column()
    cardNickname: string;

    @Column()
    name: string;

    @Column({
        default: tipoCartao.Credit,
      })
    type: number;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.cardEntity,{
      eager:true,
      cascade: true
    })
    userEntity: UserEntity;
}