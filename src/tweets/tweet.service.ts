import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Tweet } from '../entities/tweet.entity';
import { CreateTweetDTO } from '../dtos/create-tweet.dto';
import { users } from '../users/users.service';

@Injectable()
export class TweetService {
  private tweets: Tweet[] = [];
  getTweets(page?: number): Tweet[] {
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
    return this.tweets.slice(initial, final);
  }
  postTweets({ username, tweet }: CreateTweetDTO) {
    const user = users.find((el) => el.username === username);
    if (!user) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    const newTweet = new Tweet(user.username, user.avatar, tweet);
    this.tweets.push(newTweet);
  }
}
