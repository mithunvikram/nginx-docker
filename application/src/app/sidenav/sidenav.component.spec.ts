import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { SidenavComponent } from './sidenav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { LoginService } from '../login/login.service';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


describe('SidenavComponent', () => {
  let comp: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let el: HTMLElement;
  let loginService: LoginService = null;
  let backend: MockBackend = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      imports: [
        CommonModule,
        AvatarModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        BrowserModule
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
        SharedService,
        Constants,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        comp = fixture.componentInstance;
        // de = fixture.debugElement.query(By.css('form'));
        // el = de.nativeElement;
      });
  }));

  beforeEach(inject([LoginService, MockBackend], (Service: LoginService, mockBackend: MockBackend) => {
    loginService = Service;
    backend = mockBackend;
  }));


  beforeEach((done) => {
    // it('#login should call endpoint and return it\'s result', (done) => {
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
        // console.log('response values are ---####------------ ', response);
        // Check the response
        expect(response.user.username).toEqual('admin');
        expect(response.user.password).toEqual('admin');
        // set value in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(response));
        sessionStorage.setItem('token', JSON.stringify(response.token));
        sessionStorage.setItem('dismissOrders', 'false');
        done();
      },
        (error) => {
          expect(error).toThrowError();
        });
  });

  beforeEach(() => {
    // const userdata = {
    //   'token': '12345',
    //   'user': {
    //     'uuid': '',
    //     'username': 'xxxx', 'firstname': 'xxxx',
    //     'lastname': 'xxxx', 'email': 'xxxx@gmail.com', 'isDisabled': false,
    //     'Authorities': [{
    //       'uuid': '', 'role': 'ROLE_DUMMY', 'allowedScreens': 'Dashboard',
    //     }],
    //     'organization': [{ 'uuid': '', 'organizationname': '' }], 'organizationUuid': ''
    //   }
    // };
    // sessionStorage.setItem('currentUser', JSON.stringify(userdata));
    comp.showSettings = true;
    fixture = TestBed.createComponent(SidenavComponent);
    comp = fixture.componentInstance;
    spyOn(comp, 'ngOnInit');
    spyOn(comp, 'getCurrentUserDetails');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should click the logout button', () => {
    comp.logout();
    expect(comp).toBeTruthy();
  });

  

  it(`should call the logout button`, () => {
    fixture.detectChanges();
    spyOn(comp, 'logout');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(comp.logout).toHaveBeenCalledTimes(0);
  });

  it('should call settings method with true condition', () => {

    comp.showSettings = true;
    comp.Settings();
    spyOn(comp, 'Settings');
    expect(comp.Settings).toHaveBeenCalled;
  });


  it('should call settings method false condition', () => {

    comp.showSettings = false;
    comp.Settings();
    spyOn(comp, 'Settings');
    expect(comp.Settings).toHaveBeenCalled;
  });

});
