import { Component, OnInit, ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { TicketDetailService } from './ticketdetails.service';
import { Router } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import * as JSZip from 'jszip';
import * as JSZipUtils from 'jszip-utils';
import * as FileSaver from 'file-saver';
import { FileUploader } from 'ng2-file-upload';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { ticketAttachment } from '../ticketcreation/ticketattachment';
import { MatRadioChange } from '@angular/material';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { OrderDataSource } from '../../orders/orderDataSource';
import { OrderService } from '../../orders/orders.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';


@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css']
})
export class TicketdetailsComponent implements OnInit {

  @ViewChild('closeTicket')
  closeTicketModel: ModalComponent;
  @ViewChild('addcomment')
  AddCommnetModel: ModalComponent;
  @ViewChild('Download')
  DownloadModel: ModalComponent;
  @ViewChild('TicketHistoryLog')
  TicketHistoryModel: ModalComponent;
  @ViewChild('Ordernumbers')
  Ordernumber: ModalComponent;
  @ViewChild('input') input: ElementRef;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  public ticketDetails: any;
  public listOfOrders: any;
  public orderid: any;
  public selectedTableValue: any[] = [];
  public Tickethistory = {
    'AssignedTo': '',
    'LogDescription': '',
    'TicketUuid': '',
    'CreatedBy': '',
  };
  public AssignedUsername: any;
  public CreatedByUsername: any;
  public showDetails: boolean;
  public orgUUID;
  public selectedValues = new FormControl();
  public userUUID;
  public closedMessage: any[];
  public allUser = [];
  public userToDisplay = [];
  allOrganization: any[] = [];
  myOrganization: any[] = [];
  public Reason: any[] = [];
  public Reason1: any;
  organizationname: string;
  public test: any;
  public selected: string[] = [];
  public assignedUserList: any[] = [];
  public salesorder: any;
  public ticketcount: any;
  public listofTickets: any;
  public OrderNumber: any;
  public tickettype: any;
  public tickettype1: any;
  public ticketorder = {
    'salesorder': []
  };
  public attachmenturl: any[] = [];
  public ticket = {
    'Comments': '',
    'CommentUserName': '',
    'TicketUuid': '',
  };
  public uploader: FileUploader = new FileUploader({
    url: '',
    authTokenHeader: '',
    authToken: '',
    isHTML5: true,
  });
  public token;
  public TicketAttachment: ticketAttachment = {
    attachmenturl: [],
    TicketUuid: ''
  };
  type: string[] = ['Regular'];
  type1: string[] = ['Urgent'];
  public dropdown: any;
  public startdate = new Date();
  public Username: any;
  public Useruuid: any;
  public date: any;
  public month: any;
  public year: any;
  public currentdate: any;
  public commentuser: any;
  public UsersList: any[];
  public ticketcomments: any;
  public closedate: any;
  public users: any;
  displayedColumns = ['OrderNumber', 'Location', 'PO#', 'Requested', 'Forecasted', 'Tickets', 'Status'];
  displayedColumns1 = ['Comments', 'CommentDate', 'CommentUserName'];
  displayedColumns4 = ['select', 'FileName'];
  displayedColumns2 = ['select', 'OrderNumber'];
  displayedColumns3 = ['Date', 'User', 'AssignedTo', 'LogDescription'];
  public tickethistorySource: any = [];
  public tickethistory: any;
  public dataSource: any = [];
  public CommentsSource: any = [];
  public OrdersSource: OrderDataSource;
  public ticketattachmentSource: any[];
  public closedby: any;
  companycode: any;
  currentUser: any;
  ischecked: boolean;
  testArray: any[];
  currentUserEmail: any;
  constructor(private router: Router, private ticketDetailService: TicketDetailService,
    private route: ActivatedRoute, private sharedService: SharedService,
    private config: ConfigService, private dailog: MatDialog, private router2: Router,
    private orderService: OrderService, private spinnerService: Ng4LoadingSpinnerService) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      this.Username = this.currentUser.user.firstname;
      this.Useruuid = this.currentUser.user.uuid;
      this.currentUserEmail = this.currentUser.user.email;
      if (this.currentUser.user.organization !== null) {
        this.Username = this.currentUser.user.firstname;
        this.Useruuid = this.currentUser.user.uuid;
        this.orgUUID = this.currentUser.user.organization.uuid;
        this.organizationname = this.currentUser.user.organization.organizationname;
        if (this.currentUser.user.organization.PolypmCustomerCode !== null) {
          this.companycode = this.currentUser.user.organization.PolypmCustomerCode;
        }
      }

    } else {
      sessionStorage.setItem('urlDirect', this.router2.url);
      this.router2.navigate(['']);

    }
  }

  ngOnInit() {
    this.ischecked = false;
    this.date = this.startdate.getDate();
    this.year = this.startdate.getFullYear();
    this.month = this.startdate.getMonth();
    this.currentdate = this.month + '/' + this.date + '/' + this.year;
    this.showDetails = false;
    this.spinnerService.show();
    this.getSalesOrder('OrderNumber', 'desc');
    this.currentUserDetails();
    this.getAllOrganization();
    this.getAllOrganizationUser();
    this.getclosereason();
    this.getQueryDetails();
    const URL = this.config.api_url + Constants.upload_file;
    this.uploader.onBeforeUploadItem = (item) => {
      item.url = URL + '';
    };
    this.uploader.authTokenHeader = 'Authorization';
    this.uploader.authToken = 'Bearer ' + this.token;
    this.uploader.onCompleteAll = () => {
      this.ticketDetailService.saveFileUrl(this.TicketAttachment).subscribe(
        data => {
        },
        error => {
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

    this.sort.toArray()[2].sortChange.subscribe(() => this.paginator.toArray()[this.paginator.length - 1].pageIndex = 0);

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.toArray()[this.paginator.length - 1].pageIndex = 0;

          this.loadDataPage();
        })
      )
      .subscribe();

    merge(this.sort.toArray()[2].sortChange, this.paginator.toArray()[this.paginator.length - 1].page)
      .pipe(
        tap(() => this.loadDataPage())
      )
      .subscribe();

  }


  loadDataPage() {
    let sortLabel, sortDirection;
    if (this.sort.toArray()[2].active === undefined) {
      sortLabel = 'OrderNumber';
    } else {
      sortLabel = this.sort.toArray()[2].active;
    }
    if (this.sort.toArray()[2].direction === undefined) {
      sortDirection = 'desc';
    } else {
      sortDirection = this.sort.toArray()[2].direction;
    }
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      this.OrdersSource.loadDatas(
        this.paginator.toArray()[this.paginator.length - 1].pageIndex,
        this.paginator.toArray()[this.paginator.length - 1].pageSize,
        sortLabel,
        sortDirection,
        this.input.nativeElement.value, [], [], [], []
      );
    } else {
      this.OrdersSource.loadDatasByCompanyCode(
        this.paginator.toArray()[this.paginator.length - 1].pageIndex,
        this.paginator.toArray()[this.paginator.length - 1].pageSize,
        sortLabel,
        sortDirection,
        this.input.nativeElement.value, [], [], [], [],
        this.companycode
      );
    }
  }
  getSalesOrder(label, direction) {
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      this.getAllSalesOrder(label, direction);
    } else {
      this.getAllSalesOrderByCode();
    }
  }


  getAllSalesOrder(label, direction) {
    this.OrdersSource = new OrderDataSource(this.orderService);

    this.OrdersSource.loadDatas(0, 10, label, direction, '', [], [], [], []);
    this.spinnerService.hide();
  }
  getAllSalesOrderByCode() {
    this.OrdersSource = new OrderDataSource(this.orderService);

    this.OrdersSource.loadDatasByCompanyCode(0, 10, 'OrderNumber', 'desc', '', [], [], [], [],
      this.companycode);
    this.spinnerService.hide();
  }


  currentUserDetails() {
    const json = this.currentUser;
    if (json != null) {
      this.token = json.token;
    }
  }
  Showdetails() {
    this.paginator.toArray()[this.paginator.length - 1].pageIndex = 0;
    if (this.sort.toArray()[2].active !== undefined && this.sort.toArray()[2].direction !== undefined) {
      this.getSalesOrder(this.sort.toArray()[2].active, this.sort.toArray()[2].direction);
    } else {
      this.getSalesOrder('OrderNumber', 'desc');
    }
    this.Ordernumber.open();
  }
  Hidedetails() {
    this.Ordernumber.close();
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
  toggle(row) {
    let isSameValue = false;
    for (let i = 0; i < this.selectedTableValue.length; i++) {
      if (JSON.stringify(this.selectedTableValue[i]) === JSON.stringify(row)) {
        this.selectedTableValue.splice(i, 1);
        isSameValue = true;
      }
    }
    if (!isSameValue) {
      this.selectedTableValue.push(row);
    }
  }

  AddOrder() {
    const dataToUpdate = this.ticketDetails;
    const orderNumberList = [];
    this.selectedTableValue.forEach(element => {
      if (element.Tickets === 0) {
        element.Tickets = 1;
      } else {
        element.Tickets = element.Tickets + 1;
      }
      dataToUpdate.salesorder.push(element);
      orderNumberList.push(element.OrderNumber);
    });
    this.AssignedUsername = [];
    this.ticketDetails.assigned_to.forEach(element => {
      this.AssignedUsername.push(element.username);
    });
    this.CreatedByUsername = this.Username;
    this.Tickethistory.TicketUuid = this.ticketDetails.uuid;
    this.Tickethistory.AssignedTo = this.AssignedUsername.toString();
    this.Tickethistory.CreatedBy = this.Username;
    this.Tickethistory.LogDescription = 'An Order has been Added';
    this.ticketDetailService.LogHistory(this.Tickethistory).subscribe(data => {
    }, error => {
    });
    this.ticketDetailService.update_Ticket(dataToUpdate).subscribe(data => {
      this.router.navigate(['/ticket']);
      dataToUpdate.orderNumberList = orderNumberList;
      dataToUpdate.Status = '';
      dataToUpdate.currentUser = this.Username;
    }, error => {
    });
  }

  getAllOrganizationUser() {
    this.ticketDetailService.getAllUser().subscribe(

      data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].Authorities.length !== 0) {
            if (data[i].Authorities[0].role !== 'ADMIN') {
              this.allUser.push(data[i]);
            }
          }
        }
      },
      error => {
      }
    );
  }

  getAllOrganization() {

    if (this.organizationname === 'Stahls') {

      this.ticketDetailService.orgGetAll().subscribe(

        data => {
          this.allOrganization = data;
        },
        error => {
        }
      );

    }
    if (this.organizationname === undefined) {
      this.ticketDetailService.orgGetAll().subscribe(

        data => {
          this.myOrganization = data;
        },
        error => {
        }
      );
    } else {
      this.allOrganization = ['Stahls', this.organizationname];
      this.ticketDetailService.orgGetAll().subscribe(

        data => {
          data.forEach(element => {
            if (element.organizationname === 'Stahls') {
              this.myOrganization.push(element);
            }
            if (element.organizationname === this.organizationname) {
              this.myOrganization.push(element);
            }

          });
        },
        error => {
        }
      );
    }
  }

  getQueryDetails() {

    this.route.queryParams.subscribe(params => {
      const uuid = params['uuid'];
      this.getTicketByUuid(uuid);
      this.getAllCommentByTicketId(uuid);
      this.ViewTicketHistory(uuid);
    });
  }

  filterOrg(data) {
    this.userToDisplay = [];
    for (let i = 0; i < this.allUser.length; i++) {
      if (this.allUser[i].organization !== null && this.allUser[i].organization !== '') {
        if (this.allUser[i].organization.uuid === data.uuid) {
          this.userToDisplay.push(this.allUser[i]);
        }
      }
    }

  }


  saveAssignedUserTicket() {
    const Object = {
      ticketUuid: this.ticketDetails.uuid,
      assignedUsers: this.selectedValues.value
    };
    this.ticketDetailService.createAssignedUserTicket(Object).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
        this.selected = [];
        this.ticketDetails.Status = 'Assigned';
        this.AssignedUsername = [];
        this.selectedValues.value.forEach(element => {
          this.AssignedUsername.push(element.username);
        });
        this.CreatedByUsername = this.Username;
        this.Tickethistory.TicketUuid = this.ticketDetails.uuid;
        this.Tickethistory.AssignedTo = this.AssignedUsername.toString();
        this.Tickethistory.CreatedBy = this.Username;
        this.Tickethistory.LogDescription = 'Ticket has been assigned';
        // tslint:disable-next-line:no-shadowed-variable
        this.ticketDetailService.LogHistory(this.Tickethistory).subscribe(data => {
        }, error => {
        });
        this.ticketDetailService.update_Ticket(this.ticketDetails).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            this.sendMessage();
            this.router.navigate(['/ticket']);
          },
          error => {
          }
        );
      },
      error => {
      }
    );
  }

  sendMessage() {

    this.ticketDetailService.getTicketByUuid(this.ticketDetails.uuid).subscribe(
      data => {
        this.ticketDetails = data;
        const sendAssignedDetails = {
          Status: 'Assigned',
          comments: '',
          userId: this.Useruuid,
          firstname: this.ticketDetails.created_by.firstname,
          assigned_to: this.ticketDetails.assigned_to,
          id: this.ticketDetails.id,
          uuid: this.ticketDetails.uuid,
          description: this.ticketDetails.description,
          salesorder: '',
          emailDetails: [],
          currentUser: this.Username
        };
        if (this.ticketDetails.salesorder.length > 0) {
          sendAssignedDetails.salesorder = this.ticketDetails.salesorder;
        }
        if (this.ticketDetails.created_by != null) {
          sendAssignedDetails.emailDetails.push(this.ticketDetails.created_by.email);
        }
        if (this.ticketDetails.assigned_to.length > 0) {
          this.ticketDetails.assigned_to.forEach(element => {
            sendAssignedDetails.emailDetails.push(element.email);
          });
        }
        if (sendAssignedDetails.emailDetails.indexOf(this.currentUserEmail) > -1) {
          sendAssignedDetails.emailDetails.splice(sendAssignedDetails.emailDetails.indexOf(this.currentUserEmail), 1);
        }
        this.ticketDetailService.sendMail(sendAssignedDetails).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
          });
      },
      error => {
      }
    );

  }

  getTicketByUuid(uuid) {
    this.ticketcount = 0;
    this.ticketDetailService.getTicketByUuid(uuid).subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data.salesorder);
        this.dataSource.sort = this.sort.toArray()[1];
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'Number': return item.OrderNumber;
            case 'Location': return item.CompanyCode.toLowerCase();
            case 'PO#': return item.PONumber;
            case 'Date': return item.OrderDate;
            case 'Requested': return item.RequiredDate;
            case 'Forecasted': return item.ForecastFinish;
            case 'Tickets': return item.Tickets;
            case 'Status': return item.StatusName.toLowerCase();
            default: return item[property];
          }
        };
        this.ticketDetails = data;
        this.listofTickets = data;
        if (this.ticketDetails.Type === 'Regular') {
          this.tickettype = true;
        }
        if (this.ticketDetails.Type === 'Urgent') {
          this.tickettype1 = true;
        }
        this.salesorder = this.ticketDetails.salesorder;
        this.getAllUploadFile();
      }, error => {
      }
    );
  }

  getAllUploadFile() {
    if (this.ticketDetails.uuid !== undefined) {
      this.ticketDetailService.getAttachementbyTicketid(this.ticketDetails.uuid).subscribe(data => {
        if (data === null) {
          this.ticketDetails.attachments.length = 0;
        }
        this.ticketattachmentSource = data;
      }, error => {
      });
    }
  }

  /* Ticket Histroy */

  ViewTicketHistory(uuid) {
    this.ticketDetailService.getHistory(uuid).subscribe(data => {
      this.tickethistory = data;
      this.tickethistorySource = new MatTableDataSource(this.tickethistory);
      this.tickethistory.forEach(element => {
        if (element.LogDescription.includes('Closed:')) {
          this.closedby = element.CreatedBy;
          this.closedate = element.Date;
        }
      });
      this.spinnerService.hide();
    }, error => {
      this.spinnerService.hide();
    });

  }
  SelectedAttachment(attachmentid) {
    let isSameValue = false;
    for (let i = 0; i < this.attachmenturl.length; i++) {
      if (JSON.stringify(this.attachmenturl[i]) === JSON.stringify(attachmentid)) {
        this.attachmenturl.splice(i, 1);
        isSameValue = true;
      }
    }
    if (!isSameValue) {
      this.attachmenturl.push(attachmentid);
    }

  }
  // zipped one or more than one files and downloaded using JSZip
  download() {
    this.ischecked = false;
    const zip = new JSZip();
    let count = 0;
    const nombre = 'newFile';
    const name = nombre + '.zip';
    this.attachmenturl.forEach(element => {
      const img = zip.folder('Data');
      const ticketLength = this.attachmenturl.length;
      this.DownloadModel.close();
      const fullUrl = this.sharedService.baseUrl + '/' + element.attachmenturl;
      const filename = element.filename;
      JSZipUtils.getBinaryContent(fullUrl, function (err, data) {
        if (err) {
          console.log(err);
        }
        img.file(filename, data, { binary: true });
        count++;
        if (count === ticketLength) {
          zip.generateAsync({ type: 'blob' }).then(function (content) {
            FileSaver.saveAs(content, name);
          });
        }
      });
    });
  }
  DeleteAttachment() {
    let count = 0;
    this.attachmenturl.forEach(element => {
      count++;
      this.ticketDetailService.DeleteAttachementbyid(element.uuid).subscribe(data => {
        if (count === this.attachmenturl.length) {
          this.attachmenturl = [];
          const sendDeleteDetails = {
            status: '',
            comments: '',
            userId: this.Useruuid,
            email: this.ticketDetails.created_by.email,
            firstname: this.ticketDetails.created_by.firstname,
            assigned_to: this.ticketDetails.assigned_to,
            id: this.ticketDetails.id,
            uuid: this.ticketDetails.uuid,
            description: this.ticketDetails.description,
            salesorder: '',
            createdUserEmail: '',
            currentUser: this.Username,
            emailDetails: [],
            LogDescription: 'File has been Deleted'
          };
          if (this.ticketDetails.salesorder.length > 0) {
            sendDeleteDetails.salesorder = this.ticketDetails.salesorder;
          }
          if (this.ticketDetails.created_by != null) {
            sendDeleteDetails.emailDetails.push(this.ticketDetails.created_by.email);
          }
          if (this.ticketDetails.assigned_to.length > 0) {
            this.ticketDetails.assigned_to.forEach(assignedUser => {
              sendDeleteDetails.emailDetails.push(assignedUser.email);
            });
          }
          if (sendDeleteDetails.emailDetails.indexOf(this.currentUserEmail) > -1) {
            sendDeleteDetails.emailDetails.splice(sendDeleteDetails.emailDetails.indexOf(this.currentUserEmail), 1);
          }
          this.sendMailMessage(sendDeleteDetails);
        }
        this.DownloadModel.close();
        this.getAllUploadFile();
      }, error => {
        this.DownloadModel.close();
      });
    });


  }



  openCloseTicketModal() {
    this.closeTicketModel.open();
  }
  openDownloadAttachmentModal() {
    this.DownloadModel.open();
  }

  getclosereason() {
    this.ticketDetailService.getReason().subscribe(data1 => {
      this.Reason = data1;

    }, error => { });

  }
  fileupload() {
    const dataToUpdate = this.ticketDetails;
    this.TicketAttachment.TicketUuid = this.ticketDetails.uuid;
    dataToUpdate.attachments = this.TicketAttachment;
    dataToUpdate.Type = this.selected;
    if (this.TicketAttachment.attachmenturl !== 0) {
      this.Tickethistory.LogDescription = 'File has been Uploaded';
    }
    if (this.selected.length !== 0) {
      this.Tickethistory.LogDescription = 'Priority has been Changed';
    }
    this.ticketDetailService.update_Ticket(dataToUpdate).subscribe(data => {
      this.AssignedUsername = [];
      this.ticketDetails.assigned_to.forEach(element => {
        this.AssignedUsername.push(element.username);
      });
      this.CreatedByUsername = this.Username;
      this.Tickethistory.TicketUuid = this.ticketDetails.uuid;
      this.Tickethistory.CreatedBy = this.Username;

      const sendDetails = {
        Status: '',
        comments: '',
        userId: this.Useruuid,
        email: this.ticketDetails.created_by.email,
        firstname: this.ticketDetails.created_by.firstname,
        id: this.ticketDetails.id,
        uuid: this.ticketDetails.uuid,
        Type: this.ticketDetails.Type,
        description: this.ticketDetails.description,
        LogDescription: this.Tickethistory.LogDescription,
        salesorder: '',
        emailDetails: [],
        currentUser: this.Username
      };
      if (this.ticketDetails.salesorder.length > 0) {
        sendDetails.salesorder = this.ticketDetails.salesorder;
      }
      if (this.ticketDetails.created_by != null) {
        sendDetails.emailDetails.push(this.ticketDetails.created_by.email);
      }
      if (this.ticketDetails.assigned_to.length > 0) {
        this.ticketDetails.assigned_to.forEach(element => {
          sendDetails.emailDetails.push(element.email);
        });
      }
      if (sendDetails.emailDetails.indexOf(this.currentUserEmail) > -1) {
        sendDetails.emailDetails.splice(sendDetails.emailDetails.indexOf(this.currentUserEmail), 1);
      }
      this.sendMailMessage(sendDetails);
      // tslint:disable-next-line:no-shadowed-variable
      this.ticketDetailService.LogHistory(this.Tickethistory).subscribe(data => {
      }, error => {
      });
      this.uploader.uploadAll();
      this.OpenDialog();
      this.router.navigate(['/ticket']);
    }, error => {
    });
  }
  closeTicketOption() {
    const dataToUpdate = this.ticketDetails;
    dataToUpdate.closingRemarks = this.closedMessage;
    dataToUpdate.CloseReasonUuid = dataToUpdate.closingRemarks.uuid;
    dataToUpdate.Status = 'Closed';
    this.ticketDetailService.update_Ticket(dataToUpdate).subscribe(
      data => {
        this.test = data;
        this.AssignedUsername = [];
        this.ticketDetails.assigned_to.forEach(element => {
          this.AssignedUsername.push(element.username);
        });
        this.CreatedByUsername = this.Username;
        this.Tickethistory.AssignedTo = this.AssignedUsername.toString();
        this.Tickethistory.TicketUuid = this.ticketDetails.uuid;
        this.Tickethistory.CreatedBy = this.Username;
        this.Tickethistory.LogDescription = 'Closed:' + dataToUpdate.closingRemarks.Reason;
        // tslint:disable-next-line:no-shadowed-variable
        this.ticketDetailService.LogHistory(this.Tickethistory).subscribe(data => {
        }, error => {
        });
        const sendDetails = {
          Status: 'Closed',
          comments: '',
          userId: this.Useruuid,
          assigned_to: this.ticketDetails.assigned_to,
          Reason: dataToUpdate.closingRemarks.Reason,
          firstname: this.ticketDetails.created_by.firstname,
          id: this.ticketDetails.id,
          uuid: this.ticketDetails.uuid,
          description: this.ticketDetails.description,
          salesorder: '',
          emailDetails: [],
          currentUser: this.Username
        };
        if (this.ticketDetails.salesorder.length > 0) {
          sendDetails.salesorder = this.ticketDetails.salesorder;
        }
        if (this.ticketDetails.created_by != null) {
          sendDetails.emailDetails.push(this.ticketDetails.created_by.email);
        }
        if (this.ticketDetails.assigned_to.length > 0) {
          this.ticketDetails.assigned_to.forEach(element => {
            sendDetails.emailDetails.push(element.email);
          });
        }
        if (sendDetails.emailDetails.indexOf(this.currentUserEmail) > -1) {
          sendDetails.emailDetails.splice(sendDetails.emailDetails.indexOf(this.currentUserEmail), 1);
        }
        this.sendMailMessage(sendDetails);
        this.closeTicketModel.close();
        this.router.navigate(['/ticket']);
      },
      error => {
      }
    );
  }

  OpenDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'Your Ticket has been Updated';
    this.dailog.open(AlertDialogComponent, dialogConfig);
  }

  sendMailMessage(data) {

    this.ticketDetailService.sendMail(data).subscribe(
      // tslint:disable-next-line:no-shadowed-variable
      data => {
      },
      error => {
      }
    );

  }
  tickettypechange(event: MatRadioChange) {
    this.selected = event.value[0];
  }
  selectmodel() {
    this.dropdown = !this.dropdown;
  }

  Addcomment() {
    this.ticket.Comments = '';
    this.AddCommnetModel.open();
  }
  ViewHistory() {
    this.TicketHistoryModel.open();
  }
  cancelcomment() {
    this.AddCommnetModel.close();
  }
  CloseTicketHistory() {
    this.TicketHistoryModel.close();
  }
  Reopenticket() {
    const dataToUpdate = this.ticketDetails;
    dataToUpdate.assigned_to = [];
    dataToUpdate.Status = 'Reopen';
    this.ticketDetailService.Reopen_ticket(dataToUpdate).subscribe(
      data => {
        this.test = data;
        this.AssignedUsername = [];
        this.CreatedByUsername = this.Username;
        this.Tickethistory.TicketUuid = this.ticketDetails.uuid;
        this.Tickethistory.CreatedBy = this.Username;
        this.Tickethistory.LogDescription = 'Ticket has been Reopened';
        // tslint:disable-next-line:no-shadowed-variable
        this.ticketDetailService.LogHistory(this.Tickethistory).subscribe(data => {
        }, error => {
        });
        const sendReopenDetails = {
          Status: 'Reopen',
          comments: this.ticket.Comments,
          userId: this.Useruuid,
          firstname: this.ticketDetails.created_by.firstname,
          assigned_to: this.ticketDetails.assigned_to,
          id: this.ticketDetails.id,
          uuid: this.ticketDetails.uuid,
          description: this.ticketDetails.description,
          salesorder: '',
          emailDetails: [],
          currentUser: this.Username
        };
        if (this.ticketDetails.salesorder.length > 0) {
          sendReopenDetails.salesorder = this.ticketDetails.salesorder;
        }
        if (this.ticketDetails.created_by != null) {
          sendReopenDetails.emailDetails.push(this.ticketDetails.created_by.email);
        }
        if (this.ticketDetails.assigned_to.length > 0) {
          this.ticketDetails.assigned_to.forEach(element => {
            sendReopenDetails.emailDetails.push(element.email);
          });
        }
        if (sendReopenDetails.emailDetails.indexOf(this.currentUserEmail) > -1) {
          sendReopenDetails.emailDetails.splice(sendReopenDetails.emailDetails.indexOf(this.currentUserEmail), 1);
        }
        this.sendMailMessage(sendReopenDetails);
        this.router.navigate(['/ticket']);
      },
      error => {
      }
    );

  }
  closecomment() {
    this.ticket.CommentUserName = this.Username;
    this.ticket.TicketUuid = this.ticketDetails.uuid;
    const sendCommentDetails = {
      Status: '',
      comments: this.ticket.Comments,
      userId: this.Useruuid,
      email: this.ticketDetails.created_by.email,
      firstname: this.ticketDetails.created_by.firstname,
      assigned_to: this.ticketDetails.assigned_to,
      id: this.ticketDetails.id,
      uuid: this.ticketDetails.uuid,
      description: this.ticketDetails.description,
      salesorder: '',
      emailDetails: [],
      currentUser: this.Username
    };
    if (this.ticketDetails.salesorder.length > 0) {
      sendCommentDetails.salesorder = this.ticketDetails.salesorder;
    }
    if (this.ticketDetails.created_by != null) {
      sendCommentDetails.emailDetails.push(this.ticketDetails.created_by.email);
    }
    if (this.ticketDetails.assigned_to.length > 0) {
      this.ticketDetails.assigned_to.forEach(element => {
        sendCommentDetails.emailDetails.push(element.email);
      });
    }
    if (sendCommentDetails.emailDetails.indexOf(this.currentUserEmail) > -1) {
      sendCommentDetails.emailDetails.splice(sendCommentDetails.emailDetails.indexOf(this.currentUserEmail), 1);
    }
    this.ticketDetailService.createcomments(this.ticket).subscribe(data => {
      this.test = data;
      this.AddCommnetModel.close();
      this.sendMailMessage(sendCommentDetails);
      this.getAllCommentByTicketId(this.ticketDetails.uuid);
    }, error => {
    });
  }
  getAllCommentByTicketId(ticketId) {
    this.ticketDetailService.getCommentsByTicketID(ticketId).subscribe(data => {
      if (data === 'There is no Comments') {
        this.ticketcomments = 0;
        this.CommentsSource = new MatTableDataSource([]);
      } else {
        this.CommentsSource = new MatTableDataSource(data);
        this.CommentsSource.paginator = this.paginator.toArray()[this.paginator.length - 2];
        this.CommentsSource.sort = this.sort.toArray()[0];
        this.ticketcomments = 1;
      }
    }, error => {
    });

  }

  unCheckDownload(uuid) {
    let check = false;
    this.attachmenturl.forEach(element => {
      if (element.uuid === uuid) {
        check = true;
      }
    });
    return check;
  }
}
