import { IsNumber } from "class-validator";

export class FindByUserIdDto {
  @IsNumber()
  id: number;
}
