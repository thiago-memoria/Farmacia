import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCardDto } from 'src/dto/card/create-card.dto';
import { FindCardByUserDTO } from 'src/dto/card/findCardByUser.dto';
import { CardsService } from 'src/services/card.service';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardService: CardsService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get()
  findAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }

  @Post("/user")
  findByUser(@Body() findCardByUserDTO: FindCardByUserDTO){
    return this.cardService.findByUser(findCardByUserDTO);
  }
}