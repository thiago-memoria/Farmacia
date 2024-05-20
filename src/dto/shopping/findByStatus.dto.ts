import { IsNumber } from "class-validator";

export class FindByStatus {
  
  @IsNumber()
  id: number;

  @IsNumber()
  status: number;
}