import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "src/controllers/auth.controller";
import { UsersModule } from "./users.module";
import { AuthService } from "src/services/auth.service";
import { UserEntity } from "src/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports:[
        JwtModule.register({
        secret: `f=3Jz@.XJvndX7U?2I<g.,cdv98lW?ES`
    }),
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([UserEntity]),

],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule{}
