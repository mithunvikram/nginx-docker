import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TicketComponent } from './ticket.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule, MatDialog } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatPaginatorModule } from '@angular/material';
import { TicketService } from './ticket.service';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { AuthGuard } from '../../login/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { Http, HttpModule, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { LoginService } from '../../login/login.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockDataTicketService } from '../../../mock/service/ticket/ticket-summary/mockDataTicketService';
import { MockLoginService } from '../../../mock/service/login/mockLoginService';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { TicketCreationModule } from '../ticketcreation/ticketcreation.module';



describe('TicketComponent', () => {
  let component: TicketComponent;
  let fixture: ComponentFixture<TicketComponent>;
  const loginService: LoginService = null;
  const backend: MockBackend = null;
  let mockTicketService: MockDataTicketService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'ticket',
            component: TicketComponent,
            canActivate: [AuthGuard]
          }
        ]),
        RouterModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpModule,
        CommonModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        FormsModule,
        MatCardModule,
        ReactiveFormsModule,
        SidenavModule,
        MatPaginatorModule,
        MatDialogModule,
        TicketCreationModule
      ],
      declarations: [
        TicketComponent,
        AlertDialogComponent
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
        TicketService,
        MockDataTicketService,
        MockLoginService,
        { provide: TicketService, useClass: MockDataTicketService },
        ApiService,
        ConfigService,
        SharedService,
        Constants,
        Ng4LoadingSpinnerService,
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

  // beforeEach(inject([LoginService, Ng4LoadingSpinnerService, TicketService, Router, MatDialog, MockBackend],
  //   (Service, spinnerService, ticketService, router, dialog, mockBackend) => {
  //     loginService = Service;
  //     backend = mockBackend;
  //     const ticketComponentConstructor = new TicketComponent(spinnerService, ticketService, router, dialog);
  //     // private spinnerService: Ng4LoadingSpinnerService,
  //     // private ticketService: TicketService, private router: Router, private dialog: MatDialog
  //   }));

  // beforeEach((done) => {
  //   // it('#login should call endpoint and return it\'s result', (done) => {
  //   backend.connections.subscribe((connection: MockConnection) => {
  //     const options = new ResponseOptions({
  //       body: JSON.stringify({ success: true })
  //     });
  //     connection.mockRespond(new Response(options));
  //     console.log('inside 2222');
  //     // Check the request method
  //     expect(connection.request.method).toEqual(RequestMethod.Post);
  //     // Check the url
  //     expect(connection.request.url).toEqual('/auth/login');
  //     // Check the body
  //     // expect(connection.request.text())
  //     expect(connection.request.text()).toEqual(JSON.stringify({ username: 'admin', password: 'admin' }));
  //     // Check the request headers
  //     expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
  //   });

  //   loginService.login('admin', 'admin')
  //     .subscribe((response) => {
  //       // console.log('response values are ---####------------ ', response);
  //       // Check the response
  //       expect(response.user.username).toEqual('admin');
  //       expect(response.user.password).toEqual('admin');
  //       // set value in sessionStorage
  //       sessionStorage.setItem('currentUser', JSON.stringify(response));
  //       sessionStorage.setItem('token', JSON.stringify(response.token));
  //       sessionStorage.setItem('dismissOrders', 'false');
  //       done();
  //     },
  //       (error) => {
  //         expect(error).toThrowError();
  //       });
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(TicketComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(inject([MockLoginService, MockDataTicketService], (mockLoginService, mockservice) => {
    // orderService = service;
    mockTicketService = mockservice;
    mockLoginService.login().subscribe((responseValue) => {
      sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
    });

    mockLoginService.loginByOtherUser().subscribe(responseValue => {
      sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
    });


  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(TicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    sessionStorage.removeItem('currentUser');
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });
  it('should run #ngOnInit() and organizationname is stahls', async () => {
    component.organizationname = 'Stahls';
    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    expect(component.ngOnInit).toBeTruthy();
    expect(component.pageNo).toBe(1);
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllTickets).toHaveBeenCalled;

  });

  it('should run #ngOnInit() and organizationname is "NEWC01"', async () => {
    component.organizationname = 'NEWC01';
    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    expect(component.ngOnInit).toBeTruthy();
    expect(component.pageNo).toBe(1);
    // tslint:disable-next-line:no-unused-expression
    expect(component.getTicketByOrgId).toHaveBeenCalled;

  });

  it('should run #ngAfterViewInit()', async () => {
    // const result = component.ngAfterViewInit();
    component.ngAfterViewInit();
  });

  it('should run #loadDataPage() and the value in advanced search', async () => {
    component.Search = {
      PONumber: '',
      assignedName: '',
      comments: '',
      createDate: '',
      createdName: 'createdUser',
      orderNumber: ''
    };
    const result = component.loadDataPage();
    spyOn(component, 'loadDataPage');
    // tslint:disable-next-line:no-unused-expression
    expect(component.loadDataPage).toHaveBeenCalled;
    spyOn(component, 'searchFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.searchFilter).toHaveBeenCalled;
  });

  it('should run #loadDataPage() and organizationname is "stahls"', async () => {
    // const result = component.loadDataPage();
    component.Search = {
      PONumber: '',
      assignedName: '',
      comments: '',
      createDate: '',
      createdName: '',
      orderNumber: ''
    };
    component.organizationname = 'Stahls';
    component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
    expect(component.pageNo).toEqual(component.paginator.pageIndex + 1);
  });

  it('should run #loadDataPage() and organizationname is "NEWC01"', async () => {
    // const result = component.loadDataPage();
    component.Search = {
      PONumber: '',
      assignedName: '',
      comments: '',
      createDate: '',
      createdName: '',
      orderNumber: ''
    };
    component.organizationname = 'NEWC01';
    component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
    expect(component.pageNo).toEqual(component.paginator.pageIndex + 1);
  });

  it('should run #getAllTickets()', async () => {
    const result = component.getAllTickets();
    spyOn(component, 'getAllTickets');
    expect(component.getAllTickets).toBeTruthy();
    // tslint:disable-next-line:no-unused-expression
    expect(component.getFilterValues).toHaveBeenCalled;
  });

  it('should run #getTicketByOrgId()', async () => {
    const result = component.getTicketByOrgId();
    spyOn(component, 'getTicketByOrgId');
    expect(component.getTicketByOrgId).toBeTruthy();
    // tslint:disable-next-line:no-unused-expression
    expect(component.getFilterValueByOrgId).toHaveBeenCalled;
  });

  it('should run #getFilterValues()', async () => {
    const result = component.getFilterValues();
    spyOn(component, 'getFilterValues');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getFilterValues).toHaveBeenCalled;
  });

  it('should run #getFilterValueByOrgId()', async () => {
    const result = component.getFilterValueByOrgId();
    spyOn(component, 'getFilterValueByOrgId');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getFilterValueByOrgId).toHaveBeenCalled;
  });

  // it('should run #FilterDetails()', async () => {
  //   const result = component.FilterDetails();
  //   spyOn(component, '');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.).toHaveBeenCalled;
  // });

  it('should run #organizationFilter()', async () => {
    component.selectfilter = new FormControl('stahls');
    const result = component.organizationFilter();
    spyOn(component, 'organizationFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.organizationFilter).toHaveBeenCalled;
  });

  it('should run #createByFilter()', async () => {
    component.selectfilter = new FormControl('createdUser');
    const result = component.createByFilter();
    spyOn(component, 'createByFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.createByFilter).toHaveBeenCalled;
  });

  it('should run #assignedToFilter()', async () => {
    component.selectfilter = new FormControl('assignedUser');
    const result = component.assignedToFilter();
    spyOn(component, 'assignedToFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.assignedToFilter).toHaveBeenCalled;
  });

  it('should run #statusFilter()', async () => {
    component.selectfilter = new FormControl('Opened');
    const result = component.statusFilter();
    spyOn(component, 'statusFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.statusFilter).toHaveBeenCalled;
  });

  it('should run #onRowSelected()', async () => {
    const result = component.onRowSelected({ uuid: 'RT32Df' });
    spyOn(component, 'onRowSelected');
    // tslint:disable-next-line:no-unused-expression
    expect(component.onRowSelected).toHaveBeenCalled;
  });

  it('should run #searchmodel() and no value in Advanced search', async () => {
    component.dataSource.searchCondition = false;
    component.Search = {
      PONumber: '',
      assignedName: '',
      comments: '',
      createDate: '',
      createdName: '',
      orderNumber: ''
    };
    const result = component.searchmodel();
    spyOn(component, 'searchmodel');
    // tslint:disable-next-line:no-unused-expression
    expect(component.searchmodel).toHaveBeenCalled;
    expect(component.dataSource.searchCondition).toBeTruthy();
  });

  it('should run #searchmodel() and the value in Advanced search', async () => {
    component.dataSource.searchCondition = false;
    component.Search = {
      'PONumber': '',
      'assignedName': 'ram',
      'assignedTo': [],
      'comments': '',
      'createDate': '',
      'createdBy': [],
      'createdName': '',
      'orderNumber': '',
      'organization': [],
      'pageIndex': 0,
      'pageSize': 25,
      'sortDirection': 'desc',
      'sortLabel': 'Date',
      'status': []
    };
    const result = component.searchmodel();
    spyOn(component, 'searchmodel');
    // tslint:disable-next-line:no-unused-expression
    expect(component.searchmodel).toHaveBeenCalled;
    expect(component.dataSource.searchCondition).toBeTruthy();
  });

  it('should run #cancelFilter()', async () => {
    component.dataSource.searchCondition = false;
    const result = component.cancelFilter();
    spyOn(component, 'cancelFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.cancelFilter).toHaveBeenCalled;
    expect(component.dataSource.searchCondition).toBeFalsy();
  });

  it('should run #clearFilterValue()', async () => {
    const result = component.clearFilterValue();
    spyOn(component, 'clearFilterValue');
    // tslint:disable-next-line:no-unused-expression
    expect(component.clearFilterValue).toHaveBeenCalled;
    expect(component.paginator.pageIndex).toEqual(0);
    spyOn(component, 'loadDataPage');
    // tslint:disable-next-line:no-unused-expression
    expect(component.loadDataPage).toHaveBeenCalled;
  });

  it('should run #searchFilter() and no value in advanced search', async () => {
    component.Search = {
      PONumber: '',
      assignedName: '',
      comments: '',
      createDate: '',
      createdName: '',
      orderNumber: ''
    };
    const result = component.searchFilter();
    spyOn(component, 'searchFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.searchFilter).toHaveBeenCalled;
    spyOn(component, 'loadDataPage');
    // tslint:disable-next-line:no-unused-expression
    expect(component.loadDataPage).toHaveBeenCalled;
  });

  it('should run #searchFilter() and the value in advanced search and the organizationname is "Stahls"', async () => {
    component.Search = {
      PONumber: '',
      assignedName: '',
      comments: '',
      createDate: '',
      createdName: 'createdUser',
      orderNumber: ''
    };
    component.organizationname = 'Stahls';
    const result = component.searchFilter();
    spyOn(component, 'searchFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.searchFilter).toHaveBeenCalled;
    spyOn(component, 'loadDataPage');
    // tslint:disable-next-line:no-unused-expression
    expect(component.loadDataPage).toHaveBeenCalled;
  });

  it('should run #searchFilter() and the value in advanced search and the organizationname is "NEWC01"', async () => {
    component.Search = {
      PONumber: '',
      assignedName: '',
      comments: '',
      createDate: '',
      createdName: 'createdUser',
      orderNumber: ''
    };
    component.organizationname = 'NEWC01';
    const result = component.searchFilter();
    spyOn(component, 'searchFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.searchFilter).toHaveBeenCalled;
    spyOn(component, 'loadDataPage');
    // tslint:disable-next-line:no-unused-expression
    expect(component.loadDataPage).toHaveBeenCalled;
  });

});
