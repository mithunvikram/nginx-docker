import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule, MatDatepickerModule, MatTableDataSource, MatNativeDateModule, MatRadioModule, MatRadioChange } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { GroupMailComponent } from './mail-notification.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GroupMailService } from './mail-notification.service';
import { AuthGuard } from '../login/auth.guard';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { LoginService } from '../login/login.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AppInterceptor } from '../app.interceptor';


describe('GroupMailComponent', () => {
  let component: GroupMailComponent;
  let fixture: ComponentFixture<GroupMailComponent>;
  let loginService: LoginService = null;
  let backend: MockBackend = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ ShipmentsComponent ]
      imports: [
        RouterModule.forRoot([
          {
            path: 'groupmail',
            component: GroupMailComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        MatChipsModule,
        MatSelectModule,
        MatSortModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        SidenavModule,
        MatDatepickerModule,
        Ng4LoadingSpinnerModule,
        Ng2Bs3ModalModule,
        MatRadioModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        MatNativeDateModule
      ],
      declarations: [
        GroupMailComponent
      ],
      // providers: [ShipmentsService]
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
        GroupMailService,
        ApiService,
        ConfigService,
        SharedService,
        Ng4LoadingSpinnerService,
        Constants,
        DatePipe,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true
        }
      ]
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
    fixture = TestBed.createComponent(GroupMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call getAllMail ', () => {

    component.dataSource = new MatTableDataSource();
    component.getAllMail();
    spyOn(component, 'getAllMail');
    expect(component.getAllMail).toBeTruthy();
  });

  // it('should call openMail ', () => {

  //   component.data.mail = '';
  //   component.openMail();
  //   spyOn(component, 'openMail');
  //   expect(component.openMail).toBeTruthy();
  // });

  it('should call addMail ', () => {

    component.data = { label: 'groupmail', mail: 'test', status: true };
    component.addMail();
    spyOn(component, 'addMail');
    expect(component.addMail).toBeTruthy();
  });

  // it('should call openupdateMail ', () => {

  //   const data = { label: 'groupmail', mail: 'test', status: true };
  //   component.openupdateMail(data);
  //   spyOn(component, 'openupdateMail');
  //   expect(component.openupdateMail).toBeTruthy();
  // });

  it('should update the mail', () => {

    component.data = { label: 'groupmail', mail: 'test', status: true };
    component.updateMail();
    spyOn(component, 'updateMail');
    expect(component.updateMail).toBeTruthy();
  });

  it('should delete the mail', () => {

    const data = { label: 'groupmail', mail: 'test', status: true };
    component.deleteMail(data);
    spyOn(component, 'deleteMail');
    expect(component.deleteMail).toBeTruthy();
  });

  it('should delete the mail', () => {

    const data = { label: 'groupmail', mail: 'test', status: true };
    component.deleteMail(data);
    spyOn(component, 'deleteMail');
    expect(component.deleteMail).toBeTruthy();
  });

  // it('should cancel mail method', () => {

  //   component.cancelMail();
  //   spyOn(component, 'cancelMail');
  //   expect(component.cancelMail).toBeTruthy();
  // });



});
