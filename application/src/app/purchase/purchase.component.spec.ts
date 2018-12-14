import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { PurchaseComponent } from './purchase.component';
import { PurchaseOrderService } from './purchaseorder.service';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../sidenav/sidenav.module';
import {
  MatFormFieldModule, MatInputModule, MatSelectModule,
  MatTableModule, MatPaginatorModule, MatSortModule, MatCardModule, MatTableDataSource, MatDialogConfig
} from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { AuthGuard } from '../login/auth.guard';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppInterceptor } from '../app.interceptor';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { LoginService } from '../login/login.service';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { PurchaseModule } from './purchase.module';


describe('PurchaseComponent', () => {
  let component: PurchaseComponent;
  let fixture: ComponentFixture<PurchaseComponent>;
  // let purchaseOrderService: PurchaseOrderService = null;
  // let loginService: LoginService = null;
  // let backend: MockBackend = null;
  let loginService: LoginService = null;
  let backend: MockBackend = null;
  let purchaseService: PurchaseOrderService = null;
  let purchaseOrderServiceSpy = jasmine.createSpyObj('PurchaseOrderService', ['getAllPurchaseOrdes']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{
          path: 'purchase',
          component: PurchaseComponent,
          canActivate: [AuthGuard]
        }]),
        HttpClientModule,
        CommonModule,
        MatPaginatorModule,
        SidenavModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        MatCardModule,
        MatDialogModule,
        BrowserAnimationsModule,
        PurchaseModule
      ],
      declarations: [
        AlertDialogComponent
      ],
      // providers: [PurchaseOrderService]
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
        { provide: PurchaseOrderService, useValue: purchaseOrderServiceSpy },
        PurchaseOrderService,
        ApiService,
        ConfigService,
        SharedService,
        Ng4LoadingSpinnerService,
        Constants,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AlertDialogComponent]
      }
    });
  }));

 

  beforeEach(inject([LoginService, PurchaseOrderService, MockBackend],
    (Service: LoginService, Service2: PurchaseOrderService, mockBackend: MockBackend) => {
      loginService = Service;
      purchaseService = Service2;
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
    fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;
    component.selectedValue = new FormControl();

    fixture.detectChanges();
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(PurchaseComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

 
  it('intializeCurrentUser method should called and checking the getallPurchaseOrder method', () => {

    component.purchaseDetails = [];
    const organizationDetails = JSON.parse(sessionStorage.getItem('currentUser')).user.organization;
    console.log('organization details are ---------- ', organizationDetails);
    if (expect(organizationDetails).toBeNull()) {
      console.log('iiiifffffffffffffffffffffffffff');
      if (expect(organizationDetails.PolypmCustomerCode).not.toBeNull ||
        expect(organizationDetails.PolypmCustomerCode).not.toEqual('STAHLS')) {
        spyOn(component, 'getAllPurchaseOrderByOrg');
        expect(component.getAllPurchaseOrderByOrg).not.toHaveBeenCalledWith(organizationDetails.PolypmCustomerCode);
      } else {
        spyOn(component, 'getallPurchaseOrder').and.callThrough();
        // tslint:disable-next-line:no-unused-expression
        expect(component.getallPurchaseOrder).not.toHaveBeenCalled;
      }
    } else {
      console.log('final eslsssssssssssssss');
      spyOn(component, 'getallPurchaseOrder').and.callThrough();
      // tslint:disable-next-line:no-unused-expression
      expect(component.getallPurchaseOrder).toHaveBeenCalled;
    }
  });



  it('getallPurchaseOrder should called and checking the mockService and method', (done) => {
    spyOn(component, 'getallPurchaseOrder');
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify({ success: true })
      });
      connection.mockRespond(new Response(options));
      // check the request method
      expect(connection.request.method).toEqual(RequestMethod.Get);
      // Check the url
      expect(connection.request.url).toEqual('/api/PurchaseOrders/getall');
      // Check the body
      console.log('mock backend text values are ----------- ', connection.request.text);
      // expect(connection.request.text)
      // Check the request headers
      expect(connection.request.headers.get('content-Type')).toEqual('application/json');
    });
    purchaseService.getAllPurchaseOrdes().subscribe(
      (response) => {
        // console.log('response values are ---####------------ ', response);
        // Check the response
        expect(response).not.toBeNull();
        component.purchaseDetails = response;
        if (Object.keys(response).length === 0) {
          component.purchaseDetails = [];
          expect(component.purchaseDetails).toEqual([]);
        }
        if (response.length === 0 || !response) {
          spyOn(component, 'OpenDialog');
          // tslint:disable-next-line:no-unused-expression
          expect(component.OpenDialog).toHaveBeenCalled;
          // this.OpenDialog();
        }
        component.dataSource = new MatTableDataSource(this.purchaseDetails);
        done();
      },
      (error) => {
        expect(error).toThrowError();
      });
  });


  it('calling #applyFilter method and checking variables', () => {
    // component.getallPurchaseOrder();
    component.dataSource = new MatTableDataSource();
    component.applyFilter('testvalue');
    let filterValue: string;
    filterValue = 'testvalue';
    console.log('filter valuez in appyfilter in purhcase are -------- ', filterValue);
    fixture.detectChanges();
    expect(filterValue).toEqual(filterValue.trim());
    expect(filterValue).toEqual(filterValue.toLowerCase());
    component.searchedValue = filterValue;
    expect(component.searchedValue).toEqual(filterValue);
    if (expect(component.dataSource).not.toBe(null)) {
      component.dataSource.filter = filterValue;
      expect(component.dataSource.filter).toEqual(filterValue);
    }

  });

  it('should call LocationFilterValue method', () => {
    component.locationfilter = ['test'];
    const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    // tslint:disable-next-line:no-unused-expression
    spyOn(component, 'Locationfiltervalue').and.callThrough;
    trigger.click();
    fixture.detectChanges();
    component.Locationfiltervalue();
    // tslint:disable-next-line:no-unused-expression
    expect(component.Locationfiltervalue).toHaveBeenCalled;
    const control = new FormControl('location');
    console.log('control and selected value in locationa are --- ', control, component.selectedValue);
    component.selectfilter = new FormControl('location');
    console.log('@@@@@@@@@@@@@ ', component.selectfilter.value);
    component.locationfilter = component.selectfilter.value;
    console.log('!!!!!!!!!!!!!!!!!  ', component.locationfilter);
    expect(component.locationfilter).toEqual('location');
    spyOn(component, 'filter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.filter).toHaveBeenCalled;

  });

 
  it('should call #getAllPurchaseOrderByOrg method', () => {
    component.getAllPurchaseOrderByOrg('NEWC01');
    spyOn(component, 'sortPage');
    // tslint:disable-next-line:no-unused-expression
    expect(component.sortPage).toHaveBeenCalled;
    spyOn(component, 'filterOptions');
    // tslint:disable-next-line:no-unused-expression
    expect(component.filterOptions).toHaveBeenCalled;
  });
  it('should call #OpenDialog method ', () => {
    component.OpenDialog();
    const dialogConfig = new MatDialogConfig();
    // this.spinnerservice.hide();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    expect(dialogConfig.disableClose).toBeTruthy();
    expect(dialogConfig.autoFocus).toBeTruthy();

  });


  it('should call #filterOptionChange method', () => {
    component.filterOptionChange();
  });
  it('should call #noDataDialog method ', () => {
    component.noDataDialog();
  });


  


  it('checking the initial value and method', () => {
    
    component.organizationDetails = {user:{organization:{"PolypmCustomerCode":"STAHLS"}}}
    component.intializeCurrentUser();

    component.organizationDetails = {user:{organization:{"PolypmCustomerCode":"NEWCO1"}}}
    component.intializeCurrentUser();


    spyOn(component, 'intializeCurrentUser');
    expect(component.intializeCurrentUser).toBeTruthy();
  });



  it('should call intializeDataValues method to initial value', () => {
    
    component.purchaseDetails = [{
      uuid: "123456",
      loc: "DFC",
      customer: "NEW",
      date: "string",
      order_status: "Complete",
      tickets: 1,
      forcastedArrival: "string",
      arrivalDate: "string",
      SalesOrder: {"CustomerCode":"NEWC01"},
      StatusName: "complete",
      CompanyCode: "NEWC01",
   }];
    component.dataSource = new MatTableDataSource();
    component.intializeDataValues();
    spyOn(component, 'intializeDataValues');
    expect(component.intializeDataValues).toBeTruthy();
  });
  
  it('should call locationfiltervalue and Customerfiltervalue methods', () => {
    
    component.locationfilter = [];
    component.customerfilter = [];
    component.statusfilter = [];

    component.dataSource = new MatTableDataSource();
    
    component.purchaseDetails = [{
      uuid: "123456",
      loc: "DFC",
      customer: "NEW",
      date: "string",
      order_status: "Complete",
      tickets: 1,
      forcastedArrival: "string",
      arrivalDate: "string",
      SalesOrder: {"CustomerCode":"NEWC01"},
      StatusName: "complete",
      CompanyCode: "NEWC01",
   }];
      
    // component.Customerfiltervalue();
    // spyOn(component, 'Customerfiltervalue');
    // expect(component.Customerfiltervalue).toBeTruthy();

    // component.Statusfiltervalue();
    // spyOn(component, 'Statusfiltervalue');
    // expect(component.Statusfiltervalue).toBeTruthy();
  });


  it('on row clicked in table', () => {
    
   
    var row = {VendorReceives:[{ReceiveID:1234}]}
    component.onRowSelected(row);

    var row2 = {VendorReceives:[]}
    component.onRowSelected(row2);


    spyOn(component, 'onRowSelected');
    expect(component.onRowSelected).toBeTruthy();
  });


  it('calling filter method with locationfilter', () => {
    
    component.dataSource = new MatTableDataSource();
    
    component.locationfilter = ['test'];
    component.customerfilter = [];
    component.statusfilter = [];
    
    component.filter_purchaseOrderStatus = ['test'];
    component.filter_purchaseOrderCustomer = ['test']
    component.searchedValue="test";
    

    component.purchaseDetails = [{
      uuid: "123456",
      loc: "DFC",
      customer: "NEW",
      date: "string",
      order_status: "Complete",
      tickets: 1,
      forcastedArrival: "string",
      arrivalDate: "string",
      SalesOrder: {"CustomerCode":"NEWC01"},
      StatusName: "complete",
      CompanyCode: "NEWC01",
   }];
    component.filterdata = [];
    component.filterArr= [];

    component.filter();
    spyOn(component, 'filter');
    expect(component.filter).toBeTruthy();
  });

  it('calling filter method with customerfilter', () => {
    
    component.dataSource = new MatTableDataSource();
    
    component.locationfilter = [];
    component.customerfilter = ['test'];
    component.statusfilter = [];

    component.searchedValue="test";
    
    component.purchaseDetails = [{
      uuid: "123456",
      loc: "DFC",
      customer: "NEW",
      date: "string",
      order_status: "Complete",
      tickets: 1,
      forcastedArrival: "string",
      arrivalDate: "string",
      SalesOrder: {"CustomerCode":"NEWC01"},
      StatusName: "complete",
      CompanyCode: "NEWC01",
   }];
    component.filterdata = [];
    component.filterArr= [];

    component.filter();
    spyOn(component, 'filter');
    expect(component.filter).toBeTruthy();
  });
  
  it('calling filter method with statusfilter value', () => {
    
    component.dataSource = new MatTableDataSource();
    
    component.locationfilter = [];
    component.customerfilter = [];
    component.statusfilter = ['test'];

    component.searchedValue="test";
    
    component.purchaseDetails = [{
      uuid: "123456",
      loc: "DFC",
      customer: "NEW",
      date: "string",
      order_status: "Complete",
      tickets: 1,
      forcastedArrival: "string",
      arrivalDate: "string",
      SalesOrder: {"CustomerCode":"NEWC01"},
      StatusName: "complete",
      CompanyCode: "NEWC01",
   }];
    component.filterdata = [];
    component.filterArr= [];

    component.filter();
    spyOn(component, 'filter');
    expect(component.filter).toBeTruthy();
  });

  it('calling filter method with statusfilter and locationfilter value', () => {
    
    component.dataSource = new MatTableDataSource();
    
    component.locationfilter = ['test'];
    component.customerfilter = [];
    component.statusfilter = ['test'];

    component.searchedValue="test";
    
    component.purchaseDetails = [{
      uuid: "123456",
      loc: "DFC",
      customer: "NEW",
      date: "string",
      order_status: "Complete",
      tickets: 1,
      forcastedArrival: "string",
      arrivalDate: "string",
      SalesOrder: {"CustomerCode":"NEWC01"},
      StatusName: "complete",
      CompanyCode: "NEWC01",
   }];
    component.filterdata = [];
    component.filterArr= [];
    component.statusvalue=[];
    component.locationvalue = [];
    component.customervalue = [];
    component.filter();


    spyOn(component, 'filter');
    expect(component.filter).toBeTruthy();
  });
  


  it('calling filter method with all filter values', () => {
    
    component.dataSource = new MatTableDataSource();
    
    component.locationfilter = ['test'];
    component.customerfilter = ['test'];
    component.statusfilter = ['test'];

    component.searchedValue="test";
    
    component.purchaseDetails = [{
      uuid: "123456",
      loc: "DFC",
      customer: "NEW",
      date: "string",
      order_status: "Complete",
      tickets: 1,
      forcastedArrival: "string",
      arrivalDate: "string",
      SalesOrder: {"CustomerCode":"NEWC01"},
      StatusName: "complete",
      CompanyCode: "NEWC01",
   }];
    component.filterdata = [];
    component.filterArr= [];
    component.statusvalue=[];
    component.locationvalue = [];
    component.customervalue = [];
    
    component.filter();
    spyOn(component, 'filter');
    expect(component.filter).toBeTruthy();
  });



});
