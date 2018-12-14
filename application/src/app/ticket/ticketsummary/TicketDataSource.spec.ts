import { TicketDataSource } from './TicketDataSource';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TicketComponent } from './ticket.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatPaginatorModule } from '@angular/material';
import { TicketService } from './ticket.service';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { AuthGuard } from '../../login/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { CollectionViewer } from '@angular/cdk/collections';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { TicketModule } from './ticket.module';
import { MockDataTicketService } from '../../../mock/service/ticket/ticket-summary/mockDataTicketService';
import { MockNoDataTicketService } from '../../../mock/service/ticket/ticket-summary/mockNoDataTicketService';



// class MockTicketService {
//   getData(): Observable<any[]> {
//     console.log('mock ticker service called in spec file');
//     return Observable.of([
//       { name: 'Mazda', country: 'Japan' },
//       { name: 'BMW', country: 'Germany' }
//     ]);
//   }
// }

describe('TicketDataSource', () => {



  // const ticketService: any = {
  //   // mock properties here
  // };

  // const dialog: any = {
  //   // mock properties here
  // };
  // const ticketServiceClass = jasmine.createSpyObj('TicketService', ['getData']);
  // const injector = ReflectiveInjector.resolveAndCreate([ticketServiceClass]);
  // const ticketService = injector.get(ticketServiceClass);
  // const mockCarBrandService = jasmine.createSpyObj('TicketDataSource', ['loadDatas']);
  // const mockTicketService = jasmine.createSpyObj('TicketService', ['getData']);

  // const MockTicketService = jasmine.createSpyObj('TicketService', ['loadDatas']);
  // MockTicketService.loadDatas.and.returnValue(Observable.of([
  //   { name: 'Mazda', country: 'Japan' },
  //   { name: 'BMW', country: 'Germany' }
  // ]));
  // tslint:disable-next-line:prefer-const
  let collectionViewer: CollectionViewer;
  let service: TicketDataSource;
  let noDataService: TicketDataSource;
  let mockService: MockDataTicketService;

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
        TicketModule
      ],
      declarations: [
        AlertDialogComponent
      ],
      providers: [
        TicketService,
        ApiService,
        ConfigService,
        SharedService,
        TicketDataSource,
        MockDataTicketService,
        MockNoDataTicketService,
        // MockTicketService,
        // { provide: TicketDataSource, useValue: mockCarBrandService },
        // { provide: TicketService, useValue: MockDataTicketService },
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

  beforeEach(inject([TicketService, MockDataTicketService, MockNoDataTicketService, MatDialog],
    (ticketService, mockDataTicketService, mockNoDataTicketService, dialog) => {
      // service = loginService;
      service = new TicketDataSource(mockDataTicketService, dialog);
      noDataService = new TicketDataSource(mockNoDataTicketService, dialog);
      mockService = mockDataTicketService;
    }));

  // beforeEach(() => {
  //   service = new TicketDataSource(ticketService, dialog);
  // });


  it('should run #connect()', async () => {
    // const result = connect(collectionViewer);
    service.connect(collectionViewer);
    spyOn(service, 'connect');
    expect(service.connect).toBeTruthy();
  });

  it('should run #disconnect()', async () => {
    // disconnect(collectionViewer);
    service.disconnect(collectionViewer);
    spyOn(service, 'connect');
    expect(service.connect).toBeTruthy();
  });


  // loadDatas
  it('should run #loadDatas() and returns value', async () => {
    service.loadDatas(0, 25, 'date', 'desc', '',
      [], [], [], []);
    spyOn(service, 'loadDatas');
    expect(service.loadDatas).toBeTruthy();
  });

  it('should run #loadDatas() and returns empty Array', async () => {
    noDataService.loadDatas(0, 25, 'date', 'desc', '',
      [], [], [], []);
    spyOn(service, 'loadDatas');
    expect(service.loadDatas).toBeTruthy();
  });
  // loadDatasByCompanyCode
  it('should run #loadDatasByCompanyCode() and returns value', async () => {
    service.loadDatasByCompanyCode(0, 25, 'date', 'desc', '',
      [], [], [], '_uer21d');
    spyOn(service, 'loadDatasByCompanyCode');
    expect(service.loadDatasByCompanyCode).toBeTruthy();
  });

  it('should run #loadDatasByCompanyCode() and returns empty Array', async () => {
    noDataService.loadDatasByCompanyCode(0, 25, 'date', 'desc', '',
      [], [], [], '_uer21d');
    spyOn(service, 'loadDatasByCompanyCode');
    expect(service.loadDatasByCompanyCode).toBeTruthy();
  });

  // getSearchResultByOrgId
  it('should run #getSearchResultByOrgId() and returns value', async () => {
    service.getSearchResultByOrgId(0, 25, 'date', 'desc',
      [], [], [], [], {}, '_0oiued');
    spyOn(service, 'getSearchResultByOrgId');
    expect(service.getSearchResultByOrgId).toBeTruthy();
  });

  it('should run #getSearchResultByOrgId() and returns empty Array', async () => {
    noDataService.getSearchResultByOrgId(0, 25, 'date', 'desc',
      [], [], [], [], {}, '_0oiued');
    spyOn(service, 'getSearchResultByOrgId');
    expect(service.getSearchResultByOrgId).toBeTruthy();
  });

  // getSearchResult
  it('should run #getSearchResult() and returns value', async () => {
    service.getSearchResult(0, 25, 'date', 'desc',
      [], [], [], [], {});
    spyOn(service, 'getSearchResult');
    expect(service.getSearchResult).toBeTruthy();
  });

  it('should run #getSearchResult() and returns empty Array', async () => {
    noDataService.getSearchResult(0, 25, 'date', 'desc',
      [], [], [], [], {});
    spyOn(service, 'getSearchResult');
    expect(service.getSearchResult).toBeTruthy();
  });

  it('should run #OpenDialog()', async () => {
    service.OpenDialog();
    spyOn(service, 'OpenDialog');
    expect(service.OpenDialog).toBeTruthy();
    // expect(service.dialogConfig.disableClose).toBeTruthy();
    // expect(service.dialogConfig.autoFocus).toBeTruthy();
    // expect(service.dialogConfig.width).toBe('35%');
    // expect(service.dialogConfig.direction).toEqual('rtl');
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '35%';
    // dialogConfig.position = {
    //   bottom: '18%',
    // };
    // dialogConfig.direction = 'rtl';
    // dialogConfig.data = 'no data in Ticket';
    // expect(service)
    // this.dialog.open(AlertDialogComponent, dialogConfig);
    // const result = OpenDialog();
  });

  it('should run #showTableData()', async () => {
    // const result = showTableData(data);
    service.showTableData(mockService.getShowTableData());
    spyOn(service, 'showTableData');
    expect(service.showTableData).toBeTruthy();
  });

  // below working code
  // it('should run #loadDatas()', async () => {
  //   // const result = loadDatas(pageIndex, pageSize, sortLabel, sortDirection, search, createdBy, assignedTo, status, organization);
  //   // const ticketServiceClass = jasmine.createSpyObj('TicketDataSource', ['loadDatas']);
  //   service.loadDatas(1, 1, 'orderNumber', 'desc', 'search', 'createdName', 'assignedName', 'status', 'organization');
  //   spyOn(service, 'loadDatas');
  //   expect(service.loadDatas).toBeTruthy();
  //   // tslint:disable-next-line:no-unused-expression
  //   // expect(mockTicketService.getData).toHaveBeenCalled;
  //   // ticketServiceClass.getData(1, 1, 'orderNumber',
  //   //   'desc', 'search', 'createdName', 'assignedName', 'status', 'organization').and.returnValue(Observable.of([
  //   //   ]));
  //   // ticketServiceClass.loadDatas(1, 1, 'orderNumber', 'desc', 'search',
  //   //   'createdName', 'assignedName', 'status', 'organization').and.returnValue(Observable.of([
  //   //   ]));
  // });

  // it('should run #loadDatasByCompanyCode()', async () => {
  //   service.loadDatasByCompanyCode(1, 1, 'orderNumber', 'desc', 'search', 'createdName', 'assignedName', 'status', 'orgID');
  //   spyOn(service, 'loadDatasByCompanyCode');
  //   expect(service.loadDatasByCompanyCode).toBeTruthy();
  // });

  // it('should run #getSearchResultByOrgId()', async () => {
  //   // const result = getSearchResultByOrgId(pageIndex, pageSize,
  //   // sortLabel, sortDirection, organization, createdBy, assignedTo, status, search, orgId);
  //   service.getSearchResultByOrgId(1, 1, 'orderNumber', 'desc', 'search', [], [], [], [], 'search', 'orgID');
  //   spyOn(service, 'getSearchResultByOrgId');
  //   expect(service.getSearchResultByOrgId).toBeTruthy();
  // });

  // it('should run #getSearchResult()', async () => {
  //   // const result = getSearchResult(pageIndex, pageSize, sortLabel,
  // sortDirection, organization, createdBy, assignedTo, status, search);
  //   service.getSearchResult(1, 1, 'orderNumber', 'desc', [], [], [], [], {});
  //   spyOn(service, 'getSearchResult');
  //   expect(service.getSearchResult).toBeTruthy();
  // });

  // it('should run #OpenDialog()', async () => {
  //   service.OpenDialog();
  //   spyOn(service, 'OpenDialog');
  //   expect(service.OpenDialog).toBeTruthy();
  //   expect(service.dialogConfig.disableClose).toBeTruthy();
  //   expect(service.dialogConfig.autoFocus).toBeTruthy();
  //   expect(service.dialogConfig.width).toBe('35%');
  //   expect(service.dialogConfig.direction).toEqual('rtl');
  //   // const dialogConfig = new MatDialogConfig();
  //   // dialogConfig.disableClose = true;
  //   // dialogConfig.autoFocus = true;
  //   // dialogConfig.width = '35%';
  //   // dialogConfig.position = {
  //   //   bottom: '18%',
  //   // };
  //   // dialogConfig.direction = 'rtl';
  //   // dialogConfig.data = 'no data in Ticket';
  //   // expect(service)
  //   // this.dialog.open(AlertDialogComponent, dialogConfig);
  //   // const result = OpenDialog();
  // });

  // it('should run #showTableData()', async () => {
  //   // const result = showTableData(data);
  //   service.showTableData('data');
  // });

});
