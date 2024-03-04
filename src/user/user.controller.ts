import {
  Controller,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
}
