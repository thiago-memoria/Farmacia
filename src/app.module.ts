import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingModule } from './modules/shopping.module';
import { UsersModule } from './modules/users.module';
import { ProductModule } from './modules/product.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AddressModule } from './modules/address.module';
import { CardsModule } from './modules/card.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { AuthModule } from './modules/auth.module';
import { CategoryModule } from './modules/category.module';
import { CardEntity } from './entities/card.entity';
import { AddressEntity } from './entities/address.entity';
import { CategoryEntity } from './entities/category.entity';
import { ProductEntity } from './entities/product.entity';
import { ShoppingEntity } from './entities/shopping.entity';
import { UserEntity } from './entities/user.entity';


@Module({
  imports: [ ProductModule, ShoppingModule, UsersModule, AddressModule, CardsModule, AuthModule, CategoryModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "consigaki-stg.ckqeyskgbzkh.us-east-2.rds.amazonaws.com",
      port: Number("3306"),
      username: "admin",
      password: "senhadeteste3000",
      database: "Ifarma",
      entities: [UserEntity, ShoppingEntity, ProductEntity, CategoryEntity, AddressEntity, CardEntity],
      synchronize: process.env.ENV === 'development',
    }),
    ConfigModule.forRoot({
      envFilePath: process.env.ENV === 'test' ? '.env.test' : '.env',
    }),
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'greg.pfannerstill@ethereal.email',
          pass: '8ckAh78whHeYWm2YPd'
        }
      },
      defaults: {
        from: '"thiago-teste" <greg.pfannerstill@ethereal.email>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        }
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService]
})
export class AppModule { }
