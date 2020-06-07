import { LoginResponseData } from './login-response-data.model';
import { User } from '../user.model';

describe('LoginResponse', () => {
  let loginResponseData: LoginResponseData;

  beforeEach(() => {
    loginResponseData = new LoginResponseData('S0M3R@ND0MV@LU3', 3833, new User(1, 'test@test.com', 'Test', 'User'));
  });

  it('should be initialized', () => {
    expect(loginResponseData).toBeTruthy();
  });

  it('should serialize to json properly', () => {
    const jsonPropertiesActual = Object.keys(loginResponseData.toJson());
    const jsonPropertiesExpected = ['username', 'roleName', 'userId', 'token'];

    expect(jsonPropertiesActual).toEqual(jsonPropertiesExpected);

    const jsonValuesActual = Object.values(loginResponseData.toJson());
    const jsonValuesExpected = ['S0M3R@ND0MV@LU3', 3833, [1, 'test@test.com', 'Test', 'User']];

    expect(jsonValuesActual).toEqual(jsonValuesExpected);
  });
});
