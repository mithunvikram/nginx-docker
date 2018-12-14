import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { LoginService } from './login.service';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

describe('LoginComponent', () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let userNameEl: DebugElement;
  let passwordEl: DebugElement;
  let submitEl: DebugElement;
  let loginService: LoginService = null;
  // @ViewChild('ForgotPassword')
  // ForgotPassword: ModalComponent;
  let modalComponentFixture: ComponentFixture<ModalComponent>;
  let backend: MockBackend = null;
  let store = {};

  TestBed.overrideComponent(LoginComponent, {
    set: {
      providers: [
        {
          provide: LoginService,
          useValue: loginService
        },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        }
      ]
    }
  });


  beforeEach(async(() => {
    // loginService = loginService;
    // backend = mockBackend;
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent
      ],
      imports: [
        RouterModule.forRoot([{
          path: '',
          component: LoginComponent
        }]),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2Bs3ModalModule,
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        LoginService,
        ApiService,
        ConfigService,
        Constants,
        SharedService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      // modalComponentFixture = TestBed.createComponent(ModalComponent);
      comp = fixture.componentInstance;
      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      userNameEl = fixture.debugElement.query(By.css('input[id=InputEmail1]'));
      passwordEl = fixture.debugElement.query(By.css('input[id=InputPassword1]'));
      submitEl = fixture.debugElement.query(By.css('.login-btn'));
    });
  }));

  beforeEach(inject([LoginService, MockBackend], (Service: LoginService, mockBackend: MockBackend) => {
    loginService = Service;
    backend = mockBackend;
  }));


  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('To check the initial value', () => {
    expect(comp.submitted).toBe(false);
    expect(comp.spinnerlogo).toBeFalsy();
    expect(comp.data).toEqual({});
  });

  // it(`entering value in username and password input controls`, () => {
  //   userNameEl.nativeElement.value = 'admin';
  //   passwordEl.nativeElement.value = 'admin';
  //   fixture.detectChanges();
  // });

  // it('after entering value the button should enabled and click Action should happen', () => {
  //   userNameEl.nativeElement.value = 'admin';
  //   passwordEl.nativeElement.value = 'admin';
  //   fixture.detectChanges();
  //   expect(submitEl.nativeElement.disabled).toBeFalsy();
  //   const buttonElement = fixture.nativeElement.querySelector('.login-btn');
  //   console.log('the butttonElement are -------- ', buttonElement);
  //   fixture.debugElement.triggerEventHandler(buttonElement, 'click');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(comp.onSubmit).toHaveBeenCalled;
  //   // const loginButtonSpy = spyOn(comp, 'onSubmit');
  //   // submitEl.triggerEventHandler('click', null);
  //   // expect(loginButtonSpy).toHaveBeenCalled();
  // });

  // 22
  // it('should call #onSubmit method', fakeAsync(() => {
  //   userNameEl.nativeElement.value = 'admin';
  //   passwordEl.nativeElement.value = 'admin';
  //   fixture.detectChanges();
  //   spyOn(comp, 'onSubmit');
  //   const buttonElement = fixture.debugElement.nativeElement.querySelector('.text-center button');
  //   console.log('the butttonElement are -------- ', submitEl);
  //   buttonElement.click();
  //   fixture.whenStable().then(() => {
  //     expect(comp.onSubmit).toHaveBeenCalled();
  //   });
  // }));

  // 33
  it('should ###', (done) => {
    // userNameEl.nativeElement.value = 'admin';
    // passwordEl.nativeElement.value = 'admin';
    // userNameEl.nativeElement.dispatchEvent(new Event('input'));
    // passwordEl.nativeElement.dispatchEvent(new Event('input'));
    // // dispatchEvent(new Event('input'));
    // fixture.detectChanges();
    // spyOn(comp, 'onSubmit'); // method attached to the click.
    // let btn = fixture.debugElement.query(By.css('button'));
    const userModel = userNameEl.injector.get(NgModel);
    const passwordModel = passwordEl.injector.get(NgModel);
    // tick();
    userModel.valueAccessor.writeValue('admin');
    passwordModel.valueAccessor.writeValue('admin');
    userNameEl.nativeElement.dispatchEvent(new Event('input'));
    passwordEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    submitEl.triggerEventHandler('click', null);
    // submitEl.injector.get(NgModel);
    // submitEl.nativeElement
    // tick(); // simulates the passage of time until all pending asynchronous activities finish
    // fixture.detectChanges();
    // tslint:disable-next-line:no-unused-expression
    expect(comp.onSubmit).toHaveBeenCalled;
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));

      // Check the request method
      expect(connection.request.method).toEqual(RequestMethod.Post);
      // Check the url
      expect(connection.request.url).toEqual('/auth/login');
      // Check the body
      // expect(connection.request.text())
      expect(connection.request.text()).toEqual(JSON.stringify({ username: 'admin', password: 'admin' }));
      // Check the request headers
      expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    });

    loginService.login('admin', 'admin')
      .subscribe((response) => {
        console.log('response values are ---####------------ ', response);
        // Check the response
        expect(response.user.username).toEqual('admin');
        expect(response.user.password).toEqual('admin');
        // set value in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(response));
        sessionStorage.setItem('token', JSON.stringify(response.token));
        sessionStorage.setItem('dismissOrders', 'false');

        // spyOn(localStorage, 'getItem').andCallFake(function (key) {
        //   return store[key];
        // });
        // spyOn(localStorage, 'setItem').andCallFake(function (key, value) {
        //   return store[key] = value + '';
        // });
        // spyOn(localStorage, 'clear').andCallFake(function () {
        //     store = {};
        // });

        spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
          return store[key] = value + '';
        });

        done();
      },
        (error) => {
          expect(error).toThrowError();
        });
  });

  it('should run #OpenDialog()', async () => {
    // fixture.debugElement.query(By.css('.login-btn'));
    const forgotPasswordElement = fixture.debugElement.query(By.css('.forgotpassword a'));
    // const forgotPasswordElement = fixture.nativeElement.querySelector('.forgotpassword a');
    console.log('forgot element are -------- ', forgotPasswordElement);
    fixture.detectChanges();
    forgotPasswordElement.triggerEventHandler('click', null);
    // const result = component.OpenDialog();
    // spyOn(comp, 'OpenDialog');
    // comp.OpenDialog();
    // const ForgotPassword: ModalComponent = comp.ForgotPassword;
    // console.log('forgotPassword new', ForgotPassword);
    // expect(ForgotPassword).toBeDefined();
    // // comp.ForgotPassword.open();
    // comp.OpenDialog();
    // spyOn(comp , 'ForgotPassword');
    // comp.ForgotPassword.open();
    // tslint:disable-next-line:no-unused-expression
    // expect(comp.OpenDialog).toHaveBeenCalled;
    // expect(comp.data.mail).toBe('');
    // comp.ForgotPassword.open();

  });

  it('should run #closeOption()', async () => {
    // const result = component.closeOption();
    comp.closeOption();
    spyOn(comp, 'closeOption');
    expect(comp.closeOption).toBeTruthy();
  });

  it('should run #SendMail()', async () => {
    // const result = component.SendMail();
    const sendMailButton = fixture.debugElement.query(By.css('modal-footer button'));
    console.log('send mail button values are --------- ', sendMailButton);
    fixture.detectChanges();
    sendMailButton.triggerEventHandler('click', null);
  });



  // 44
  // it('should do something on blur', () => {
  //   spyOn(component, 'someMethod');
  //   // first round of change detection
  //   fixture.detectChanges();

  //   // get ahold of the input
  //   let input = debugElement.query(By.css('#myInput'));
  //   let inputElement = input.nativeElement;

  //   //set input value
  //   inputElement.dispatchEvent(new Event('blur'));

  //   expect(component.someMethod).toHaveBeenCalled();
  // });

  // it('calling onSubmit method after clicked the login button', () => {
  //   comp.submitted = true;
  //   comp.spinnerlogo = true;
  //   comp.errorDiagnostic = null;
  //   comp.mailerrorDiagnostic = null;
  //   expect(comp.submitted).toBeTruthy();
  //   expect(comp.spinnerlogo).toBeTruthy();
  //   expect(comp.errorDiagnostic).toBeNull();
  //   expect(comp.mailerrorDiagnostic).toBeNull();
  // });

  // it('#login should call endpoint and return it\'s result', (done) => {
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     const options = new ResponseOptions({
  //       body: JSON.stringify({ success: true })
  //     });
  //     connection.mockRespond(new Response(options));

  //     // Check the request method
  //     expect(connection.request.method).toEqual(RequestMethod.Post);
  //     // Check the url
  //     expect(connection.request.url).toEqual('/auth/login');
  //     // Check the body
  //     // expect(connection.request.text())
  //     expect(connection.request.text()).toEqual(JSON.stringify({ username: 'admin', password: 'admin' }));
  //     // Check the request headers
  //     expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
  //   });

  //   loginService.login('admin', 'admin')
  //     .subscribe((response) => {
  //       console.log('response values are ---####------------ ', response);
  //       // Check the response
  //       expect(response.user.username).toEqual('admin');
  //       expect(response.user.password).toEqual('admin');
  //       // set value in sessionStorage
  //       sessionStorage.setItem('currentUser', JSON.stringify(response));
  //       sessionStorage.setItem('token', JSON.stringify(response.token));
  //       sessionStorage.setItem('dismissOrders', 'false');

  //       done();
  //     },
  //       (error) => {
  //         expect(error).toThrowError();
  //       });
  // });





  // it('should create a component', async () => {
  //   expect(component).toBeTruthy();
  // });


  // it('should run #ngOnInit()', async () => {
  //   // const result = component.ngOnInit();
  // });

  // it('should run #onSubmit()', async () => {
  //   // const result = component.onSubmit();
  // });

  // it('should run #OpenDialog()', async () => {
  //   // const result = component.OpenDialog();
  // });

  // it('should run #closeOption()', async () => {
  //   // const result = component.closeOption();
  // });

  // it('should run #SendMail()', async () => {
  //   // const result = component.SendMail();
  // });


});
