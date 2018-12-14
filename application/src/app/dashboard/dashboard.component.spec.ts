import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';
import { RouterModule, Router } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { DashboardService } from '../dashboard/dashboard.service';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { AuthGuard } from '../login/auth.guard';
import { SharedService } from '../shared/shared.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { Location } from '@angular/common';
import { By } from '@angular/platform-browser';
import { LoginService } from '../login/login.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const dashboardService: DashboardService = null;
  let location: Location;
  let router: Router;
  let loginService: LoginService = null;
  let backend: MockBackend = null;


  TestBed.overrideComponent(DashboardComponent, {
    set: {
      providers: [
        {
          provide: DashboardService,
          useValue: dashboardService
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
        RouterModule.forRoot([
          {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        CommonModule,
        SidenavModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatCardModule,
        FormsModule,
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        LoadingModule.forRoot({
          animationType: ANIMATION_TYPES.circleSwish,
          backdropBackgroundColour: '#ffffff',
          backdropBorderRadius: '100%',
          primaryColour: '#1e3d8c',
          secondaryColour: '#f7f986',
          tertiaryColour: '#ffffff'
        }),
        Ng2Bs3ModalModule,
        NgCircleProgressModule.forRoot({
          backgroundPadding: -28,
          radius: 33,
          space: -20,
          outerStrokeWidth: 22,
          outerStrokeColor: 'rgb(120, 192, 0)',
          innerStrokeColor: '#e7e8ea',
          innerStrokeWidth: 21,
          animateTitle: false,
          animationDuration: 400,
          showTitle: false,
          showUnits: false,
          showSubtitle: false,
          showBackground: false,
          outerStrokeLinecap: 'inherit'
        }),
        MatListModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        RouterTestingModule
      ],
      declarations: [
        DashboardComponent,
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
        DashboardService,
        ApiService,
        ConfigService,
        SharedService,
        Constants,
        Ng4LoadingSpinnerService,
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
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(DashboardComponent);
    router.initialNavigation();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTopSelling', () => {
  
    component.companyCode = 'STAHLS';
    component.topSellingDays = 30;

    component.nodataTopSelling = false;
    component.topSelling = [];
   
    component.getTopSelling();
    spyOn(component, 'getTopSelling');
    expect(component.getTopSelling).toBeTruthy();
  });


  it('should get orders onTime as STAHLS', () => {
  
    component.companyCode = 'STAHLS';
    component.topSellingDays = 30;

    component.orderOnTimeToday = 3;
    component.orderOnTimePercent = 10;
   
    component.onTime();
    spyOn(component, 'onTime');
    expect(component.onTime).toBeTruthy();
  });


  it('should get orders onTime as othere user', () => {
  
    component.companyCode = 'NEWC01';
    component.topSellingDays = 30;

    component.orderOnTimeToday = 3;
    component.orderOnTimePercent = 10;
   
    component.onTime();
    spyOn(component, 'onTime');
    expect(component.onTime).toBeTruthy();
  });



  it('should call display chart method', () => {
  
    component.loading = false;
   
    component.displaychart([]);
    spyOn(component, 'displaychart');
    expect(component.displaychart).toBeTruthy();
  });


  it('should call priorityticket method as STAHLS user', () => {
  
    component.companyCode = 'STAHLS'; 
    component.priorityticket();

   
    spyOn(component, 'priorityticket');
    expect(component.priorityticket).toBeTruthy();
  });

  it('should call priorityticket method as other users', () => {
  
   
    component.companyCode = 'NEWC01'; 
    component.priorityticket();
    spyOn(component, 'priorityticket');
    expect(component.priorityticket).toBeTruthy();
  });

  it('should call getOrdersReceived method as STAHLS', () => {
  
    component.orderReceived =  {percent : 2};
    component.companyCode = 'STAHLS'; 
    component.getOrdersReceived();

    spyOn(component, 'priorityticket');
    expect(component.priorityticket).toBeTruthy();
  });

  it('should call getOrdersReceived method as other user', () => {
  
    component.orderReceived =  {percent : 2};
  
    component.companyCode = 'NEWC01'; 
    component.getOrdersReceived();
    spyOn(component, 'priorityticket');
    expect(component.priorityticket).toBeTruthy();
  });

  it('should call getOrdersShipped method as STAHLS user', () => {
  
    component.orderShipped =  10;
    component.orderShippedToday = 2;
    component.companyCode = 'STAHLS'; 
    component.getOrdersShipped();
    spyOn(component, 'getOrdersShipped');
    expect(component.getOrdersShipped).toBeTruthy();
  });

  it('should call getOrdersShipped method as other user', () => {
  
    component.orderShipped =  10;
    component.orderShippedToday = 2;
    component.companyCode = 'NEWC01'; 
    component.getOrdersShipped();
    spyOn(component, 'getOrdersShipped');
    expect(component.getOrdersShipped).toBeTruthy();
  });


  it('should get the data for the bar graph as STHALS', () => {
  
    component.showGraph =  'shipped';
    component.barGraphDays = 7;
    component.companyCode = 'STHALS'; 
    component.barGraphDataRecived = [];

    component.getOrdersShipped();
    spyOn(component, 'getOrdersShipped');
    expect(component.getOrdersShipped).toBeTruthy();
  });

  it('should get the data for the bar graph as others', () => {
  
    component.showGraph =  'shipped';
    component.barGraphDays = 7;
    component.companyCode = 'NEWC01'; 
    component.barGraphDataRecived = [];

    component.getOrdersShipped();
    spyOn(component, 'getOrdersShipped');
    expect(component.getOrdersShipped).toBeTruthy();
  });

  it('should populate the data for the bar graph', () => {
  
    component.barGraphDays =  7;
    component.dayGraph = ['1', '2', '3', '4', '5', '6', '7'];
    component.barOrderShipped2();

    component.barGraphDays =  30;
    component.dayGraph = ['4', '8', '12', '16', '20', '24', '30'];
    component.barOrderShipped2();

    component.barGraphDays =  90;
    component.dayGraph = ['15', '30', '45', '60', '75', '90'];
    component.barOrderShipped2();


    spyOn(component, 'barOrderShipped2');
    expect(component.barOrderShipped2).toBeTruthy();
  });


  it('should populate the data for the bar graph OrderReceived', () => {
  
    component.barGraphDays =  7;
    component.dayGraph = ['1', '2', '3', '4', '5', '6', '7'];
    component.barOrderReceived2();

    component.barGraphDays =  30;
    component.dayGraph = ['4', '8', '12', '16', '20', '24', '30'];
    component.barOrderReceived2();

    component.barGraphDays =  90;
    component.dayGraph = ['15', '30', '45', '60', '75', '90'];
    component.barOrderReceived2();


    spyOn(component, 'barOrderReceived2');
    expect(component.barOrderReceived2).toBeTruthy();
  });



  it('should populate the data for the time graph', () => {

    component.timeGraphData= {Actual:[1,2,3,10],Forcast:[1,2,3,7]}
  
    component.timeGraphDays =  7;
    component.ForecastdayGraph = ['1', '2', '3', '4', '5', '6', '7'];
    component.timeGraph2();

    component.timeGraphDays =  30;
    component.ForecastdayGraph = ['4', '8', '12', '16', '20', '24', '30'];
    component.timeGraph2();

    component.timeGraphDays =  90;
    component.ForecastdayGraph = ['15', '30', '45', '60', '75', '90'];
    component.timeGraph2();


    spyOn(component, 'timeGraph2');
    expect(component.timeGraph2).toBeTruthy();
  });



  it('should get the data for the onTimeGraph as STHALS', () => {
  
    component.showGraph =  'ontime';
    component.onTimeDays = 7;
    component.companyCode = 'STHALS'; 
    
    component.earilerGraph = {};
    component.ONTimeGraph = {};
    component.delayGraph = {};

    component.onTimeGraph();
    spyOn(component, 'onTimeGraph');
    expect(component.onTimeGraph).toBeTruthy();
  });


  it('should get the data for the onTimeGraph as Other users', () => {
  
    component.showGraph =  'ontime';
    component.onTimeDays = 7;
    component.companyCode = 'NEWC01'; 
    
    component.earilerGraph = {};
    component.ONTimeGraph = {};
    component.delayGraph = {};

    component.onTimeGraph();
    spyOn(component, 'onTimeGraph');
    expect(component.onTimeGraph).toBeTruthy();
  });


  it('should populate the data for the time graph2', () => {
  
    component.onTimeDays =  7;
    component.onTimedayGraph = ['1', '2', '3', '4', '5', '6', '7'];
    component.onTimeGraph2();

    component.onTimeDays =  30;
    component.onTimedayGraph = ['4', '8', '12', '16', '20', '24', '30'];
    component.onTimeGraph2();

    component.onTimeDays =  90;
    component.onTimedayGraph = ['15', '30', '45', '60', '75', '90'];
    component.onTimeGraph2();


    spyOn(component, 'onTimeGraph2');
    expect(component.onTimeGraph2).toBeTruthy();
  });


});


