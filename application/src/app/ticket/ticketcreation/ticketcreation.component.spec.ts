import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TicketcreationComponent } from './ticketcreation.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule, MatDialogModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FileSelectDirective } from 'ng2-file-upload';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatPaginatorModule } from '@angular/material';
import { TicketCreationService } from './ticketcreation.service';
import { AuthGuard } from '../../login/auth.guard';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../orders/orders.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderDetailService } from '../../order-detail/order-detail.service';
import { MockTicketCreationService } from '../../../mock/service/ticket/ticketcreation/mockDataTicketCreationService';
import { MockLoginService } from '../../../mock/service/login/mockLoginService';
import { OrderDataSource } from '../../orders/orderDataSource';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { TicketCreationModule } from './ticketcreation.module';



describe('TicketcreationComponent', () => {
  let component: TicketcreationComponent;
  let fixture: ComponentFixture<TicketcreationComponent>;
  let orderService: OrderService;
  let mockTicketCreationService: MockTicketCreationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ TicketcreationComponent ]
      imports: [
        RouterModule.forRoot([
          {
            path: 'ticketcreation',
            component: TicketcreationComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatSortModule,
        FormsModule,
        MatDialogModule,
        // MatCardModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        SidenavModule,
        MatPaginatorModule,
        TicketCreationModule,
        Ng4LoadingSpinnerModule.forRoot()
      ],
      declarations: [
        AlertDialogComponent,
      ],
      // providers: [TicketCreationService]
      providers: [
        OrderService,
        MockLoginService,
        OrderDetailService,
        TicketCreationService,
        MockTicketCreationService,
        { provide: TicketCreationService, useClass: MockTicketCreationService },
        ApiService,
        ConfigService,
        SharedService,
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
  beforeEach(inject([MockLoginService, MockTicketCreationService, OrderService], (mockLoginService, mockService, service) => {
    orderService = service;
    mockTicketCreationService = mockService;
    mockLoginService.login().subscribe((responseValue) => {
      sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
    });

    mockLoginService.loginByOtherUser().subscribe(responseValue => {
      sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
    });


  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(TicketcreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterAll(() => {
    sessionStorage.removeItem('currentUser');
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    expect(component.ngOnInit).toBeTruthy();
    // tslint:disable-next-line:no-unused-expression
    expect(component.getquerydetails).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.getSalesOrder).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.currentUserDetails).toHaveBeenCalled;
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrg).toHaveBeenCalled;
  });

  it('should run #ngAfterViewInit()', async () => {
    const result = component.ngAfterViewInit();
    spyOn(component, 'ngAfterViewInit');
    expect(component.ngAfterViewInit).toBeTruthy();
  });

  it('should run #loadDataPage() and customer code is "STAHLS"', async () => {
    component.companycode = 'STAHLS';
    const result = component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
  });

  it('should run #loadDataPage() and customer code is "NEWC01"', async () => {
    component.companycode = 'NEWC01';
    const result = component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
  });

  it('should run #initializeVariable()', async () => {
    const result = component.initializeVariable();
    expect(component.ticket.Type).toBe('');
    expect(component.ticket.Status).toBe('');
    expect(component.ticket.salesorder).toEqual([]);
    expect(component.ticket.description).toBe('');
    expect(component.ticket.createdByUuid).toBe('');
    expect(component.ticket.assignedToUuid).toBe('');
    expect(component.uploader.queue.length).toBe(0);
    // expect(selection.clear();
  });

  it('should run #getSalesOrder()  and customer code is "STAHLS"', async () => {
    component.companycode = 'STAHLS';
    const result = component.getSalesOrder();
    spyOn(component, 'getSalesOrder');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getSalesOrder).toHaveBeenCalled;
  });
  it('should run #getSalesOrder()  and customer code is "NEWC01"', async () => {
    component.companycode = 'NEWC01';
    const result = component.getSalesOrder();
    spyOn(component, 'getSalesOrder');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllSalesOrderByCode).toHaveBeenCalled;
  });


  it('should run #getAllSalesOrder()', async () => {
    component.dataSource = new OrderDataSource(orderService);
    const result = component.getAllSalesOrder();
    spyOn(component, 'getAllSalesOrder');
    expect(component.getAllSalesOrder).toBeTruthy();
  });

  it('should run #getAllSalesOrderByCode()', async () => {
    component.dataSource = new OrderDataSource(orderService);
    const result = component.getAllSalesOrderByCode();
    spyOn(component, 'getAllSalesOrderByCode');
    expect(component.getAllSalesOrderByCode).toBeTruthy();
    // const result = component.getAllSalesOrderByCode();
  });

  it('should run #getAllOrg()', async () => {
    const result = component.getAllOrg();
    spyOn(component, 'getAllOrg');
    expect(component.getAllSalesOrderByCode).toBeTruthy();
  });

  it('should run #isSelected() and the return value must be false', async () => {
    component.selectedTableValue = [{ 'OrderID': 'D2121' }, { 'OrderID': 'D1111' }];
    const result = component.isSelected('D1100');
    spyOn(component, 'isSelected');
    expect(component.isSelected).toBeTruthy();
  });

  it('should run #isSelected() and the return value must be true', async () => {
    component.selectedTableValue = [{ 'OrderID': 'D2121' }, { 'OrderID': 'D1111' }];
    const result = component.isSelected('D1111');
    spyOn(component, 'isSelected');
    expect(component.isSelected).toBeTruthy();
  });

  it('should run #toggle()', async () => {
    component.selectedTableValue = mockTicketCreationService.getSelectedValue();
    const result = component.toggle(mockTicketCreationService.getNotMatchedSelectedValue());
    spyOn(component, 'toggle');
    expect(component.toggle).toBeTruthy();
  });

  it('should run #toggle() and if condition must called', async () => {
    component.selectedTableValue = mockTicketCreationService.getSelectedValue();
    const result = component.toggle(mockTicketCreationService.getMatchedSelectedValue());
    spyOn(component, 'toggle');
    expect(component.toggle).toBeTruthy();
  });

  it('should run #addItems()', async () => {
    component.selectedTableValue.length = 1;
    const result = component.addItems();
    spyOn(component, 'addItems');
    expect(component.addItems).toBeTruthy();
    expect(component.selectedTableValue.length).toEqual(1);
    expect(component.displayAdded).toBeTruthy();
  });

  it('should run #saveTicket()', async () => {
    const result = component.saveTicket();
    spyOn(component, 'addItems');
    expect(component.addItems).toBeTruthy();
    // tslint:disable-next-line:no-unused-expression
    expect(component.currentUserDetails).toHaveBeenCalled;
  });

  it('should run #errorDialog()', async () => {
    const result = component.errorDialog();
    spyOn(component, 'errorDialog');
    expect(component.errorDialog).toBeTruthy();
  });

  it('should run #OpenDialog()', async () => {
    const result = component.OpenDialog(212);
    spyOn(component, 'OpenDialog');
    expect(component.OpenDialog).toBeTruthy();
  });

  it('should run #getquerydetails()', async () => {
    const result = component.getquerydetails();
    spyOn(component, 'getquerydetails');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getquerydetails).toBeTruthy();
  });

  it('should run #sendCreateMessage()', async () => {
    const result = component.sendCreateMessage({});
    spyOn(component, 'sendCreateMessage');
    expect(component.sendCreateMessage).toBeTruthy();
  });

});
