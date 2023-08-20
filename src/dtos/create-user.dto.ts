import { IsString, IsUrl } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDTO {
  @IsString({
    message: 'All fields are required!',
  })
  username: string;
  @IsUrl(
    {},
    {
      message: 'All fields are required!',
    },
  )
  avatar: string;

  toUser() {
    return new User(this.username, this.avatar);
  }
}
