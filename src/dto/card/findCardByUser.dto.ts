import { IsNumber, IsString } from "class-validator";

export class FindCardByUserDTO {
  @IsNumber()
  id: number;
}