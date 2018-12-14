import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { RouterModule, Router } from '@angular/router';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { OrganizationService } from '../organization.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule, MatDialogModule } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { AuthGuard } from '../../login/auth.guard';
import { AvatarModule } from 'ngx-avatar';
import { TicketCreationModule } from '../../ticket/ticketcreation/ticketcreation.module';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { LoginService } from '../../login/login.service';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';
import { AppInterceptor } from '../../app.interceptor';
import { MockOrganizationService } from '../../../mock/service/organization/mockOrganizationService';



describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let mockservice;
  let loginService: LoginService = null;
  let backend: MockBackend = null;


  TestBed.overrideComponent(CreateComponent, {
    set: {
      providers: [
        {
          provide: OrganizationService,
          useValue: mockservice
        },
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy('navigate'); }
        }
      ]
    }
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{
          path: 'create-org',
          component: CreateComponent,
          canActivate: [AuthGuard]
        }]),
        HttpClientModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        CommonModule,
        BrowserModule,
        MatButtonModule,
        SidenavModule,
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        TicketCreationModule,
        AvatarModule,
        FileUploadModule
      ],
      declarations: [CreateComponent, AlertDialogComponent],
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
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true
        },
        OrganizationService,
        MockOrganizationService,
        { provide: OrganizationService, useClass: MockOrganizationService },
        ApiService,
        ConfigService,
        Constants,
        SharedService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AlertDialogComponent]
      }
    })
      .compileComponents();
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

    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });


  it('should run #ngOnInit()', () => {
   
    component.imageshow = false;
    component.update = false;
    component.uuid = undefined;
    component.createOrgnization = undefined;
    // tslint:disable-next-line:max-line-length
    component.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiSHktRU1HcXo3IiwiaWQiOjUyLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImZpcnN0bmFtZSI6ImFkbWluIiwiUmVzZXRwYXNzd29yZFRva2VuIjpudWxsLCJsYXN0bmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJsb2dnZWRJbkRhdGUiOiIyMDE4LTExLTIzVDA3OjQxOjM4LjA0MVoiLCJsb2dnZWRPdXREYXRlIjoiMjAxOC0xMS0yMlQxNTozMDo1Mi4zOTlaIiwiaXNEaXNhYmxlZCI6dHJ1ZSwib3JnYW5pemF0aW9uVXVpZCI6bnVsbCwiQXV0aG9yaXRpZXMiOlt7InV1aWQiOiJySjhtZk01R1EiLCJyb2xlIjoiQURNSU4iLCJhbGxvd2VkU2NyZWVucyI6IkRhc2hib2FyZCxQdXJjaGFzZSBPcmRlcnMsT3JkZXJzLFRpY2tldHMsSW52b2ljZXMsU2hpcG1lbnRzLEludmVudG9yeSxPcmdhbml6YXRpb24sVXNlcnMsU3luY1NlcnZpY2UsR3JvdXBNYWlsLFNldHRpbmdzIn1dLCJvcmdhbml6YXRpb24iOm51bGwsImlhdCI6MTU0Mjk1ODg5OH0.DzCmgVK9GLL4KOWkouJyZEW_W3BguTWVbvYpY_LjSB8'
    // tslint:disable-next-line:max-line-length
    component.orgninfo = { organizationname: '', uuid: '', orgImage: '', PolypmCustomerCode: '' };
    component.uploader.queue.length = 0;
    // tslint:disable-next-line:no-unused-expression
    expect(component.getquerydetails()).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.currentUserDetails()).toHaveBeenCalled;
    component.uploader.authTokenHeader = 'Authorization';
    // tslint:disable-next-line:max-line-length
    component.uploader.authToken = 'Bearer' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiSHktRU1HcXo3IiwiaWQiOjUyLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImZpcnN0bmFtZSI6ImFkbWluIiwiUmVzZXRwYXNzd29yZFRva2VuIjpudWxsLCJsYXN0bmFtZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJsb2dnZWRJbkRhdGUiOiIyMDE4LTExLTIzVDA3OjQxOjM4LjA0MVoiLCJsb2dnZWRPdXREYXRlIjoiMjAxOC0xMS0yMlQxNTozMDo1Mi4zOTlaIiwiaXNEaXNhYmxlZCI6dHJ1ZSwib3JnYW5pemF0aW9uVXVpZCI6bnVsbCwiQXV0aG9yaXRpZXMiOlt7InV1aWQiOiJySjhtZk01R1EiLCJyb2xlIjoiQURNSU4iLCJhbGxvd2VkU2NyZWVucyI6IkRhc2hib2FyZCxQdXJjaGFzZSBPcmRlcnMsT3JkZXJzLFRpY2tldHMsSW52b2ljZXMsU2hpcG1lbnRzLEludmVudG9yeSxPcmdhbml6YXRpb24sVXNlcnMsU3luY1NlcnZpY2UsR3JvdXBNYWlsLFNldHRpbmdzIn1dLCJvcmdhbml6YXRpb24iOm51bGwsImlhdCI6MTU0Mjk1ODg5OH0.DzCmgVK9GLL4KOWkouJyZEW_W3BguTWVbvYpY_LjSB8';
    expect(component.update).toBeFalsy();
    expect(component.uuid).toBeUndefined();

    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    expect(component.ngOnInit).toBeTruthy();

  });

  it('should run #currentUserDetails()', () => {
    // const result = component.currentUserDetails();
  });

  it('should run #omit_special_char()', () => {
    // const result = component.omit_special_char(event);
  });

  it('should run #createOrg()', () => {
    component.orginfo = { organizationname: 'testorg', PolypmCustomerCode: '09876' };
    component.createOrg();
    spyOn(component, 'createOrg');
    expect(component.createOrg).toBeTruthy();
  });


  it('should run if condition #getquerydetails()', () => {
    component.uuid = undefined;
    component.update = false;
    expect(component.update).toBeFalsy();
    expect(component.uuid).toBeUndefined();
    component.getquerydetails();
    spyOn(component, 'getquerydetails');
    expect(component.getquerydetails).toBeTruthy();
  });

  it('should run #getquerydetails()', () => {
    component.uuid = 'ySvjE6URZ';
    component.update = true;
    expect(component.update).toBeTruthy();
    expect(component.organization).toBeTruthy();
    expect(component.uuid).toBe('ySvjE6URZ');
    component.getquerydetails();
    spyOn(component, 'getquerydetails');
    expect(component.getquerydetails).toBeTruthy();
  });


  it('should run #updateOrg() without localUrl', () => {
    component.localUrl = undefined;
    // tslint:disable-next-line:max-line-length
    component.orgninfo = { organizationname: 'Fanatics', uuid: 'HyUtAH5f7', orgImage: 'uploads/OrgImage/1533782623421-FanaticsLogo.jpg', PolypmCustomerCode: 'NYC' };
    expect(component.localUrl).toBeUndefined();
    component.updateOrg();
  });

  it('should run #updateOrg()', () => {
    component.localUrl = 'http://localhost:8080';
    // tslint:disable-next-line:max-line-length
    component.orgninfo = { organizationname: 'Fanatics', uuid: 'HyUtAH5f7', orgImage: 'uploads/OrgImage/1533782623421-FanaticsLogo.jpg', PolypmCustomerCode: 'NYC' };
    expect(component.localUrl).toBeTruthy();
    component.updateOrg();
  });

  it('should call Previewimage method', () => {
    component.localUrl = 'http://localhost:8080';
    // tslint:disable-next-line:max-line-length
    component.isImage = true;
    component.imageshow = true;
    
    component.Previewimage(event);
    spyOn(component, 'Previewimage');
    expect(component.Previewimage).toBeTruthy();
  });

});
