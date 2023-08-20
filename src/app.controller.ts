import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { CreateTweetDTO } from './dtos/create-tweet.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Get()
  getUsers() {
    return this.appService.getUsers();
  }

  @Post('/sign-up')
  @HttpCode(200)
  postUser(@Body() body: CreateUserDTO) {
    return this.appService.postUser(body);
  }

  @Get('/tweets')
  getTweet(@Query('page') page?: number) {
    return this.appService.getTweets(page);
  }

  @Post('/tweets')
  postTweet(@Body() body: CreateTweetDTO) {
    return this.appService.postTweets(body);
  }

  @Get('/tweets/:username')
  getTweetsByUser(@Param('username') username: string) {
    return this.appService.getTweetsByUser(username);
  }
}
