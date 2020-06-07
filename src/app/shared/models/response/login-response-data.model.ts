import { User } from '../user.model';

export class LoginResponseData {

  private _expiresIn: number;
  private _accessToken: string;
  private _user: User;

  get accessToken(): string { return this._accessToken; }
  get expiresIn(): number { return this._expiresIn; }
  get user(): User { return this._user; }

  constructor(accessToken: string, expiresIn: number, user: User) {
    this._accessToken = accessToken;
    this._expiresIn = expiresIn;
    this._user = user;
  }

  public toJson(): object {
    return {
      accessToken: this.accessToken,
      expiresIn: this.expiresIn,
      user: this.user.toJson()
    };
  }
}
