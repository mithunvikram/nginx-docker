import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, AfterViewInit } from '@angular/core';

import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IInvoices } from './Iinvoices';
import { InvoiceService } from './invoice.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';

import { InvoiceDataSource } from './invoiceDataSource';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
  animations: [
    trigger('detailExpand', [
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InvoiceComponent implements OnInit, AfterViewInit {
  public filter_invoiceItems: any = [];
  public filter_invoiceStatus: any = [];
  public filterArr: any[];
  filterItems = new FormControl();
  filterStatus = new FormControl();
  public listOfInvoices: IInvoices[] = [];
  public status = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  public IInvoices: IInvoices = {
    uuid: '',
    date: '',
    status: '',
    items: 0,
    orderId: '',
    total: 0,
    SalesOrder: [],
    InvoiceDetails: []
  };
  public itemSelectedValue: string[] = [];
  public statusSelectedValue: string[] = [];
  filterValue: any;
  ItemsValue: any[] = [];
  dataSource: InvoiceDataSource;
  filterdata: any = [];
  companycode: string;
  pageNo: number;
  dialogConfig :any;
  public organizationDetails : any;
  displayedColumns = ['InvoiceNumber', 'InvoiceDate', 'OrderID', 'Items', 'TotalPrice', 'StatusName'];
  itemArrays: string[] = [];
  statusArrays: string[] = [];
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');

  constructor(private invoiceService: InvoiceService, private spinnerService: Ng4LoadingSpinnerService, private dailog: MatDialog) { }

  ngOnInit() {
    this.spinnerService.show();
    this.pageNo = 1;
    this.intializeCurrentUser();
  }





  loadDataPage() {

    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      this.pageNo = this.paginator.pageIndex + 1;
      this.dataSource.loadDatas(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.input.nativeElement.value,
        this.itemSelectedValue,
        this.statusSelectedValue
      );
    } else {
      this.pageNo = this.paginator.pageIndex + 1;
      this.dataSource.loadDatasByCompanyCode(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.input.nativeElement.value,
        this.itemSelectedValue,
        this.statusSelectedValue,
        this.companycode
      );
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





  intializeCurrentUser() {
    this.organizationDetails = JSON.parse(sessionStorage.getItem('currentUser')).user.organization;
    if ( this.organizationDetails !== null) {
      if ( this.organizationDetails.PolypmCustomerCode !== null && this.organizationDetails.PolypmCustomerCode !== 'STAHLS') {
        this.companycode =  this.organizationDetails.PolypmCustomerCode;
        this.getAllInvoicesByCode();
      } else {
        this.getAllInvoices();
      }
    } else {
      this.getAllInvoices();
    }
  }

  getAllInvoices() {
    this.dataSource = new InvoiceDataSource(this.invoiceService, this.dailog);

    this.dataSource.loadDatas(0, 25, 'InvoiceNumber', 'desc', '', this.itemSelectedValue,
      this.statusSelectedValue
    );
    this.getFilterValue();

  }

  getFilterValue() {
    this.invoiceService.getFilterValue().subscribe(
      data => {
        this.filterValue = data;
        this.ItemsValue = Array.from(new Set(this.filterValue.item.map((itemArray) => itemArray.count)));
        this.spinnerService.hide();
      },
      error => {
        this.spinnerService.hide();
      }
    );
  }




  getAllInvoicesByCode() {
    this.dataSource = new InvoiceDataSource(this.invoiceService, this.dailog);

    this.dataSource.loadDatasByCompanyCode(0, 25, 'InvoiceNumber', 'desc', '',
      this.itemSelectedValue,
      this.statusSelectedValue, this.companycode);
    this.getFilterValueByCompanyCode();
  }

  getFilterValueByCompanyCode() {
    this.invoiceService.getFilterValueByCompanyCode(this.companycode).subscribe(
      customerCodeData => {
        this.filterValue = customerCodeData;
        this.ItemsValue = Array.from(new Set(this.filterValue.item.map((itemArray) => itemArray.count)));
        this.spinnerService.hide();
      },
      customerCodeError => {
        this.spinnerService.hide();
      }
    );
  }

  ItemsFilter() {
    this.itemSelectedValue = [];
    this.paginator.pageIndex = 0;
    this.filterItems.value.forEach(countValue => {
      this.filterValue.item.forEach(item => {
        if (item.count === countValue) {
          this.itemSelectedValue.push(item.ShipmentID);
        }
      });
    });
    this.loadDataPage();
  }

  StatusFilter() {
    this.statusSelectedValue = [];
    this.paginator.pageIndex = 0;
    this.statusSelectedValue = this.filterStatus.value;
    this.loadDataPage();
  }



  OpenDialog() {
     this.dialogConfig = new MatDialogConfig();
     this.dialogConfig.disableClose = true;
     this.dialogConfig.autoFocus = true;
     this.dialogConfig.width = '35%';
     this.dialogConfig.position = {
      bottom: '18%',
    };
    this.dialogConfig.direction = 'rtl';
    this.dialogConfig.data = ' No Data in Invoice';
    this.dailog.open(AlertDialogComponent, this.dialogConfig);
  }

}
