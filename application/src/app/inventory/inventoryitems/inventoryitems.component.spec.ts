import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule, MatDialog } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { SidenavComponent } from '../../sidenav/sidenav.component';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { InventoryService } from '../inventory.service';
import { InventoryitemsComponent } from './inventoryitems.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { AuthGuard } from '../../login/auth.guard';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatRadioModule } from '@angular/material/radio';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MockLoginService } from '../../../mock/service/login/mockLoginService';
import { MockInventoryService } from '../../../mock/service/inventory/MockInventoryService';
import { By } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';







describe('InventoryitemsComponent', () => {
  let component: InventoryitemsComponent;
  let fixture: ComponentFixture<InventoryitemsComponent>;
  let mockInventoryService: MockInventoryService = null;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([
          {
            path: 'inventoryitem',
            component: InventoryitemsComponent,
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
        Ng2Bs3ModalModule,
        MatRadioModule,
        CommonModule,
        BrowserAnimationsModule,
        MatDialogModule,
        FormsModule,
        SidenavModule
      ],
      declarations: [
        InventoryitemsComponent
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
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
  }));


  beforeEach(inject([MockLoginService, MockInventoryService],
    (mockLoginService, service) => {
      mockInventoryService = service;
      // dialog = matdialog;
      // inventoryService = inventoryservice;
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
    fixture = TestBed.createComponent(InventoryitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterAll(() => {
    sessionStorage.removeItem('currentUser');
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {

    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    // tslint:disable-next-line:no-unused-expression
    expect(component.ngOnInit).toHaveBeenCalled;
    spyOn(component, 'getquerydetails');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getquerydetails).toHaveBeenCalled;
  });

  it('should run #getquerydetails', () => {
    component.itemsid = 7316;
    component.getquerydetails();
    spyOn(component, 'getquerydetails');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getquerydetails).toHaveBeenCalled;
    component.getallInventoryitems();
    spyOn(component, 'getallInventoryitems');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getallInventoryitems).toHaveBeenCalled;
  });

  it('should run #getallInventoryitems', () => {
    component.itemsid = 7111;
    component.getallInventoryitems();
    spyOn(component, 'getallInventoryitems');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getallInventoryitems).toHaveBeenCalled;
  });


  it('click matHeader should calling sortingDataAccessor function', () => {
    const matHeaderFirstEl = fixture.debugElement.query(By.css('.mat-column-GoodsTransactionID'));
    matHeaderFirstEl.nativeElement.click();
    const matHeaderSecondEl = fixture.debugElement.query(By.css('.mat-column-StyleNumber'));
    matHeaderSecondEl.nativeElement.click();
    const matHeaderThirdEl = fixture.debugElement.query(By.css('.mat-column-StyleColor'));
    matHeaderThirdEl.nativeElement.click();
    const matHeaderFourEl = fixture.debugElement.query(By.css('.mat-column-GarmentSize'));
    matHeaderFourEl.nativeElement.click();
    const matHeaderFifthEl = fixture.debugElement.query(By.css('.mat-column-TransactionReasonCode'));
    matHeaderFifthEl.nativeElement.click();
    const matHeadersixthEl = fixture.debugElement.query(By.css('.mat-column-TransactionReasonCode2'));
    matHeadersixthEl.nativeElement.click();
    const matHeaderSeventhEl = fixture.debugElement.query(By.css('.mat-column-DataExportDate'));
    matHeaderSeventhEl.nativeElement.click();
    fixture.detectChanges();
  });

});
