import { User } from './user.entity';

export class Tweet {
  private _user: User;
  private _tweet: string;

  constructor(username: string, avatar: string, tweet: string) {
    this._user = new User(username, avatar);
    this._tweet = tweet;
  }

  get user(): User {
    return this._user;
  }

  get tweet(): string {
    return this._tweet;
  }
}
