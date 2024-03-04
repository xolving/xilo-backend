import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { isEmail } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async findByUsernameOrEmail(key: string){
    return await this.userRepository.findOneBy(
      isEmail(key) ? {"email": key} : {"username": key}
    )
  }
}
