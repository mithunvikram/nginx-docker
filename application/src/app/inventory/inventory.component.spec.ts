import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { InventoryComponent } from './inventory.component';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule, MatDialog } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { SidenavModule } from '../sidenav/sidenav.module';
import { InventoryService } from './inventory.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { AuthGuard } from '../login/auth.guard';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatRadioModule, MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { inventoryDataSource } from './inventoryDataSource';
import { LoginService } from '../login/login.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MockInventoryService } from '../../mock/service/inventory/MockInventoryService';
import { MockLoginService } from '../../mock/service/login/mockLoginService';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { InventoryModule } from './inventory.module';


describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  const dataSource = inventoryDataSource;
  // component.inventoryService = InventoryService;
  // component.dialog = MatDialog;
  let loginService: LoginService = null;
  // let backend: MockBackend = null;
  // let event: MatRadioChange;
  // let mockLoginService: MockLoginService = null;
  let mockInventoryService: MockInventoryService = null;
  let dialog: MatDialog = null;
  let inventoryService: InventoryService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'inventory',
            component: InventoryComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        OrderDetailModule,
        MatRadioModule,
        Ng2Bs3ModalModule,
        MatChipsModule,
        MatSelectModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatDialogModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SidenavModule,
        InventoryModule
      ],
      declarations: [
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
        InventoryService,
        MockInventoryService,
        { provide: InventoryService, useClass: MockInventoryService },
        ApiService,
        MockLoginService,
        ConfigService,
        SharedService,
        Ng4LoadingSpinnerService,
        Constants,
        DatePipe,
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

  beforeEach(inject([MockLoginService, MockInventoryService, InventoryService, MatDialog],
    (mockLoginService, service, inventoryservice, matdialog) => {
      mockInventoryService = service;
      dialog = matdialog;
      inventoryService = inventoryservice;
      // mockTicketCreationService = mockTicketService;
      // mockDataTicketDetailService = mockService;
      mockLoginService.login().subscribe((responseValue) => {
        sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
      });
      mockLoginService.loginByOtherUser().subscribe(responseValue => {
        sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
      });
    }));



  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterAll(() => {
    sessionStorage.removeItem('currentUser');
  });


  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });

//   it('should run #radioChange', () => {
//     const source = MatRadioButton;
//     const value = any;
//     const event = new MatRadioChange($event);
// component.radioChange('');
//   });
// it('should run #openExportcsvModal', () => {
//   component.openExportcsvModal();
//   spyOn(component, 'openExportcsvModal');
//   // tslint:disable-next-line:no-unused-expression
//   expect(component.openExportcsvModal).toHaveBeenCalled;
// });


  it('should run #ngOnInit and getAllActiveInventories service called', () => {
    component.companycode = 'STAHLS';
    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    // tslint:disable-next-line:no-unused-expression
    expect(component.ngOnInit).toHaveBeenCalled;
    expect(component.sizeSelectedValues).toEqual([]);
    expect(component.styleSelectedValue).toEqual([]);
    expect(component.colorSelectedValue).toEqual([]);
    expect(component.spinnerlogo).toBeFalsy();
    // this.spinnerService.show();
    expect(component.pageNo).toBe(1);
    spyOn(component, 'getAllActiveInventories');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllActiveInventories).toHaveBeenCalled;
  });

  it('should run #ngOnInit and getInventorybyCompanycode service called', () => {
    component.companycode = 'NEWC01';
    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    // tslint:disable-next-line:no-unused-expression
    expect(component.ngOnInit).toHaveBeenCalled;
    expect(component.sizeSelectedValues).toEqual([]);
    expect(component.styleSelectedValue).toEqual([]);
    expect(component.colorSelectedValue).toEqual([]);
    expect(component.spinnerlogo).toBeFalsy();
    // this.spinnerService.show();
    expect(component.pageNo).toBe(1);
    spyOn(component, 'getInventorybyCompanycode');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getInventorybyCompanycode).toHaveBeenCalled;
  });

  it('should run #loadDataPage() and the code is "STAHLS"', () => {
    component.companycode = 'STAHLS';
    component.loadDataPage();
    spyOn(component, 'loadDataPage');
    // tslint:disable-next-line:no-unused-expression
    expect(component.loadDataPage).toHaveBeenCalled;
    expect(component.pageNo).toEqual(component.paginator.pageIndex + 1);
  });

  it('should run #loadDataPage() and the code is "NEWC01"', () => {
    component.companycode = 'NEWC01';
    component.loadDataPage();
    spyOn(component, 'loadDataPage');
    // tslint:disable-next-line:no-unused-expression
    expect(component.loadDataPage).toHaveBeenCalled;
    expect(component.pageNo).toEqual(component.paginator.pageIndex + 1);
  });

  it('should run #ngAfterViewInit', () => {
    component.ngAfterViewInit();
    spyOn(component, 'ngAfterViewInit');
    // tslint:disable-next-line:no-unused-expression
    expect(component.ngAfterViewInit).toHaveBeenCalled;
  });

  it('should run #getAllActiveInventories', () => {
    component.dataSource = new inventoryDataSource(inventoryService, dialog);
    component.getAllActiveInventories();
    spyOn(component, 'getAllActiveInventories');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllActiveInventories).toHaveBeenCalled;
  });

  it('should run #getInventorybyCompanycode', () => {
    component.dataSource = new inventoryDataSource(inventoryService, dialog);
    component.getInventorybyCompanycode();
    spyOn(component, 'getInventorybyCompanycode');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getInventorybyCompanycode).toHaveBeenCalled;
  });

  it('should run #noDataDialog', () => {
    component.noDataDialog();
    spyOn(component, 'noDataDialog');
    // tslint:disable-next-line:no-unused-expression
    expect(component.noDataDialog).toHaveBeenCalled;
  });

  it('should run #closemodel', () => {
    component.closemodel();
    spyOn(component, 'closemodel');
    // tslint:disable-next-line:no-unused-expression
    expect(component.closemodel).toHaveBeenCalled;
  });

  it('should run #getFilterValue', () => {
    component.getFilterValue();
    spyOn(component, 'getFilterValue');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getFilterValue).toHaveBeenCalled;
  });
  it('should run #getFilterValueData', () => {
    component.getFilterValueData({});
    spyOn(component, 'getFilterValueData');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getFilterValueData).toHaveBeenCalled;
  });
  it('should run #getFilterValueDataByCompanyCode', () => {
    component.getFilterValueDataByCompanyCode({});
    spyOn(component, 'getFilterValueDataByCompanyCode');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getFilterValueDataByCompanyCode).toHaveBeenCalled;
  });

  it('should run #getFilterValueByCompanyCode', () => {
    component.getFilterValueByCompanyCode();
    spyOn(component, 'getFilterValueByCompanyCode');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getFilterValueByCompanyCode).toHaveBeenCalled;
  });

  it('should run #styleFilter and the getValue is true for admin user', () => {
    component.filterStyle = new FormControl('JS71389');
    component.companycode = undefined;
    component.styleFilter();
    spyOn(component, 'styleFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.styleFilter).toHaveBeenCalled;
  });

  it('should run #styleFilter and the getValue is false for admin user', () => {
    // component.filterStyle = new FormControl('JS71389');
    component.companycode = undefined;
    component.styleFilter();
    spyOn(component, 'styleFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.styleFilter).toHaveBeenCalled;
  });

  it('should run #styleFilter and the getValue is true for newBalance user', () => {
    component.filterStyle = new FormControl('JS71389');
    component.companycode = 'NEWC01';
    component.styleFilter();
    spyOn(component, 'styleFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.styleFilter).toHaveBeenCalled;
  });

  it('should run #styleFilter and the getValue is false for newBalance user', () => {
    // component.filterStyle = new FormControl('JS71389');
    component.companycode = 'NEWC01';
    component.styleFilter();
    spyOn(component, 'styleFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.styleFilter).toHaveBeenCalled;
  });

  it('should run #sizeFilter and the getValue is true for admin user', () => {
    component.filterSize = new FormControl('XL');
    component.companycode = undefined;
    component.sizeFilter();
    spyOn(component, 'sizeFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.sizeFilter).toHaveBeenCalled;
  });

  it('should run #sizeFilter and the getValue is false for admin user', () => {
    // component.filterSize = new FormControl('XL');
    component.companycode = undefined;
    component.sizeFilter();
    spyOn(component, 'sizeFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.sizeFilter).toHaveBeenCalled;
  });

  it('should run #sizeFilter and the getValue is true for newBalance user', () => {
    component.filterSize = new FormControl('XL');
    component.companycode = 'NEWC01';
    component.sizeFilter();
    spyOn(component, 'sizeFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.sizeFilter).toHaveBeenCalled;
  });

  it('should run #sizeFilter and the getValue is false for newBalance user', () => {
    // component.filterSize = new FormControl('XL');
    component.companycode = 'NEWC01';
    component.sizeFilter();
    spyOn(component, 'sizeFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.sizeFilter).toHaveBeenCalled;
  });

  it('should run #codeFilter and the getValue is true for admin user', () => {
    component.filterLocation = new FormControl('FFC');
    component.companycode = undefined;
    component.codeFilter();
    spyOn(component, 'codeFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.codeFilter).toHaveBeenCalled;
  });

  it('should run #codeFilter and the getValue is false for admin user', () => {
    // component.filterLocation = new FormControl('FFC');
    component.companycode = undefined;
    component.codeFilter();
    spyOn(component, 'codeFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.codeFilter).toHaveBeenCalled;
  });

  it('should run #codeFilter and the getValue is true for newBalance user', () => {
    component.filterLocation = new FormControl('FFC');
    component.companycode = 'NEWC01';
    component.codeFilter();
    spyOn(component, 'codeFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.codeFilter).toHaveBeenCalled;
  });

  it('should run #codeFilter and the getValue is false for admin user', () => {
    // component.filterLocation = new FormControl('FFC');
    component.companycode = 'NEWC01';
    component.codeFilter();
    spyOn(component, 'codeFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.codeFilter).toHaveBeenCalled;
  });

  it('should run #colorFilter and the getValue is true for admin user', () => {
    component.filterColor = new FormControl('BK');
    component.companycode = undefined;
    component.colorFilter();
    spyOn(component, 'colorFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.colorFilter).toHaveBeenCalled;
  });

  it('should run #colorFilter and the getValue is false for admin user', () => {
    // component.filterColor = new FormControl('BK');
    component.companycode = undefined;
    component.colorFilter();
    spyOn(component, 'colorFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.colorFilter).toHaveBeenCalled;
  });
  it('should run #colorFilter and the getValue is true for newBalance user', () => {
    component.filterColor = new FormControl('BK');
    component.companycode = 'NEWC01';
    component.colorFilter();
    spyOn(component, 'colorFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.colorFilter).toHaveBeenCalled;
  });


  it('should run #colorFilter and the getValue is false for admin user', () => {
    // component.filterColor = new FormControl('BK');
    component.companycode = 'NEWC01';
    component.colorFilter();
    spyOn(component, 'colorFilter');
    // tslint:disable-next-line:no-unused-expression
    expect(component.colorFilter).toHaveBeenCalled;
  });



  it('should run #styleselect', () => {
    component.styleselect();
    spyOn(component, 'styleselect');
    // tslint:disable-next-line:no-unused-expression
    expect(component.styleselect).toHaveBeenCalled;
  });

  it('should run #exportDetails and export value is "Inventory"', () => {
    component.exportValue = 'Inventory';
    component.dateRange.startdate = '1900-05-01T02:30:56';
    component.dateRange.enddate = '1900-05-01T02:30:56';
    component.exportDetails();
    spyOn(component, 'exportDetails');
    // tslint:disable-next-line:no-unused-expression
    expect(component.exportDetails).toHaveBeenCalled;
  });

  it('should run #exportDetails and export value is "Inventory Transaction"', () => {
    component.exportValue = 'Inventory Transaction';
    component.dateRange.startdate = '1900-05-01T02:30:56';
    component.dateRange.enddate = '1900-05-01T02:30:56';
    component.exportDetails();
    spyOn(component, 'exportDetails');
    // tslint:disable-next-line:no-unused-expression
    expect(component.exportDetails).toHaveBeenCalled;
  });

  it('should run #exportInventory and the code is "STAHLS"', () => {
    component.companycode = 'STAHLS';
    component.exportInventory();
    spyOn(component, 'exportInventory');
    // tslint:disable-next-line:no-unused-expression
    expect(component.exportInventory).toHaveBeenCalled;
  });

  it('should run #exportInventory and the code is "NEWC01"', () => {
    component.companycode = 'NEWC01';
    component.exportInventory();
    spyOn(component, 'exportInventory');
    // tslint:disable-next-line:no-unused-expression
    expect(component.exportInventory).toHaveBeenCalled;
  });

  it('should run #exportCSV has an Admin user', () => {
    component.companycode = undefined;
    component.exportCSV({});
    spyOn(component, 'exportCSV');
    // tslint:disable-next-line:no-unused-expression
    expect(component.exportCSV).toHaveBeenCalled;
  });
  it('should run #exportCSV has an newBalance user', () => {
    component.companycode = 'NEWC01';
    component.exportCSV({});
    spyOn(component, 'exportCSV');
    // tslint:disable-next-line:no-unused-expression
    expect(component.exportCSV).toHaveBeenCalled;
  });

  it('should run #exportInventoryItemsCSV method has an Admin user', () => {
    component.companycode = undefined;
    component.exportInventoryItemsCSV({});
    spyOn(component, 'exportInventoryItemsCSV');
    // tslint:disable-next-line:no-unused-expression
    expect(component.exportInventoryItemsCSV).toHaveBeenCalled;
  });

  it('should run #exportInventoryItemsCSV method has an newBalance user', () => {
    component.companycode = 'NEWC01';
    component.exportInventoryItemsCSV({});
    spyOn(component, 'exportInventoryItemsCSV');
    // tslint:disable-next-line:no-unused-expression
    expect(component.exportInventoryItemsCSV).toHaveBeenCalled;
  });




});
