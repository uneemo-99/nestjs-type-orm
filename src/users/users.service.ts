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

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    const data = await this.userRepository.createQueryBuilder('user').getMany();
    return data;
  }

  async findOne(id: number) {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.address', 'address')
      .where('user.id = :id', { id })
      .getOne();
    if (!user) throw new NotFoundException('not found user');
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user?.id) throw new NotFoundException('not found user');
    return await this.userRepository.save({ id: user.id, ...updateUserDto });
  }

  async remove(id: number) {
    const result = await this.userRepository.softDelete(id);
    if (!result.affected) throw new NotFoundException('not found that user');
    return { msg: 'success' };
  }

  async restoreUser(id: number) {
    const result = await this.userRepository.restore(id);
    if (!result.affected) throw new NotFoundException('not found that user');
    return { msg: 'success' };
  }

  async addAddressById(id: number, createAddressDto: CreateAddressDto) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: { address: true },
    });
    if (!user?.id) throw new NotFoundException('not found user');
    const newAddress = await this.addressRepository.save(createAddressDto);
    user.address.push(newAddress);
    await this.userRepository.save(user);
    return newAddress;
  }

  async removeAddress(id: number) {
    const result = await this.addressRepository.softDelete(id);
    console.log(result);
    if (!result.affected) throw new NotFoundException('not found that address');
    return { msg: 'success' };
  }

  async restoreAddress(id: number) {
    const result = await this.addressRepository.restore(id);
    console.log(result);
    if (!result.affected) throw new NotFoundException('not found that address');
    return { msg: 'success' };
  }
}
