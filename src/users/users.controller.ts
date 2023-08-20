import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post('/sign-up')
  @HttpCode(200)
  postUser(@Body() body: CreateUserDTO) {
    return this.userService.postUser(body);
  }
}
