import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import { MailerService } from "@nestjs-modules/mailer/dist";
import * as bcrypt from "bcrypt";
import { UserEntity } from "src/entities/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRegisterDTO } from "src/dto/auth/auth-register.dto";

@Injectable()
export class AuthService {
  private issuer = "login";
  private audience = "users";

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailer: MailerService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: "7 days",
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async login(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException("E-mail não cadastrado.");
    }

    return user;
  }

  async forget(email: string) {
    const user = await this.usersRepository.findOneBy({
      email,
    });

    if (!user) {
      throw new UnauthorizedException("E-mail está incorreto.");
    }

    const token = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: "30 minutes",
        subject: String(user.id),
        issuer: "forget",
        audience: "users",
      },
    );

    await this.mailer.sendMail({
      subject: "Recuperação de Senha",
      to: "teste@ifarma.com.br",
      template: "forget",
      context: {
        name: user.name,
        token,
      },
    });

    return { success: true };
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.jwtService.verify(token, {
        issuer: "forget",
        audience: "users",
      });

      if (isNaN(Number(data.id))) {
        throw new BadRequestException("Token é inválido.");
      }

      const salt = await bcrypt.genSalt();

      const user = await this.userService.findOne(Number(data.id));

      return this.createToken(user);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async register(data: AuthRegisterDTO) {
    delete data.role;

    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
