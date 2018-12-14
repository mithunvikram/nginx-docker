import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { OrderService } from '../../orders/orders.service';
import { OrderDetailService } from '../../order-detail/order-detail.service';
import { TicketCreationService } from './ticketcreation.service';
import { Ticket } from './ticket';
import { ticketAttachment } from './ticketattachment';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { OrderDataSource } from '../../orders/orderDataSource';

@Component({
  selector: 'app-ticketcreation',
  templateUrl: './ticketcreation.component.html',
  styleUrls: ['./ticketcreation.component.css']
})
export class TicketcreationComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') input: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  public mailData: any;

  public uploader: FileUploader = new FileUploader({
    url: '',
    authTokenHeader: '',
    authToken: '',
    isHTML5: true,
  });
  displayedColumns = ['select', 'OrderNumber', 'CompanyCode', 'PONumber', 'RequiredDate', 'ForecastFinish', 'Tickets', 'StatusName'];
  dataSource: OrderDataSource;
  public listOfOrders: any[] = [];
  public currentUser: any;
  public ticket: Ticket = {
    Type: '',
    description: '',
    Status: '',
    assignedToUuid: '',
    createdByUuid: '',
    organizationUuid: '',
    salesorder: [],
    createdByUser: {},
  };
  public TicketHistory = {
    'CreatedBy': '',
    'AssignedTo': '',
    'TicketUuid': '',
    'LogDescription': '',
  };
  public TicketAttachment: ticketAttachment = {
    attachmenturl: [],
    TicketUuid: ''
  };
  public orderid: any;
  public displayAdded;
  public token;
  public success: any;
  public failure: any;
  public successmessage: any;
  public failuremessage: any;
  public selectedTableValue: any[] = [];
  public allOrders: any;
  selection = new SelectionModel(true, []);
  orgUUID: string;
  stahlsOrg: any;
  public Username: any;
  public companycode: string;
  public locationSelectedValue: string[] = [];
  public ticketSelectedValue: string[] = [];
  public statusSelectedValue: string[] = [];
  public styleOptionSelectedValue: string[] = [];
  constructor(private orderService: OrderService, private ticketCreationService: TicketCreationService,
    private config: ConfigService, private spinnerService: Ng4LoadingSpinnerService, private orderDetailService: OrderDetailService,
    private router: ActivatedRoute, private route: Router, private dailog: MatDialog) {
    this.Username = JSON.parse(sessionStorage.getItem('currentUser')).user.firstname;
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization !== null) {
      this.orgUUID = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid;
      if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization.PolypmCustomerCode !== null) {
        this.companycode = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.PolypmCustomerCode;
      }
    }
  }
  ngOnInit() {
    this.spinnerService.show();
    this.getquerydetails();
    this.getSalesOrder();
    this.currentUserDetails();
    this.getAllOrg();
    const URL = this.config.api_url + Constants.upload_file;
    this.uploader.onBeforeUploadItem = (item) => {
      item.url = URL + '';
    };
    this.uploader.authTokenHeader = 'Authorization';
    this.uploader.authToken = 'Bearer ' + this.token;
    this.uploader.onCompleteAll = () => {
      this.ticketCreationService.saveFileUrl(this.TicketAttachment).subscribe(
        data => {
          this.success = true;
          this.successmessage = 'New Ticket Created';
          this.initializeVariable();
          this.spinnerService.hide();
          this.route.navigate(['/ticket']);
        },
        error => {
          this.failure = true;
          this.failuremessage = 'New Ticket has not been Created';
          this.spinnerService.hide();
        }
      );
      this.uploader.queue.length = 0;
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.TicketAttachment.attachmenturl.push(JSON.parse(response));
    };
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;

          this.loadDataPage();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadDataPage())
      )
      .subscribe();

  }


  loadDataPage() {
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      this.dataSource.loadDatas(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.input.nativeElement.value,
        this.locationSelectedValue,
        this.ticketSelectedValue,
        this.statusSelectedValue,
        this.styleOptionSelectedValue
      );
    } else {
      this.dataSource.loadDatasByCompanyCode(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.input.nativeElement.value,
        this.locationSelectedValue,
        this.ticketSelectedValue,
        this.statusSelectedValue,
        this.styleOptionSelectedValue,
        this.companycode
      );
    }
  }
  initializeVariable() {
    this.ticket.Type = '';
    this.ticket.Status = '';
    this.ticket.salesorder = [];
    this.ticket.description = '';
    this.ticket.createdByUuid = '';
    this.ticket.assignedToUuid = '';
    this.uploader.queue.length = 0;
    this.selection.clear();
  }

  getSalesOrder() {
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      this.getAllSalesOrder();
    } else {
      this.getAllSalesOrderByCode();
    }
  }


  getAllSalesOrder() {
    this.dataSource = new OrderDataSource(this.orderService);

    this.dataSource.loadDatas(0, 25, 'OrderDate', 'desc', '', this.locationSelectedValue,
      this.ticketSelectedValue,
      this.statusSelectedValue,
      this.styleOptionSelectedValue
    );
    this.spinnerService.hide();
  }
  getAllSalesOrderByCode() {
    this.dataSource = new OrderDataSource(this.orderService);

    this.dataSource.loadDatasByCompanyCode(0, 25, 'OrderDate', 'desc', '', this.locationSelectedValue,
      this.ticketSelectedValue,
      this.statusSelectedValue,
      this.styleOptionSelectedValue,
      this.companycode);
    this.spinnerService.hide();
  }

  getAllOrg() {
    this.ticketCreationService.orgGetAll().subscribe(

      data => {
        data.forEach(element => {
          if (element.organizationname === 'Stahls') {
            this.stahlsOrg = element;
          }
        });
      },
      error => {
      }
    );

  }

  isSelected(OrderID) {
    let check = false;
    this.selectedTableValue.forEach(element => {
      if (OrderID === element.OrderID) {
        check = true;
      }
    });
    return check;
  }

  currentUserDetails() {
    const json = JSON.parse(sessionStorage.getItem('currentUser'));
    this.token = json.token;
    this.currentUser = json.user;
  }
  toggle(row) {
    let isSameValue = false;
    for (let i = 0; i < this.selectedTableValue.length; i++) {
      if (JSON.stringify(this.selectedTableValue[i]) === JSON.stringify(row)) {
        this.selectedTableValue.splice(i, 1);
        this.ticket.salesorder.splice(i, 1);
        isSameValue = true;
      }
    }
    if (!isSameValue) {
      this.selectedTableValue.push(row);
      this.ticket.salesorder.push(row);
    }
    this.addItems();
  }

  addItems() {
    if (this.selectedTableValue.length > 0) {
      this.displayAdded = true;
    }
  }

  saveTicket() {
    this.spinnerService.show();
    this.currentUserDetails();
    if (this.orgUUID !== undefined) {
      this.ticket.organizationUuid = this.orgUUID;
    } else if (this.stahlsOrg !== undefined) {
      this.ticket.organizationUuid = this.stahlsOrg.uuid;
    } else {
      this.ticket.organizationUuid = null;
    }
    this.ticket.assignedToUuid = null;
    this.ticket.createdByUuid = this.currentUser.uuid;
    this.ticket.Status = 'Open';
    this.ticket.createdByUser = this.currentUser;
    this.mailData = this.ticket;
    this.ticketCreationService.saveTicket(this.ticket).subscribe(
      data => {
        this.mailData.ticket = data;
        if (data.id !== undefined && data.id !== '' && data.id !== null) {
          this.sendCreateMessage(this.mailData);
        }
        this.getSalesOrder();
        this.ticket.Type = '';
        this.ticket.description = '';
        this.displayAdded = false;
        this.TicketAttachment.TicketUuid = data.uuid;
        this.TicketHistory.TicketUuid = data.uuid;
        this.TicketHistory.CreatedBy = this.Username;
        this.TicketHistory.LogDescription = 'Ticket has been created';
        // tslint:disable-next-line:no-shadowed-variable
        this.ticketCreationService.LogHistory(this.TicketHistory).subscribe(data => {
        }, error => {
        });
        if (data.id === undefined || data.id === '' || data.id === null) {
          this.errorDialog();
        } else {
          this.OpenDialog(data.id);
        }
        this.uploader.uploadAll();
        this.success = true;

        this.route.navigate(['/ticket']);
      },
      error => {
        this.failure = true;
        this.errorDialog();
        this.spinnerService.hide();
        this.route.navigate(['/ticket']);
      }
    );

  }


  errorDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'There is some Problem while creating the ticket, Please try after some time or contact the Administrator';
    this.dailog.open(AlertDialogComponent, dialogConfig);
  }

  OpenDialog(ticketId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'A new ticket has been created. The ticket number is : ' + ticketId + ' Please note it for your future reference ';
    this.dailog.open(AlertDialogComponent, dialogConfig);
  }

  getquerydetails() {
    this.router.queryParams.subscribe(params => {
      this.orderid = params['orderId'];
      if (this.orderid === undefined) {
        this.displayAdded = false;
      } else {
        this.orderDetailService.getOrderAndItemsById(this.orderid).subscribe(
          data => {
            this.selectedTableValue.push(data);
            this.ticket.salesorder.push(data);
            this.displayAdded = true;
          },
          error => {
          }
        );
        // this.displayAdded = true;
      }
    });
  }

  sendCreateMessage(data) {

    this.ticketCreationService.sendMail(data).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
      },
      error => {
      }
    );

  }
}
