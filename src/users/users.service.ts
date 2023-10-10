import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  create = async (createUserDto: CreateUserDto) =>
    await this.userRepository.save(createUserDto);

  findAll = async () => await this.userRepository.find();

  findOne = async (id: number) => {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { address: true },
    });
    if (!user) throw new NotFoundException('not found user');
    return user;
  };

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove = async (id: number) => await this.userRepository.delete(id);

  addAddressById = async (id: number, createAddressDto: CreateAddressDto) => {
    const address = await this.userRepository.findOne({
      where: { id },
      relations: { address: true },
    });
    if (!address?.id) throw new NotFoundException('not found user');
    
    // address.address.push()
    return address.address;
  };
}
