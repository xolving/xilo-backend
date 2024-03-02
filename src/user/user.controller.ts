import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from '../auth/dto/signup.dto';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async getUserList(){
    return await this.userService.getUserList();
  }
}
