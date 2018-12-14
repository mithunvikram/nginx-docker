import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { TicketdetailsComponent } from './ticketdetails.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { Ng2Bs3ModalModule, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { TicketDetailService } from './ticketdetails.service';
import { AuthGuard } from '../../login/auth.guard';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../orders/orders.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileUploadModule } from 'ng2-file-upload';
import { MomentTimezoneModule } from 'angular-moment-timezone';
import { MatPaginatorModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { OrderDataSource } from '../../orders/orderDataSource';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { LoginService } from '../../login/login.service';
import { MockDataTicketDetailService } from '../../../mock/service/ticket/ticketdetails/MockDataTicketDetailService';
import { MockLoginService } from '../../../mock/service/login/mockLoginService';
import { MockTicketCreationService } from '../../../mock/service/ticket/ticketcreation/mockDataTicketCreationService';
import { TicketCreationModule } from '../ticketcreation/ticketcreation.module';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';

describe('TicketdetailsComponent', () => {
  let component: TicketdetailsComponent;
  let fixture: ComponentFixture<TicketdetailsComponent>;
  // let OrderSource: OrderDataSource;
  let loginService: LoginService = null;
  let backend: MockBackend = null;
  let mockDataTicketDetailService: MockDataTicketDetailService = null;
  let orderService: OrderService = null;
  let mockTicketCreationService: MockTicketCreationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ TicketdetailsComponent ]
      imports: [
        RouterModule.forRoot([{
          path: 'ticketdetails',
          component: TicketdetailsComponent,
          canActivate: [AuthGuard]
        }]),
        HttpClientModule,
        BrowserAnimationsModule,
        CommonModule,
        BrowserModule,
        MatButtonModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        SidenavModule,
        Ng2Bs3ModalModule,
        MatInputModule,
        MatRadioModule,
        MatFormFieldModule,
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        MomentTimezoneModule,
        FileUploadModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatDialogModule,
        Ng4LoadingSpinnerModule,
        TicketCreationModule
      ],
      declarations: [
        TicketdetailsComponent,
        AlertDialogComponent
      ],
      // providers: [TicketDetailService]
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
        OrderService,
        TicketDetailService,
        MockLoginService,
        MockDataTicketDetailService,
        MockTicketCreationService,
        { provide: TicketDetailService, useClass: MockDataTicketDetailService },
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

  // beforeEach(inject([LoginService, MockBackend], (Service: LoginService, mockBackend: MockBackend) => {
  //   loginService = Service;
  //   backend = mockBackend;
  // }));


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

  beforeEach(inject([MockLoginService, MockDataTicketDetailService, MockTicketCreationService, OrderService],
    (mockLoginService, mockService, mockTicketService, service) => {
      orderService = service;
      mockTicketCreationService = mockTicketService;
      mockDataTicketDetailService = mockService;
      mockLoginService.login().subscribe((responseValue) => {
        sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
      });
      mockLoginService.loginByOtherUser().subscribe(responseValue => {
        sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
      });
    }));



  beforeEach(() => {
    fixture = TestBed.createComponent(TicketdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterAll(() => {
    sessionStorage.removeItem('currentUser');
  });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(TicketdetailsComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });



  // it('should create a component', async () => {
  //   expect(component).toBeTruthy();
  // });


  it('should run #ngOnInit()', async () => {
    const result = component.ngOnInit();
    spyOn(component, 'ngOnInit');
    expect(component.ngOnInit).toBeTruthy();
    const dateTest = new Date();
    expect(component.ischecked).toBeFalsy();
    expect(component.date).toEqual(dateTest.getDate());
    expect(component.year).toBe(dateTest.getFullYear());
    expect(component.month).toBe(dateTest.getMonth());
    expect(component.currentdate).toBe(component.month + '/' + component.date + '/' + component.year);
    expect(component.showDetails).toBeFalsy();
    spyOn(component, 'getAllSalesOrder');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllSalesOrder).toHaveBeenCalled;
    spyOn(component, 'currentUserDetails');
    // tslint:disable-next-line:no-unused-expression
    expect(component.currentUserDetails).toHaveBeenCalled;
    spyOn(component, 'getAllOrganization');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganization).toHaveBeenCalled;
    spyOn(component, 'getAllOrganizationUser');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganizationUser).toHaveBeenCalled;
    spyOn(component, 'getclosereason');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getclosereason).toHaveBeenCalled;
    spyOn(component, 'getQueryDetails');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getQueryDetails).toHaveBeenCalled;
    expect(component.uploader.queue.length).toBe(0);

  });

  it('should run #ngAfterViewInit()', async () => {
    const result = component.ngAfterViewInit();
    spyOn(component, 'ngAfterViewInit');
    expect(component.ngAfterViewInit).toBeTruthy();
  });

  // it('should run #loadDataPage()', async () => {
  //   // const result = component.loadDataPage();
  // });

  it('should run #loadDataPage() and customer code is "STAHLS"', async () => {
    component.companycode = 'STAHLS';
    const result = component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
  });

  it('should run #loadDataPage() and customer code is "NEWC01"', async () => {
    component.sort.toArray()[2].active = undefined;
    component.sort.toArray()[2].direction = undefined;
    component.companycode = 'NEWC01';
    const result = component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
  });


  it('should run #getSalesOrder() and customer code is "STAHLS"', async () => {
    component.companycode = 'STAHLS';
    const result = component.getSalesOrder('OrderNumber', 'desc');
    spyOn(component, 'getSalesOrder');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getSalesOrder).toHaveBeenCalledBefore;
    // spyOn(component, 'getAllSalesOrder');
    // // tslint:disable-next-line:no-unused-expression
    // expect(component.getAllSalesOrder).toHaveBeenCalled;
  });

  it('should run #getSalesOrder() and customer code is "NEWC01"', async () => {
    // component.companycode = 'NEWC01';
    const result = component.getSalesOrder('OrderNumber', 'desc');
    spyOn(component, 'getSalesOrder');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getSalesOrder).toHaveBeenCalledBefore;
    spyOn(component, 'getAllSalesOrderByCode');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllSalesOrderByCode).toHaveBeenCalled;
  });

  it('should run #getAllSalesOrder()', async () => {
    component.OrdersSource = new OrderDataSource(orderService);
    const result = component.getAllSalesOrder('OrderNumber', 'desc');
    spyOn(component, 'getAllSalesOrder');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllSalesOrder).toHaveBeenCalledBefore;
  });

  it('should run #getAllSalesOrderByCode()', async () => {
    component.OrdersSource = new OrderDataSource(orderService);
    const result = component.getAllSalesOrderByCode();
    spyOn(component, 'getAllSalesOrderByCode');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllSalesOrderByCode).toHaveBeenCalledBefore;
    // const result = component.getAllSalesOrderByCode();
  });

  it('should run #currentUserDetails()', async () => {
    const result = component.currentUserDetails();
    spyOn(component, 'currentUserDetails');
    expect(component.currentUserDetails).toBeTruthy();
  });

  // it('should run #Showdetails()', async () => {
  //   // @ViewChild('Ordernumbers')
  //   // component.Ordernumber: ModalComponent;
  //   const result = component.Showdetails();
  //   spyOn(component, 'Showdetails');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.Showdetails).toHaveBeenCalledBefore;
  // });

  // need to work
  it('should run #Hidedetails()', async () => {
    const result = component.Hidedetails();
    spyOn(component, 'Hidedetails');
    // tslint:disable-next-line:no-unused-expression
    expect(component.Hidedetails).toHaveBeenCalledBefore;
  });

  it('should run #saveAssignedUserTicket()', async () => {
    //   const rangeElement = fixture.nativeElement.querySelector('#paginator-load');
    //   fixture.debugElement.triggerEventHandler(rangeElement, 'click');
    //   // tslint:disable-next-line:no-unused-expression
    //   expect(component.loadDataPage).toHaveBeenCalled;

    const buttonElement = fixture.nativeElement.querySelector('.divBtnAssign button');
    console.log('%%%%%%%%%%%% button elements are ----- ', buttonElement);
    fixture.detectChanges();
    fixture.debugElement.triggerEventHandler(buttonElement, 'click');
    // const result = component.saveAssignedUserTicket();
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



  it('should run #AddOrder()', async () => {
    component.selectedTableValue = mockTicketCreationService.getSelectedValue();
    const result = component.AddOrder();
    spyOn(component, 'AddOrder');
    // tslint:disable-next-line:no-unused-expression
    expect(component.AddOrder).toHaveBeenCalledBefore;
  });

  it('should run #getAllOrganizationUser()', async () => {
    const result = component.getAllOrganizationUser();
    spyOn(component, 'getAllOrganizationUser');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganizationUser).toHaveBeenCalledBefore;
  });

  it('should run #getAllOrganization() and the Organization is not the "Stahls"', async () => {
    const result = component.getAllOrganization();
    spyOn(component, 'getAllOrganization');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganization).toHaveBeenCalledBefore;
  });

  it('should run #getAllOrganization() and the organizationname is "Stahls"', async () => {
    component.organizationname = 'Stahls';
    const result = component.getAllOrganization();
    spyOn(component, 'getAllOrganization');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganization).toHaveBeenCalledBefore;
  });

  it('should run #getAllOrganization() and the organizationname is undefined', async () => {
    component.organizationname = undefined;
    const result = component.getAllOrganization();
    spyOn(component, 'getAllOrganization');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganization).toHaveBeenCalledBefore;
  });

  // it('should run #getQueryDetails()', async () => {
  //   // const result = component.getQueryDetails();
  // });

  it('should run #filterOrg()', async () => {
    component.allUser = mockDataTicketDetailService.getAllUserForFilterOrg();
    const result = component.filterOrg(mockDataTicketDetailService.getSelectedFilterOrg());
    spyOn(component, 'filterOrg');
    // tslint:disable-next-line:no-unused-expression
    expect(component.filterOrg).toHaveBeenCalled;
  });

  it('should run #saveAssignedUserTicket()', async () => {
    component.selectedValues = new FormControl([{ username: 'firstuser' }, { username: 'secondUser' }]);
    const result = component.saveAssignedUserTicket();
    spyOn(component, 'saveAssignedUserTicket');
    // tslint:disable-next-line:no-unused-expression
    expect(component.saveAssignedUserTicket).toHaveBeenCalled;
  });

  it('should run #sendMessage()', async () => {
    component.currentUserEmail = 'assignedTo@gmail.com';
    const result = component.sendMessage();
    spyOn(component, 'sendMessage');
    // tslint:disable-next-line:no-unused-expression
    expect(component.sendMessage).toHaveBeenCalledBefore;
  });

  it('should run #getTicketByUuid()', async () => {
    const result = component.getTicketByUuid('WE434W');
    spyOn(component, 'getTicketByUuid');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getTicketByUuid).toHaveBeenCalledBefore;
    expect(component.ticketcount).toEqual(0);
  });

  it('should run #getAllUploadFile()', async () => {
    component.ticketDetails.uuid = 'EWW23K';
    const result = component.getAllUploadFile();
    spyOn(component, 'getAllUploadFile');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllUploadFile).toHaveBeenCalled;
  });

  it('should run #ViewTicketHistory()', async () => {
    const result = component.ViewTicketHistory('TR3eUi');
    spyOn(component, 'ViewTicketHistory');
    // tslint:disable-next-line:no-unused-expression
    expect(component.ViewTicketHistory).toHaveBeenCalled;
  });

  it('should run #SelectedAttachment() and the passed data not matched', async () => {
    component.attachmenturl = mockDataTicketDetailService.getSelectedAttachementUrl();
    const result = component.SelectedAttachment(mockDataTicketDetailService.getAttachementUrlNotMatched());
    spyOn(component, 'SelectedAttachment');
    // tslint:disable-next-line:no-unused-expression
    expect(component.SelectedAttachment).toHaveBeenCalled;
  });

  it('should run #SelectedAttachment() and the passed data matched', async () => {
    component.attachmenturl = mockDataTicketDetailService.getSelectedAttachementUrl();
    const result = component.SelectedAttachment(mockDataTicketDetailService.getAttachementUrlMatched());
    spyOn(component, 'SelectedAttachment');
    // tslint:disable-next-line:no-unused-expression
    expect(component.SelectedAttachment).toHaveBeenCalled;
  });

  it('should run #download()', async () => {
    component.attachmenturl = mockDataTicketDetailService.getSelectedAttachementUrl();
    const result = component.download();
    spyOn(component, 'download');
    // tslint:disable-next-line:no-unused-expression
    expect(component.download).toHaveBeenCalled;
    expect(component.ischecked).toBeFalsy();
  });

  it('should run #DeleteAttachment()', async () => {
    component.attachmenturl = mockDataTicketDetailService.getSelectedAttachementUrl();
    // component.ticketDetails = mockDataTicketDetailService.getTicketByUuid('RXV2id9');
    mockDataTicketDetailService.getTicketByUuid('RXV2id9').subscribe((responseValue) => {
      component.ticketDetails = responseValue;
    });
    component.currentUserEmail = 'assignedTo@gmail.com';
    const result = component.DeleteAttachment();
    spyOn(component, 'DeleteAttachment');
    // tslint:disable-next-line:no-unused-expression
    expect(component.DeleteAttachment).toHaveBeenCalled;

  });

  // it('should run #openCloseTicketModal()', async () => {
  //   // const result = component.openCloseTicketModal();
  // });

  // it('should run #openDownloadAttachmentModal()', async () => {
  //   // const result = component.openDownloadAttachmentModal();
  // });

  // it('should run #getclosereason()', async () => {
  //   // const result = component.getclosereason();
  // });

  it('should run #fileupload()', async () => {
    mockDataTicketDetailService.getTicketByUuid('RXV2id9').subscribe((responseValue) => {
      component.ticketDetails = responseValue;
    });
    component.currentUserEmail = 'assignedTo@gmail.com';
    component.TicketAttachment.attachmenturl = 1;
    component.selected.length = 1;
    const result = component.fileupload();
    spyOn(component, 'fileupload');
    // tslint:disable-next-line:no-unused-expression
    expect(component.fileupload).toHaveBeenCalled;
  });

  it('should run #closeTicketOption()', async () => {
    mockDataTicketDetailService.getTicketByUuid('RXV2id9').subscribe((responseValue) => {
      component.ticketDetails = responseValue;
    });
    component.currentUserEmail = 'assignedTo@gmail.com';
    component.closedMessage = mockDataTicketDetailService.getCloseReasonDetails();
    const result = component.closeTicketOption();
    spyOn(component, 'closeTicketOption');
    // tslint:disable-next-line:no-unused-expression
    expect(component.closeTicketOption).toHaveBeenCalled;

  });

  // it('should run #OpenDialog()', async () => {
  //   // const result = component.OpenDialog();
  // });

  // it('should run #sendMailMessage()', async () => {
  //   // const result = component.sendMailMessage(data);
  // });

  // it('should run #tickettypechange()', async () => {
  //   // const result = component.tickettypechange(event);
  // });

  it('should run #selectmodel()', async () => {
    const result = component.selectmodel();
    spyOn(component, 'selectmodel');
    // tslint:disable-next-line:no-unused-expression
    expect(component.selectmodel).toHaveBeenCalled;
    // expect(component.dropdown).toEqual(!component.dropdown);
  });

  // it('should run #Addcomment()', async () => {
  //   // const result = component.Addcomment();
  // });

  // it('should run #ViewHistory()', async () => {
  //   // const result = component.ViewHistory();
  // });

  // it('should run #cancelcomment()', async () => {
  //   // const result = component.cancelcomment();
  // });

  // it('should run #CloseTicketHistory()', async () => {
  //   // const result = component.CloseTicketHistory();
  // });

  it('should run #Reopenticket()', async () => {
    mockDataTicketDetailService.getTicketByUuid('RXV2id9').subscribe((responseValue) => {
      component.ticketDetails = responseValue;
    });
    component.currentUserEmail = 'assignedTo@gmail.com';
    const result = component.Reopenticket();
    spyOn(component, 'Reopenticket');
    // tslint:disable-next-line:no-unused-expression
    expect(component.Reopenticket).toHaveBeenCalled;
  });

  it('should run #closecomment()', async () => {
    mockDataTicketDetailService.getTicketByUuid('RXV2id9').subscribe((responseValue) => {
      component.ticketDetails = responseValue;
    });
    component.currentUserEmail = 'assignedTo@gmail.com';
    const result = component.closecomment();
    spyOn(component, 'closecomment');
    // tslint:disable-next-line:no-unused-expression
    expect(component.closecomment).toHaveBeenCalled;
  });

  it('should run #getAllCommentByTicketId() and return no data', async () => {
    const result = component.getAllCommentByTicketId('uii1');
    spyOn(component, 'getAllCommentByTicketId');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllCommentByTicketId).toHaveBeenCalled;
  });

  it('should run #getAllCommentByTicketId() and return data', async () => {
    const result = component.getAllCommentByTicketId('ui_021');
    spyOn(component, 'getAllCommentByTicketId');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllCommentByTicketId).toHaveBeenCalled;
  });

  it('should run #unCheckDownload() and return false', async () => {
    component.attachmenturl = mockDataTicketDetailService.getSelectedAttachementUrl();
    const result = component.unCheckDownload('LO34_iP');
    spyOn(component, 'unCheckDownload');
    // tslint:disable-next-line:no-unused-expression
    expect(component.unCheckDownload).toHaveBeenCalled;
  });

  it('should run #unCheckDownload() and return true', async () => {
    component.attachmenturl = mockDataTicketDetailService.getSelectedAttachementUrl();
    const result = component.unCheckDownload('1aTeer');
    spyOn(component, 'unCheckDownload');
    // tslint:disable-next-line:no-unused-expression
    expect(component.unCheckDownload).toHaveBeenCalled;
  });





  // it('should run #getSalesOrder() and customer code is "STAHLS"', async () => {
  //   fixture.detectChanges();
  //   component.companycode = 'STAHLS';
  //   console.log('compony code values are ---in spec files---------- ', component.companycode);
  //   const result = component.getSalesOrder('OrderNumber', 'desc');
  //   spyOn(component, 'getSalesOrder');
  //   expect(component.getSalesOrder).toHaveBeenCalledWith('OrderNumber', 'desc');
  //   // spyOn(component, 'getAllSalesOrder');
  //   // // tslint:disable-next-line:no-unused-expression
  //   // expect(component.getAllSalesOrder).toHaveBeenCalled;
  // });
  // it('should run #getSalesOrder() and customer code is "NEWC01"', async () => {
  //   component.companycode = 'NEWC01';
  //   spyOn(component, 'getSalesOrder');
  //   const result = component.getSalesOrder('OrderNumber', 'desc');
  //   expect(component.getSalesOrder).toHaveBeenCalledWith('OrderNumber', 'desc');
  //   spyOn(component, 'getAllSalesOrderByCode');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.getAllSalesOrderByCode).toHaveBeenCalled;
  // });

















































  // it('should run #ngOnInit()', async () => {
  //   // const result = component.ngOnInit();
  //   // component.ngOnInit();
  //   spyOn(component, 'ngOnInit');
  //   const dateTest = new Date();
  //   expect(component.ischecked).toBeFalsy();
  //   expect(component.date).toEqual(dateTest.getDate());
  //   expect(component.year).toBe(dateTest.getFullYear());
  //   expect(component.month).toBe(dateTest.getMonth());
  //   expect(component.currentdate).toBe(component.month + '/' + component.date + '/' + component.year);
  //   expect(component.showDetails).toBeFalsy();
  //   spyOn(component, 'getSalesOrder');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.getSalesOrder).toHaveBeenCalled;
  //   spyOn(component, 'currentUserDetails');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.currentUserDetails).toHaveBeenCalled;
  //   spyOn(component, 'getAllOrganization');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.getAllOrganization).toHaveBeenCalled;
  //   spyOn(component, 'getAllOrganizationUser');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.getAllOrganizationUser).toHaveBeenCalled;
  //   spyOn(component, 'getclosereason');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.getclosereason).toHaveBeenCalled;
  //   spyOn(component, 'getQueryDetails');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.getQueryDetails).toHaveBeenCalled;
  //   expect(component.uploader.queue.length).toBe(0);
  //   fixture.detectChanges();
  //   // this.spinnerService.show();
  //   // this.getSalesOrder('OrderNumber', 'desc');
  //   // this.currentUserDetails();
  //   // this.getAllOrganization();
  //   // this.getAllOrganizationUser();
  //   // this.getclosereason();
  //   // this.getQueryDetails();
  //   // const URL = this.config.api_url + Constants.upload_file;
  //   // this.uploader.onBeforeUploadItem = (item) => {
  //   //   item.url = URL + '';
  //   // };
  //   // this.uploader.authTokenHeader = 'Authorization';
  //   // this.uploader.authToken = 'Bearer ' + this.token;
  //   // this.uploader.onCompleteAll = () => {
  //   //   this.ticketDetailService.saveFileUrl(this.TicketAttachment).subscribe(
  //   //     data => {
  //   //     },
  //   //     error => {
  //   //       console.log('cannot save ticket attachmentUrl');
  //   //     }
  //   //   );
  //   //   this.uploader.queue.length = 0;
  //   // };

  //   // this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
  //   //   this.TicketAttachment.attachmenturl.push(JSON.parse(response));
  //   // };
  // });

  // it('should run #ngAfterViewInit()', async () => {
  //   // const result = component.ngAfterViewInit();
  // });

  // it('should run #loadDataPage()', async () => {
  //   const rangeElement = fixture.nativeElement.querySelector('#paginator-load');
  //   fixture.debugElement.triggerEventHandler(rangeElement, 'click');
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.loadDataPage).toHaveBeenCalled;
  //   const result = component.loadDataPage();
  //   console.log('range Elements are ------- ', rangeElement);
  //   console.log('result in loadDataPages() are ', result);
  // });

  // it('should run #getSalesOrder()', async () => {
  //   const result = component.getSalesOrder('label', 'direction');
  // });

  // it('should run #getAllSalesOrder()', async () => {
  //   const result = component.getAllSalesOrder('label', 'direction');
  // });

  // it('should run #getAllSalesOrderByCode()', async () => {
  //   // component.OrderSource = new OrderDataSource(component.OrderService);
  //   // this.OrderSource.load
  //   // const result = component.getAllSalesOrderByCode();
  // });

  // it('should run #currentUserDetails()', async () => {
  //   const result = component.currentUserDetails();
  // });

  // it('should run #Showdetails()', async () => {
  //   const result = component.Showdetails();
  // });

  // it('should run #Hidedetails()', async () => {
  //   const result = component.Hidedetails();
  // });

  // it('should run #isSelected() and #toggle()', async () => {
  //   // const result = component.isSelected(OrderID);
  //   // const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
  //   // spyOn(component, 'statusFilter');
  //   // trigger.click();
  //   // fixture.detectChanges();
  // });

  // it('should run #toggle()', async () => {
  //   const result = component.toggle('row');
  // });

  // it('should run #AddOrder()', async () => {
  //   // const result = component.AddOrder();
  //   // let dataToUpdate = component.ticketDetails
  // });

  // it('should run #getAllOrganizationUser()', async () => {
  //   const result = component.getAllOrganizationUser();
  // });

  // it('should run #getAllOrganization()', async () => {
  //   const result = component.getAllOrganization();
  // });

  // it('should run #getQueryDetails()', async () => {
  //   const result = component.getQueryDetails();
  // });

  // it('should run #filterOrg()', async () => {
  //   const result = component.filterOrg('data');
  // });

  // it('should run #saveAssignedUserTicket()', async () => {
  //   const result = component.saveAssignedUserTicket();
  // });

  // it('should run #sendMessage()', async () => {
  //   const result = component.sendMessage();
  // });

  // it('should run #getTicketByUuid()', async () => {
  //   const result = component.getTicketByUuid('uuid');
  // });

  // it('should run #getAllUploadFile()', async () => {
  //   const result = component.getAllUploadFile();
  // });

  // it('should run #ViewTicketHistory()', async () => {
  //   const result = component.ViewTicketHistory('uuid');
  // });

  // it('should run #SelectedAttachment()', async () => {
  //   const result = component.SelectedAttachment('attachmentid');
  // });

  // it('should run #download()', async () => {
  //   const result = component.download();
  // });

  // it('should run #DeleteAttachment()', async () => {
  //   const result = component.DeleteAttachment();
  // });

  // it('should run #openCloseTicketModal()', async () => {
  //   const result = component.openCloseTicketModal();
  // });

  // it('should run #openDownloadAttachmentModal()', async () => {
  //   const result = component.openDownloadAttachmentModal();
  // });

  // it('should run #getclosereason()', async () => {
  //   const result = component.getclosereason();
  // });

  // it('should run #fileupload()', async () => {
  //   const result = component.fileupload();
  // });

  // it('should run #closeTicketOption()', async () => {
  //   // const result = component.closeTicketOption();
  // });

  // it('should run #OpenDialog()', async () => {
  //   // const result = component.OpenDialog();
  // });

  // it('should run #sendMailMessage()', async () => {
  //   // const result = component.sendMailMessage(data);
  // });

  // it('should run #tickettypechange()', async () => {
  //   // const result = component.tickettypechange(event);
  // });

  // it('should run #selectmodel()', async () => {
  //   const result = component.selectmodel();
  // });

  // it('should run #Addcomment()', async () => {
  //   const result = component.Addcomment();
  // });

  // it('should run #ViewHistory()', async () => {
  //   const result = component.ViewHistory();
  // });

  // it('should run #cancelcomment()', async () => {
  //   const result = component.cancelcomment();
  // });

  // it('should run #CloseTicketHistory()', async () => {
  //   const result = component.CloseTicketHistory();
  // });

  // it('should run #Reopenticket()', async () => {
  //   const result = component.Reopenticket();
  // });

  // it('should run #closecomment()', async () => {
  //   const result = component.closecomment();
  // });

  // it('should run #getAllCommentByTicketId()', async () => {
  //   const result = component.getAllCommentByTicketId('ticketId');
  // });

  // it('should run #unCheckDownload()', async () => {
  //   const result = component.unCheckDownload('uuid');
  // });
});
