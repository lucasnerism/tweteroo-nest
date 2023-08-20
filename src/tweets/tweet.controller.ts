import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDTO } from '../dtos/create-tweet.dto';

@Controller()
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Get('/tweets')
  getTweet(@Query('page') page?: number) {
    return this.tweetService.getTweets(page);
  }
  @Post('/tweets')
  postTweet(@Body() body: CreateTweetDTO) {
    return this.tweetService.postTweets(body);
  }
}
