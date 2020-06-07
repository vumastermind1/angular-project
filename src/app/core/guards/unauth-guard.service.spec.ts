import { TestBed } from '@angular/core/testing';

import { UnauthGuardService } from './unauth-guard.service';

describe('UnauthGuardService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: UnauthGuardService = TestBed.get(UnauthGuardService);
		expect(service).toBeTruthy();
	});
});
