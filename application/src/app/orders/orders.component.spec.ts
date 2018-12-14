import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatFormFieldControl, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersComponent } from './orders.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { OrderService } from './orders.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthGuard } from '../login/auth.guard';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material';
import { DatePipe } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { DebugElement } from '@angular/core';
import { inject } from '@angular/core/testing';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { AppInterceptor } from '../app.interceptor';
import { LoginService } from '../login/login.service';
import { OrderDataSource } from './orderDataSource';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { FormControl } from '@angular/forms';

describe('OrdersComponent', () => {
  let comp: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  // let el: HTMLElement;
  // let dataSource : OrderDataSource;
  let searchEl: DebugElement;
  let loadingEl: DebugElement;
  let backend: MockBackend = null;
  let orderservice: OrderService = null;
  let closeEl: DebugElement;
  let dismissEl: DebugElement;
  let dataSourceSpy = jasmine.createSpyObj('OrderDataSource', ['loadDatas']);
  let dataSource = OrderDataSource;
  let loginService: LoginService = null;

  TestBed.overrideComponent(OrdersComponent, {
    set: {
      providers: [
        {
          provide: OrderService,
          useValue: orderservice,
        },
        // {
        //   provide: LoginService,
        //   useValue: loginService
        // },
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
        RouterModule.forRoot([
          {
            path: 'orders',
            component: OrdersComponent,
            canActivate: [AuthGuard]
          }
        ]),
        BrowserModule,
        HttpClientModule,
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
        SidenavModule,
        MDBBootstrapModule.forRoot(),
        ReactiveFormsModule,
        Ng4LoadingSpinnerModule,
        Ng2Bs3ModalModule,
        MatTooltipModule,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      declarations: [
        OrdersComponent,
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
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true
        },
        OrderService,
        ApiService,
        ConfigService,
        SharedService,
        Constants,
        LoginService,
        DatePipe,
        AlertDialogComponent,
        OrderDataSource,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(OrdersComponent);
        comp = fixture.componentInstance;
        searchEl = fixture.debugElement.query(By.css('.search'));
        loadingEl = fixture.debugElement.query(By.css('.loading'));
      });
  }));

  // tslint:disable-next-line:max-line-length
  beforeEach(inject([LoginService, OrderService, MockBackend], (Service: LoginService, Service2: OrderService, mockBackend: MockBackend) => {
    orderservice = Service2;
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
      console.log('inside 2222');
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
        //response.user.organization.PolypmCustomerCode="NEWCO1"
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
    fixture = TestBed.createComponent(OrdersComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });


  it('should create', () => {
    expect(comp).toBeTruthy();
  });


  it('should call nginit', () => {

    comp.companycode = "NEWCO1"
    comp.ngOnInit();
    spyOn(comp, 'ngOnInit');
    expect(comp.ngOnInit).toBeTruthy();
  });


  it('should call loadDataPage method with complete status', () => {

    comp.StatusName = 'completed';
    comp.dataSource = new OrderDataSource(orderservice);
    comp.loadDataPage();
    spyOn(comp, 'loadDataPage');
    expect(comp.loadDataPage).toBeTruthy();
  });

  it('should call loadDataPage method with no status', () => {

    comp.StatusName = '';
    comp.companycode = "STAHLS";
    comp.dataSource = new OrderDataSource(orderservice);
    comp.pageNo = 1;
    comp.loadDataPage();
    spyOn(comp, 'loadDataPage');
    expect(comp.loadDataPage).toBeTruthy();
  });


  it('should call loadDataPage method with no status as other user', () => {

    comp.StatusName = '';
    comp.companycode = "NEWCO1";
    comp.dataSource = new OrderDataSource(orderservice);
    comp.pageNo = 1;
    comp.loadDataPage();
    spyOn(comp, 'loadDataPage');
    expect(comp.loadDataPage).toBeTruthy();
  });


  it('should call ngAfterViewInit', () => {

    comp.paginator.pageIndex = 0;
    //comp.dataSource = new OrderDataSource(orderservice);
    comp.ngAfterViewInit();
    spyOn(comp, 'ngAfterViewInit');
    expect(comp.ngAfterViewInit).toBeTruthy();
  });



  it('should call getFilterValueData', () => {

    comp.filterValue = {data:'test'};
    comp.getFilterValueData('test');
    spyOn(comp, 'getFilterValueData');
    expect(comp.getFilterValueData).toBeTruthy();
  });


  it('should call getStatusNameCountByCode', () => {

    comp.companycode = 'NEWCO1';
    comp.notificationDetails= [{StatusName:"Complete"},{StatusName:"Incomplete"},{StatusName:"Processed"},
    {StatusName:"Shipped"},{StatusName:"Void"},{StatusName:"Released"}, {StatusName:"Hold"}, {StatusName:"Committed"},
    {StatusName:"Forecast"}, {StatusName:"Quote"},{StatusName:"Available"}]
    comp.Complete = true;
    comp.InComplete = true;
    comp.Shipped = true;
    comp.Processed = true;
    comp.Void = true;
    comp.Hold = true;
    comp.Committed = true;
    comp.Released = true;
    comp.Forecast = true;
    comp.Quote = true;
    comp.Available = true;
    comp.getStatusNameCountByCode();
    spyOn(comp, 'getStatusNameCountByCode');
    expect(comp.getStatusNameCountByCode).toBeTruthy();
  });


  it('should call getFilterValueDataByCompanyCode', () => {

    comp.filterValue = {data:'test'};
    comp.companycode = "NEWCO1"
    comp.getFilterValueDataByCompanyCode('test');
    spyOn(comp, 'getFilterValueDataByCompanyCode');
    expect(comp.getFilterValueDataByCompanyCode).toBeTruthy();
  });

  it('should call Dismiss method', () => {

    comp.Complete = false;
    comp.InComplete = false;
    comp.Shipped = false;
    comp.Processed = false;
    comp.Void = false;
    comp.Hold = false;
    comp.Committed = false;
    comp.Released = false;
    comp.Forecast = false;
    comp.Quote = false;
    comp.Available = false;
    comp.StatusName = '';
    comp.paginator.pageIndex = 0;
    comp.dataSource = new OrderDataSource(orderservice);

    comp.Dismiss();
    spyOn(comp, 'Dismiss');
    expect(comp.Dismiss).toBeTruthy();
  });


  it('should close status on Click close', () => {
    
    comp.Complete = false;
    comp.InComplete = false;
    comp.Shipped = false;
    comp.Processed = false;
    comp.Void = false;
    comp.Hold = false;
    comp.Committed = false;
    comp.Released = false;
    comp.Forecast = false;
    comp.Quote = false;
    comp.Available = false;
    comp.dataSource = new OrderDataSource(orderservice);
    comp.closeClick('Complete');
    comp.closeClick('Incomplete');
    comp.closeClick('Shipped');
    comp.closeClick('Processed');
    comp.closeClick('Void');
    comp.closeClick('Hold');
    comp.closeClick('Committed');
    comp.closeClick('Released');
    comp.closeClick('Forecast');
    comp.closeClick('Quote');
    comp.closeClick('Available');

    spyOn(comp, 'closeClick');
    expect(comp.closeClick).toBeTruthy();
  });



  it('should call exportCSV', () => {

    comp.dateRange.startdate = '';
    comp.dateRange.enddate = '';
   // comp.ExportcsvModal =new ModalComponent();
   comp.ExportcsvModal.open();
    comp.exportCSV();
    spyOn(comp, 'exportCSV');
    expect(comp.exportCSV).toBeTruthy();
  });  


  it('should call exportDetails', () => {
    comp.dateRange.startdate = '1900-05-01T02:30:56';
    comp.dateRange.enddate = '1900-05-01T02:30:56';
    comp.companycode = 'STAHLS'
    comp.exportDetails();

    comp.companycode = 'NEWCO1'
    comp.exportDetails();
    spyOn(comp, 'exportDetails');
    expect(comp.exportDetails).toBeTruthy();
  });  


  it('should call locationFilter', () => {

    comp.filterLocation = new FormControl();
    comp.filterTicket = new FormControl();
    comp.filterStatus = new FormControl();
    comp.filterStyleOption = new FormControl();
    comp.locationSelectedValue = ["test"];
    comp.paginator.pageIndex = 0;
    comp.dataSource = new OrderDataSource(orderservice);
    comp.companycode = 'STAHLS'
    comp.locationFilter();
    comp.companycode = 'NEWCO1'
    comp.locationFilter();
    spyOn(comp, 'locationFilter');
    expect(comp.locationFilter).toBeTruthy();
  });  


  it('should call ticketFilter', () => {

    comp.filterLocation = new FormControl();
    comp.filterTicket = new FormControl();
    comp.filterStatus = new FormControl();
    comp.filterStyleOption = new FormControl();

    comp.ticketSelectedValue = ["test"];
    comp.paginator.pageIndex = 0;
    comp.dataSource = new OrderDataSource(orderservice);
    comp.companycode = 'STAHLS'
    comp.ticketFilter();
    comp.companycode = 'NEWCO1'
    comp.ticketFilter();
    spyOn(comp, 'ticketFilter');
    expect(comp.ticketFilter).toBeTruthy();
  });  


  it('should call statusFilter', () => {

    comp.filterLocation = new FormControl();
    comp.filterTicket = new FormControl();
    comp.filterStatus = new FormControl();
    comp.filterStyleOption = new FormControl();
    comp.statusSelectedValue = ["test"];
    comp.paginator.pageIndex = 0;
    comp.dataSource = new OrderDataSource(orderservice);
    comp.companycode = 'STAHLS'
    comp.statusFilter();
    comp.companycode = 'NEWCO1'
    comp.statusFilter();
    spyOn(comp, 'statusFilter');
    expect(comp.statusFilter).toBeTruthy();
  });  


  it('should call styleOptionFilter', () => {

    comp.filterLocation = new FormControl();
    comp.filterTicket = new FormControl();
    comp.filterStatus = new FormControl();
    comp.filterStyleOption = new FormControl();
    comp.styleOptionSelectedValue = ["test"];
    comp.paginator.pageIndex = 0;
    comp.dataSource = new OrderDataSource(orderservice);
    comp.companycode = 'STAHLS'
    comp.styleOptionFilter();
    comp.companycode = 'NEWCO1'
    comp.styleOptionFilter();
    spyOn(comp, 'styleOptionFilter');
    expect(comp.styleOptionFilter).toBeTruthy();
  });  


});
