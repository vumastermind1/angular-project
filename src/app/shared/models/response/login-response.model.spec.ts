import { LoginResponse } from './login-response.model';
import { User } from '../user.model';
import { LoginResponseData } from './login-response-data.model';

describe('LoginResponse', () => {
  let loginResponse: LoginResponse;

  beforeEach(() => { loginResponse = new LoginResponse(false, new LoginResponseData('', 100, new User(1, '', '', ''))); });

  it('should be initialized', () => {
	expect(loginResponse).toBeTruthy();
  });

  it('should serialize to json properly', () => {
	const jsonPropertiesActual = Object.keys(loginResponse.toJson());
	const jsonPropertiesExpected = ['hasErrors', 'data'];

	expect(jsonPropertiesActual).toEqual(jsonPropertiesExpected);

	const jsonValuesActual = Object.values(loginResponse.toJson());
	const jsonValuesExpected = [false, ['', 100, [1, '', '', '']]];

	expect(jsonValuesActual).toEqual(jsonValuesExpected);
  });
});
