import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Tweet } from './entities/tweet.entity';
import { User } from './entities/user.entity';
import { CreateUserDTO } from './dtos/create-user.dto';
import { CreateTweetDTO } from './dtos/create-tweet.dto';

@Injectable()
export class AppService {
  private tweets: Tweet[];
  private users: User[];
  constructor() {
    this.tweets = [];
    this.users = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  getUsers(): User[] {
    return this.users;
  }

  postUser(userDTO: CreateUserDTO) {
    return this.users.push(new User(userDTO.username, userDTO.avatar));
  }

  getTweets(page?: number) {
    const maxPage = Math.ceil(this.tweets.length / 15);
    if (page < 1) {
      throw new BadRequestException('Informe uma página válida');
    }
    if (page > maxPage) {
      return [];
    }
    if (page === undefined) {
      page = 1;
    }
    const initial = page * -15;
    const final = this.tweets.length - (page - 1) * 15;
    return this.formatTweet(this.tweets).slice(initial, final);
  }

  private formatTweet(tweets: Tweet[]) {
    return tweets.map((tt) => {
      const { username, avatar } = tt.user;
      return {
        username,
        avatar,
        tweet: tt.tweet,
      };
    });
  }

  postTweets({ username, tweet }: CreateTweetDTO) {
    const user = this.users.find((el) => el.username === username);
    if (!user) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    const newTweet = new Tweet(user.username, user.avatar, tweet);
    this.tweets.push(newTweet);
  }

  getTweetsByUser(username: string) {
    const userTweets = this.tweets.filter(
      (el) => el.user.username === username,
    );
    return this.formatTweet(userTweets);
  }
}
