import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatRadioModule,MatRadioChange } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { ShipmentsComponent } from './shipments.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShipmentsService } from './shipments.service';
import { ShipmentitemsComponent } from './shipmentitems/shipmentitems.component';
import { PackeditemsComponent } from './packeditems/packeditems.component';
import { AuthGuard } from '../login/auth.guard';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { LoginService } from '../login/login.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';



describe('ShipmentsComponent', () => {
  let component: ShipmentsComponent;
  let fixture: ComponentFixture<ShipmentsComponent>;
  let loginService: LoginService = null;
  let backend: MockBackend = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ ShipmentsComponent ]
      imports: [
        RouterModule.forRoot([
          {
            path: 'shipments',
            component: ShipmentsComponent,
            canActivate: [AuthGuard]
          },
          {
            path: 'shipments-tems',
            component: ShipmentitemsComponent,
            canActivate: [AuthGuard]
          }, {
            path: 'packed-items',
            component: PackeditemsComponent,
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
        ShipmentsComponent,
        ShipmentitemsComponent,
        PackeditemsComponent
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
        ShipmentsService,
        ApiService,
        ConfigService,
        SharedService,
        Ng4LoadingSpinnerService,
        Constants,
        DatePipe,
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
    fixture = TestBed.createComponent(ShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call nginit', () => {
    component.ngOnInit();
    spyOn(component, 'intializeCurrentUser');
    expect(component.intializeCurrentUser).toBeTruthy();
  });


  // it('should call ngAfterViewInit', () => {
  //   component.ngAfterViewInit();
  //   spyOn(component, 'loadDataPage');
  //   expect(component.loadDataPage).toBeTruthy();
  // });

  it('should call loadDataPage with STAHLS user', () => {
    component.companyCode = 'STAHLS';
    component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
  });

  it('should call loadDataPage with other Organization', () => {
    component.companyCode = 'RAMCO';
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
    component.organizationDetails = {PolypmCustomerCode: "STAHLS"};
    component.intializeCurrentUser();
    spyOn(component, 'intializeCurrentUser');
    expect(component.intializeCurrentUser).toBeTruthy();
  });

  it('should call intializeCurrentUser as Other user', () => {
    component.organizationDetails = {PolypmCustomerCode: "NEWCO1"};
    component.intializeCurrentUser();
    spyOn(component, 'intializeCurrentUser');
    expect(component.intializeCurrentUser).toBeTruthy();
  });


  it('should call getAllShipmentsByOrg', () => {
    component.getAllShipmentsByOrg('STAHLS');
    spyOn(component, 'getAllShipmentsByOrg');
    expect(component.getAllShipmentsByOrg).toBeTruthy();
  });


  it('should call getFilterValueByCompanyCode', () => {
    component.companyCode = "NEWCO1";
    component.getFilterValueByCompanyCode();
    spyOn(component, 'getFilterValueByCompanyCode');
    expect(component.getFilterValueByCompanyCode).toBeTruthy();
  });

  it('should call startDateCalcs, endDateCalcs and endDataInput', () => {
    component.startDateCalcs('test');
    spyOn(component, 'startDateCalcs');
    expect(component.startDateCalcs).toBeTruthy();
   
    component.endDateCalcs('test');
    spyOn(component, 'endDateCalcs');
    expect(component.endDateCalcs).toBeTruthy();

    component.endDate = 'test'
    component.endDataInput();
    spyOn(component, 'endDataInput');
    expect(component.endDataInput).toBeTruthy();


    component.startDate = 'test'
    component.paginator.pageIndex = 0;
    component.startDataInput();
    spyOn(component, 'startDataInput');
    expect(component.startDataInput).toBeTruthy();

    
  });


  it('should call endDataInput with null value', () => {
    component.endDate = null
    component.endDataInput();
    spyOn(component, 'endDataInput');
    expect(component.endDataInput).toBeTruthy();

    component.startDate = null
    component.paginator.pageIndex = 0;
    component.startDataInput();
    spyOn(component, 'startDataInput');
    expect(component.startDataInput).toBeTruthy();

  });

  it('should call openModel and clear dates', () => {
    component.startdate = '';
    component.enddate = '';
    component.exportValue = '';

    component.openExportcsvModal();
    spyOn(component, 'openExportcsvModal');
    expect(component.openExportcsvModal).toBeTruthy(); 

  });


  it('check radio button change event', () => {
    var event: MatRadioChange
    expect(component.exportValue).toEqual(event.value);
    component.radioChange(event);
    spyOn(component, 'radioChange');
    expect(component.radioChange).toBeTruthy();
  });


  it('should call exportCSV as STAHLS', () => {
    component.startdate = 'test'
    component.enddate = 'test'
    component.companyCode = 'STAHLS';
  
    component.exportCSV();
    spyOn(component, 'exportCSV');
    expect(component.exportCSV).toBeTruthy();
  });


  it('should call exportCSV as Other User', () => {
    component.startdate = 'test'
    component.enddate = 'test'
    component.companyCode = 'NEWCO1';
   
    component.exportCSV();
    spyOn(component, 'exportCSV');
    expect(component.exportCSV).toBeTruthy();
  });

  


  

});
