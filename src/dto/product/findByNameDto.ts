import { IsString } from "class-validator";

export class FindByNameProductDto {
  @IsString()
  name: string;
}
