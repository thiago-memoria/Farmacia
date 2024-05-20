import { IsString } from "class-validator";

export class findByEmailDto {
  @IsString()
  email: string;
}
