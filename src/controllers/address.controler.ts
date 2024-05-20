import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AddressDto } from "src/dto/address/address.dto";
import { AddressService } from "src/services/address.service";

@ApiTags('address')
@Controller('address')
export class AddressController{
    constructor(private readonly addressService: AddressService) {}

  @Post()
  create(@Body() createUserDto: AddressDto) {
    return this.addressService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}