import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Delete('address/:id')
  async removeAddress(@Param('id') id: string) {
    return this.usersService.removeAddress(+id);
  }

  @Post(':id/address')
  addAddressById(
    @Param('id') id: string,
    @Body() createAddressDto: CreateAddressDto,
  ) {
    return this.usersService.addAddressById(+id, createAddressDto);
  }
}
