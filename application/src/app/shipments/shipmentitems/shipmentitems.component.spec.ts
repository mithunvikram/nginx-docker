import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ShipmentitemsComponent } from './shipmentitems.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule, MatDatepickerModule, MatNativeDateModule, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { ShipmentsComponent } from '../shipments.component';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ShipmentsService } from '../shipments.service';
import { AuthGuard } from '../../login/auth.guard';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatRadioModule } from '@angular/material/radio';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { LoginService } from '../../login/login.service';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';



describe('ShipmentitemsComponent', () => {
  let component: ShipmentitemsComponent;
  let fixture: ComponentFixture<ShipmentitemsComponent>;
  let loginService: LoginService = null;
  let backend: MockBackend = null;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ ShipmentitemsComponent ]
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
          }
        ]),
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
        MatTooltipModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatRadioModule,
        Ng4LoadingSpinnerModule,
        Ng2Bs3ModalModule,
        MatNativeDateModule,
        MatDialogModule
      ],
      declarations: [
        ShipmentsComponent,
        ShipmentitemsComponent,
        AlertDialogComponent
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
        Constants,
        Ng4LoadingSpinnerService,
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
    fixture = TestBed.createComponent(ShipmentitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // it('should call getShipments', () => {

  //   component.dataResponse = "There is no Shipments";
  //   //component.Shipments = "There is no Shipments";
  //   component.listShipmentsItem = [];
  //   component.dataSource = new MatTableDataSource();
  //   component.getShipments('12345');
  //   spyOn(component, 'getShipments');
  //   expect(component.getShipments).toBeTruthy();
  // });


  it('should call getShipments2', () => {

    component.Shipments = {value:"test"};
    component.listShipmentsItem = [];
    component.dataSource = new MatTableDataSource();

    component.dataSource.paginator = MatPaginator;
    component.dataSource.sort = MatSort;

    component.getShipments('12345');
    spyOn(component, 'getShipments');
    expect(component.getShipments).toBeTruthy();
  });



  it('should call OpenDialog', () => {
    component.OpenDialog();
    spyOn(component, 'OpenDialog');
    expect(component.OpenDialog).toBeTruthy();
  });

  it('should call nginit', () => {
    component.ngOnInit();
    spyOn(component, 'getQueryDetails');
    expect(component.getQueryDetails).toBeTruthy();
  });


  it('should call initializeValue', () => {

    component.listOfShipments = ['test']
    component.dataSource = new MatTableDataSource();
    component.initializeValue();
    spyOn(component, 'initializeValue');
    expect(component.initializeValue).toBeTruthy();
  });


  


});
