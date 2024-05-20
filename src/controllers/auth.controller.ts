import { Body, Controller, Post } from "@nestjs/common";
import { AuthForgetDTO } from "src/dto/auth/auth-forget.dto";
import { AuthLoginDTO } from "src/dto/auth/auth-login.dto";
import { AuthRegisterDTO } from "src/dto/auth/auth-register.dto";
import { AuthResetDTO } from "src/dto/auth/auth-reset.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthService } from "src/services/auth.service";
import { UsersService } from "src/services/users.service";

@Controller('auth')
export class AuthController{

    constructor(
        private readonly authService: AuthService
      ){}

    @Post('login')
    async login(@Body() {email}: AuthLoginDTO) {
    return this.authService.login(email);
  }

   @Post('register')
   async register(@Body() body: AuthRegisterDTO) {
   return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() {email}: AuthForgetDTO) {
  return this.authService.forget(email);
  }


  @Post('reset')
  async reset(@Body() {password, token}: AuthResetDTO) {
    return this.authService.reset(password, token);
  }


}