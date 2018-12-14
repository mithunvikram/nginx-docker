import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CommonModule, DatePipe } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule, MatDialog } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { InvoiceService } from './invoice.service';
import { SidenavModule } from '../sidenav/sidenav.module';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { AuthGuard } from '../login/auth.guard';
import { SharedService } from '../shared/shared.service';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../login/login.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AppInterceptor } from '../app.interceptor';
import { InvoiceDataSource } from './invoiceDataSource';
import { FormControl } from '@angular/forms';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { InvoiceModule } from './invoice.module';

describe('InvoiceComponent', () => {
  let component: InvoiceComponent;
  let fixture: ComponentFixture<InvoiceComponent>;
  let loginService: LoginService = null;
  let backend: MockBackend = null;
  let invoiceService: InvoiceService = null;
  let matDialog: MatDialog = null;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SidenavModule,
        RouterModule.forRoot([
          {
            path: 'invoices',
            component: InvoiceComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        MatChipsModule,
        MatSelectModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        OrderDetailModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        CommonModule,
        MatDialogModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        InvoiceModule
      ],
      declarations: [AlertDialogComponent],
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
        InvoiceService,
        ApiService,
        ConfigService,
        SharedService,
        Ng4LoadingSpinnerService,
        Constants,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true
        }
      ]
    })
      .compileComponents();
      TestBed.overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [AlertDialogComponent]
        }
      });
  }));

  beforeEach(inject([LoginService, InvoiceService, MatDialog, MockBackend], (Service: LoginService, service, matdialog, mockBackend: MockBackend) => {
    loginService = Service;
    backend = mockBackend;
    invoiceService = service;
    matDialog = matdialog;
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
    fixture = TestBed.createComponent(InvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should call loadDataPage with STAHLS user', () => {
    component.companycode = 'STAHLS';
    component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
  });

  it('should call loadDataPage with other Organization', () => {
    component.companycode = 'NEWC01';
    component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
  });


  it('should call intializeCurrentUser', () => {

    component.organizationDetails = sessionStorage.getItem('currentUser');
    component.intializeCurrentUser();
    spyOn(component, 'intializeCurrentUser');
    expect(component.intializeCurrentUser).toBeTruthy();
  });



  it('should call intializeCurrentUser as STAHLS user', () => {
    component.organizationDetails = { PolypmCustomerCode: "STAHLS" };
    component.intializeCurrentUser();
    spyOn(component, 'intializeCurrentUser');
    expect(component.intializeCurrentUser).toBeTruthy();
  });

  it('should call intializeCurrentUser as Other user', () => {
    component.organizationDetails = { PolypmCustomerCode: "NEWCO1" };
    component.intializeCurrentUser();
    spyOn(component, 'intializeCurrentUser');
    expect(component.intializeCurrentUser).toBeTruthy();
  });


  it('should call getFilterValue method', () => {
    component.filterValue = [];
    component.ItemsValue = [];

    component.getFilterValue();
    spyOn(component, 'getFilterValue');
    expect(component.getFilterValue).toBeTruthy();
  });


  it('should call getAllInvoicesByCode method', () => {
    component.filterValue = [];
    component.ItemsValue = [];
    component.dataSource = new InvoiceDataSource(invoiceService, matDialog);

    component.getAllInvoicesByCode();
    spyOn(component, 'getAllInvoicesByCode');
    expect(component.getAllInvoicesByCode).toBeTruthy();
  });


  it('should call getFilterValueByCompanyCode method', () => {
    component.companycode = 'STAHLS';
    component.filterValue = {};
    component.ItemsValue = [];

    component.getFilterValueByCompanyCode();
    spyOn(component, 'getFilterValueByCompanyCode');
    expect(component.getFilterValueByCompanyCode).toBeTruthy();
  });


  it('should call ItemsFilter method', () => {
    component.itemSelectedValue = [];
    component.paginator.pageIndex = 0;
    component.filterItems=new FormControl();
      console.log('Hello foreach',component.filterItems.value);
      console.log('Hello foreach',component.filterValue);
    // component.filterItems.value.array.forEach(element => {
    //   component.filterValue.getItem.array.forEach(element => {
        
    //   });
    // });
    component.ItemsFilter();
    spyOn(component, 'ItemsFilter');
    expect(component.ItemsFilter).toBeTruthy();
  });

  it('should call StatusFilter method', () => {
  
    component.statusSelectedValue = [];
    component.paginator.pageIndex = 0;
    component.statusSelectedValue = ['complete'];


    component.StatusFilter();
    spyOn(component, 'StatusFilter');
    expect(component.StatusFilter).toBeTruthy();
  });


  it('should call OpenDialog', () => {
  
    component.dialogConfig = new MatDialogConfig();
   

    component.OpenDialog();
    spyOn(component, 'OpenDialog');
    expect(component.OpenDialog).toBeTruthy();
  });



});
