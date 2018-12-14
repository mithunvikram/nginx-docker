import { async } from '@angular/core/testing';
import { ForgotPasswordService } from './ForgotPassword.service';

describe('ForgotPasswordService', () => {
  let service;


  const http: any = {
    // mock properties here
  };

  const router: any = {
    // mock properties here
  };

  const api: any = {
    // mock properties here
  };

  const config: any = {
    // mock properties here
  };

  beforeEach(() => {
    service = new ForgotPasswordService(http, router, api, config);
  });


  it('should run #updatepassword()', async () => {
    // const result = updatepassword(token);
  });

  it('should run #updateUser()', async () => {
    // const result = updateUser(user);
  });

});