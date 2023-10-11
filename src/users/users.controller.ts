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
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAddressDto } from './dto/create-address.dto';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @Inject("USER_SERVICE")
    private userMicroSvc: ClientProxy
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userMicroSvc.send('get-users', {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    // return this.usersService.findOne(+id);
    return this.userMicroSvc.send('get-user', id);
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

  @EventPattern('get-users')
  async sendUsers() {
    console.log('calling microSVC : get-users')
    return await this.usersService.findAll()
  }

  @EventPattern('get-user')
  async sendUser(data: number) {
    console.log('calling microSVC : get-user')
    return this.usersService.findOne(+data)
  }

}
