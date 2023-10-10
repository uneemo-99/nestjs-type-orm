import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/users/entities/address.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        database: configService.getOrThrow('POSTGRES_DB'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        entities: [User, Address],
        synchronize: configService.getOrThrow('POSTGRES_SYNC'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
