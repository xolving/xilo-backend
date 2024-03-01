import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupDto } from './dto/signup.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public async createUser(@Body() signupDto: SignupDto) {
    return await this.userService.createUser(signupDto);
  }
}
