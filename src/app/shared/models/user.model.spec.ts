import { User } from './user.model';

describe('User', () => {
  let token: User;

  beforeEach(() => {
    token = new User(1, 'admin@flikshop.com', 'Admin', 'User');
  });

  it('should be initialized', () => {
    expect(token).toBeTruthy();
  });

  it('should serialize to json properly', () => {
    const jsonPropertiesActual = Object.keys(token.toJson());
    const jsonPropertiesExpected = [
      'id',
      'userId',
      'userStatus',
      'role',
      'userName',
      'password',
      'firstName',
      'lastName',
      'phoneNumber',
      'phoneType',
      'email',
      'avatarUrl',
      'credits'
    ];

    expect(jsonPropertiesActual).toEqual(jsonPropertiesExpected);

    const jsonValuesActual = Object.values(token.toJson());
    const jsonValuesExpected = [
      0,
      '',
      0,
      0,
      'admin@flikshop.com',
      '',
      'Admin',
      'User',
      '',
      '',
      '',
      '',
      0
    ];

    expect(jsonValuesActual).toEqual(jsonValuesExpected);
  });
});
