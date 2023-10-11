import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
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

  update = async (id: number, updateUserDto: UpdateUserDto) => {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    await this.userRepository.save({ id: user.id, ...updateUserDto });
    return `This action updates a #${id} user`;
  };

  remove = async (id: number) => await this.userRepository.delete(id);

  addAddressById = async (id: number, createAddressDto: CreateAddressDto) => {
    const address = await this.userRepository.findOne({
      where: { id },
      relations: { address: true },
    });
    if (!address?.id) throw new NotFoundException('not found user');

    // address.address.map(async (addr) => {
    //   delete addr.id;
    //   console.log({ ...addr, user_id: id });
    //   await this.addressRepository.save({ ...addr });
    // });
    console.log(createAddressDto);
    await this.addressRepository.save(createAddressDto);

    return address.address;
  };
}
