export class User {
  private _id: number;
  private _userId: string;
  private _userStatus: number;
  private _role: number;
  private _userName: string;
  private _password: string;
  private _firstName: string;
  private _lastName: string;
  private _phoneNumber: string;
  private _phoneType: number;
  private _email: string;
  private _avatarUrl: string;
  private _credits: number;

  get id(): number { return this._id; }
  get userId(): string { return this._userId; }
  get userStatus(): number { return this._userStatus; }
  get role(): number { return this._role; }
  get userName(): string { return this._userName; }
  get password(): string { return this._password; }
  get firstName(): string { return this._firstName; }
  get lastName(): string { return this._lastName; }
  get phoneNumber(): string { return this._phoneNumber; }
  get phoneType(): number { return this._phoneType; }
  get email(): string { return this._email; }
  get avatarUrl(): string { return this._avatarUrl; }
  get credits(): number { return this._credits; }

  constructor(id: number, userName: string, firstName: string, lastName: string) {
	this._id = id;
	this._userName = userName;
	this._firstName = firstName;
	this._lastName = lastName;
  }

  public toJson(): object {
	return {
		id: this.id,
		userId: this.userId,
		userStatus: this.userStatus,
		role: this.role,
		username: this.userName,
		password: this.password,
		firstName: this.firstName,
		lastName: this.lastName,
		phoneNumber: this.phoneNumber,
		phoneType: this.phoneType,
		email: this.email,
		avatarUrl: this.avatarUrl,
		credits: this.credits
	};
  }
}
