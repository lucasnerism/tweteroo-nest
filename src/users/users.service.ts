import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';

export const users: User[] = [];

@Injectable()
export class UserService {
  getUsers(): User[] {
    return users;
  }
  postUser(userDTO: CreateUserDTO) {
    return users.push(new User(userDTO.username, userDTO.avatar));
  }
}
