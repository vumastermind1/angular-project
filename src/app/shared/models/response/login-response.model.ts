import { LoginResponseData } from './login-response-data.model';

export class LoginResponse {

  private _hasErrors: boolean;
  private _data: LoginResponseData;

  get hasErrors(): boolean { return this._hasErrors; }
  get data(): LoginResponseData { return this._data; }

  constructor(hasErrors: boolean, data: LoginResponseData) {
	this._hasErrors = hasErrors;
	this._data = data;
  }

  public toJson(): object {
	return {
		hasErrors: this.hasErrors,
		data: this.data
	};
  }
}
