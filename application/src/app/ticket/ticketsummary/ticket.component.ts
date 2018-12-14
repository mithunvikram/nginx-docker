import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ITickets } from './ITickets';
import { MatPaginator, MatSort, MatDialog } from '@angular/material';
import { TicketService } from './ticket.service';
import { FormControl } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { TicketDataSource } from './TicketDataSource';
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit, AfterViewInit {

  public filter_ticketCreated_By: any = [];
  public filter_ticketAssigned_To: any = [];
  public filter_ticketStatus: any = [];
  public filter_ticketOrganization: any = [];
  public filterArr: any[];
  selectfilter = new FormControl();
  // tslint:disable-next-line:member-ordering
  public name: any[];
  // tslint:disable-next-line:member-ordering
  public failure: any;
  // tslint:disable-next-line:member-ordering
  public successmessage: any;
  // tslint:disable-next-line:member-ordering
  public failuremessage: any;
  public orgUUID;
  organizationname: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  public ITickets: ITickets = {
    'id': 0,
    'Date': '',
    'Order_number': 0,
    'Created_By': '',
    'Assigned_To': '',
    'Type': '',
    'Status': ''
  };
  public Search: any = {
    'PONumber': '',
    'orderNumber': '',
    'createDate': '',
    'createdName': '',
    'assignedName': '',
    'comments': ''
  };
  public searchtext: any;
  displayedColumns = ['Id', 'PONumber', 'Date', 'Order_number', 'Created_By', 'organization', 'Assigned_To', 'Type', 'Status'];
  dataSource: TicketDataSource;

  filterdata: any = [];
  isClearFilter: boolean;
  pageNo: number;
  organizationSelectedValue: string[] = [];
  createdBySelectedValue: string[] = [];
  assignedToSelectedValue: string[] = [];
  statusSelectedValue: string[] = [];
  public showArrayObject: any[] = [];
  public filter: any = {};
  constructor(private spinnerService: Ng4LoadingSpinnerService,
    private ticketService: TicketService, private router: Router, private dialog: MatDialog) {
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization !== null) {
      this.orgUUID = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid;
      this.organizationname = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.organizationname;
    }
  }


  ngOnInit() {
    this.spinnerService.show();
    this.pageNo = 1;
    // this.dataSource
    if ((this.organizationname === 'Stahls' || this.organizationname === undefined)) {
      this.getAllTickets();
    } else {
      this.getTicketByOrgId();
    }
  }

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
    if (Object.keys(this.Search).filter(x => this.Search[x] !== '').length !== 0) {
      this.searchFilter();
    } else if ((this.organizationname === 'Stahls' || this.organizationname === undefined)) {
      this.pageNo = this.paginator.pageIndex + 1;
      this.dataSource.loadDatas(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.input.nativeElement.value,
        this.createdBySelectedValue,
        this.assignedToSelectedValue,
        this.statusSelectedValue,
        this.organizationSelectedValue
      );
    } else {
      this.pageNo = this.paginator.pageIndex + 1;
      this.dataSource.loadDatasByCompanyCode(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.input.nativeElement.value,
        this.createdBySelectedValue,
        this.assignedToSelectedValue,
        this.statusSelectedValue,
        this.orgUUID
      );
    }
  }


  getAllTickets() {
    this.dataSource = new TicketDataSource(this.ticketService, this.dialog);

    this.dataSource.loadDatas(0, 25, 'date', 'desc', '',
      this.createdBySelectedValue, this.assignedToSelectedValue,
      this.statusSelectedValue, this.organizationSelectedValue);
    this.getFilterValues();
  }

  getTicketByOrgId() {
    this.dataSource = new TicketDataSource(this.ticketService, this.dialog);

    this.dataSource.loadDatasByCompanyCode(0, 25, 'date', 'desc', '',
      this.createdBySelectedValue, this.assignedToSelectedValue,
      this.statusSelectedValue, this.orgUUID);
    this.getFilterValueByOrgId();
  }

  getFilterValues() {
    this.ticketService.getFilterValue().subscribe(
      data => {
        this.filter = data;
        this.spinnerService.hide();
      },
      error => {
        this.spinnerService.hide();
      }
    );
  }

  getFilterValueByOrgId() {
    this.ticketService.getFilterValueByOrgId(this.orgUUID).subscribe(
      data => {
        this.spinnerService.hide();
        this.filter = data;
      },
      error => {
        this.spinnerService.hide();
      }
    );
  }

  organizationFilter() {
    this.organizationSelectedValue = this.selectfilter.value;
    this.paginator.pageIndex = 0;
    this.loadDataPage();
  }
  createByFilter() {
    this.createdBySelectedValue = this.selectfilter.value;
    this.paginator.pageIndex = 0;
    this.loadDataPage();
  }
  assignedToFilter() {
    this.assignedToSelectedValue = this.selectfilter.value;
    this.paginator.pageIndex = 0;
    this.loadDataPage();

  }
  statusFilter() {
    this.statusSelectedValue = this.selectfilter.value;
    this.paginator.pageIndex = 0;
    this.loadDataPage();
  }

  onRowSelected(row) {
    this.router.navigate(['/ticketdetails'], { queryParams: { uuid: row.uuid } });
  }
  searchmodel() {
    this.dataSource.searchCondition = !this.dataSource.searchCondition;
    if (Object.keys(this.Search).filter(x => this.Search[x] !== '').length === 0) {
      this.isClearFilter = true;
    } else {
      this.isClearFilter = false;
    }
  }

  cancelFilter() {
    this.dataSource.searchCondition = false;
  }
  clearFilterValue() {
    this.Search = {
      'PONumber': '',
      'orderNumber': '',
      'createDate': '',
      'createdName': '',
      'assignedName': '',
      'comments': '',
    };
    this.paginator.pageIndex = 0;
    this.loadDataPage();
  }

  searchFilter() {
    if (Object.keys(this.Search).filter(x => this.Search[x] !== '').length === 0) {
      this.loadDataPage();
    } else {
      if ((this.organizationname === 'Stahls' || this.organizationname === undefined)) {

        this.dataSource.getSearchResult(this.paginator.pageIndex,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction, this.organizationSelectedValue,
          this.createdBySelectedValue,
          this.assignedToSelectedValue,
          this.statusSelectedValue,
          this.Search);
      } else {
        this.dataSource.getSearchResultByOrgId(this.paginator.pageIndex,
          this.paginator.pageSize,
          this.sort.active,
          this.sort.direction, this.organizationSelectedValue,
          this.createdBySelectedValue,
          this.assignedToSelectedValue,
          this.statusSelectedValue, this.Search, this.orgUUID);
      }
    }
  }

}
