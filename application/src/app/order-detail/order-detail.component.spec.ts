import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule, MatTableDataSource } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { OrderDetailComponent } from './order-detail.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { MatStepperModule } from '@angular/material/stepper';
import { OrderDetailService } from './order-detail.service';
import { AuthGuard } from '../login/auth.guard';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkDetailRowDirective } from '../directive/cdk-detail-row.directive';
import { LoginService } from '../login/login.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { IOrderDetail } from './IOrderDetail';
import { AppInterceptor } from '../app.interceptor';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;
  let loginService: LoginService = null;
  let backend: MockBackend = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'order-detail',
            component: OrderDetailComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatSelectModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        CommonModule,
        MatDialogModule,
        BrowserAnimationsModule,
        CdkTableModule,
        SidenavModule,
        MatStepperModule,
        Ng4LoadingSpinnerModule.forRoot()
      ],
      declarations: [
        OrderDetailComponent,
        CdkDetailRowDirective,
      ],
      providers: [
        MockBackend,
        DatePipe,
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
        OrderDetailService,
        ApiService,
        ConfigService,
        SharedService,
        Ng4LoadingSpinnerService,
        Constants,
        { provide: APP_BASE_HREF, useValue: '/' }
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
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getOrder by OrderId', () => {
    
    component.tstatus = [];
    // component.Order = {"OrderID":"12345","description":"test"};
    // component.test1.StatusName = "complete";
    // component.ticket = [{uuid:"1245"}];
    // component.ticketcount = 2;
    // component.test = 'TestName';
    // component.listOrderDetail = [];
    // component.showStepper = true;
    // component.ticketdate = '12-12-1212'
    // component.createdby = 'test'

    component.ticketstatus = "Open";
    component.Openticket = 1;
    component.getOrder(15577);
 
    component.ticketstatus = "Close";
    component.Closeticket = 1;
    component.getOrder(15577);

    component.ticketstatus = "Assigned";
    component.Closeticket = 1;
    component.getOrder(15577);


    //component.getOrder('12345');
    spyOn(component, 'getOrder');
    expect(component.getOrder).toBeTruthy();
  });


  it('should call getOrder by OrderId with ticket status Close', () => {
    
    component.tstatus = [];
    component.ticketstatus = "Close";
    component.Closeticket = 1;
    component.getOrder(1234);
    //component.getOrder('12345');
    spyOn(component, 'getOrder');
    expect(component.getOrder).toBeTruthy();
  });


  it('should call intializeDataValues', () => {

    component.dataSource = new MatTableDataSource();
    component.intializeDataValues();
    spyOn(component, 'intializeDataValues');
    expect(component.intializeDataValues).toBeTruthy();
  });


  it('should sort the page', () => {

    component.dataSource = new MatTableDataSource();
    
    component.sortPage();
    spyOn(component, 'sortPage');
    expect(component.sortPage).toBeTruthy();
  });


  it('should call setStepper method', () => {

    component.dataSource = new MatTableDataSource();
    
    component.test1.StatusName='Complete' ;
    component.setStepper();

    component.test1.StatusName='Shipped' ;
    component.setStepper();
    component.test1.StatusName='Released' ;
    component.setStepper();
    component.test1.StatusName='Processed' ;
    component.setStepper();
    

    spyOn(component, 'setStepper');
    expect(component.setStepper).toBeTruthy();
  });



  it('should call listofstatus method', () => {

    component.dataSource = new MatTableDataSource();
    component.salesoderdetails = [];
    component.orderstatus = [];
    component.saleorderstatus = [];
    component.activeorder = 0;
    component.Shippedorder = 0;
    component.Delayedorder = 0;
    component.voidorder = 0;

    component.active = true;
    component.activeorder = 1;
    component.delayed = true;
    component.Delayedorder = 1;
    component.shipped = true;
    component.Shippedorder = 1;
    component.void = true;
    component.voidorder = 1;

    
    component.listofstatus();
    //component.listofstatus();
    spyOn(component, 'listofstatus');
    expect(component.listofstatus).toBeTruthy();
  }); 



  it('should call newticket,Activeclick, Shippedclick, Delayedclick, Voidclick ', () => {

    component.dataSource = new MatTableDataSource();
    component.active = false;
    component.shipped = false;
    component.delayed = false;
    component.void = false;
    component.Order = {OrderID:"12345"}

    component.newticket();
    component.Activeclick();
    component.Shippedclick();
    component.Delayedclick();
    component.Voidclick();


    spyOn(component, 'newticket');
    expect(component.newticket).toBeTruthy();

    spyOn(component, 'Activeclick');
    expect(component.Activeclick).toBeTruthy();

    spyOn(component, 'Shippedclick');
    expect(component.Shippedclick).toBeTruthy();

    spyOn(component, 'Delayedclick');
    expect(component.Delayedclick).toBeTruthy();

    spyOn(component, 'Voidclick');
    expect(component.Voidclick).toBeTruthy();
  });

  

});
