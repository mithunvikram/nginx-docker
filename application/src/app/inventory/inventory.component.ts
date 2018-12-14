import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig, MatRadioChange } from '@angular/material';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Inventory } from './Inventory';
import { InventoryService } from './inventory.service';
import { ApiService } from '../config/api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'rxjs/add/observable/of';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { DatePipe } from '@angular/common';
import { inventoryDataSource } from './inventoryDataSource';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';


@Component({
  selector: 'app-orders',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  animations: [
    trigger('detailExpand', [
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class InventoryComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  @ViewChild('ExportCSV')
  ExportcsvModal: ModalComponent;

  public selectfilter = new FormControl();
  public selectexport = new FormControl();
  public listOfInventory: Inventory[] = [];
  public filter_listOfInventorycolor: any[] = [];
  public filter_listOfInventorysize: any[] = [];
  public filter_listOfInventorystyle: any[] = [];
  public filterArr: any[];
  public inventory: any;
  public inventoryitemrecord: any;
  public filterdata: any[] = [];
  public styleSelectedValue: string[] = [];
  public colorSelectedValue: string[] = [];
  public sizeSelectedValues: string[] = [];
  public codeSelectedValues: string[] = [];
  public stylevalue: any;
  public colorvalue: any;
  public sizevalue: any;
  public Stylenumber: any;
  public companycode: any;
  public dateRange = {
    'startdate': '',
    'enddate': ''
  };
  public pullRight: boolean;
  public pullRightCode: boolean;
  public dataSource: inventoryDataSource;
  public count;
  public filterValue: any;
  public exportValue: string;
  public exportOption: string[] = ['Inventory', 'Inventory Transaction'];
  public spinnerlogo: boolean;

  pageNo: number;

  filterLocation = new FormControl();
  filterStyle = new FormControl();
  filterColor = new FormControl();
  filterSize = new FormControl();

  displayedColumns = ['StyleNumber', 'StyleColor', 'GarmentSize',
    'StyleOption', 'StyleName', 'QuantityOnHand', 'QuantityAllocated', 'AdjustedQuantityOnHand', 'QuantitySeconds', 'QuantityThirds'];
  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  constructor(public inventoryService: InventoryService, private apiService: ApiService,
    private router: Router, private spinnerService: Ng4LoadingSpinnerService, public dialog: MatDialog, private datePipe: DatePipe) {
    if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization !== null) {
      if (JSON.parse(sessionStorage.getItem('currentUser')).user.organization.PolypmCustomerCode !== null) {
        this.pullRight = true;
        this.pullRightCode = false;
        this.companycode = JSON.parse(sessionStorage.getItem('currentUser')).user.organization.PolypmCustomerCode;
      }
    } else {
      this.pullRight = false;
      this.pullRightCode = true;
    }

  }

  ngOnInit() {
    this.sizeSelectedValues = [];
    this.styleSelectedValue = [];
    this.colorSelectedValue = [];
    this.spinnerlogo = false;
    this.spinnerService.show();
    this.pageNo = 1;
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      this.getAllActiveInventories();
    } else {
      this.getInventorybyCompanycode();
    }
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
        this.styleSelectedValue,
        this.colorSelectedValue,
        this.sizeSelectedValues,
        this.codeSelectedValues
      );
    } else {
      this.pageNo = this.paginator.pageIndex + 1;
      this.dataSource.loadDatasByCompanyCode(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.input.nativeElement.value,
        this.styleSelectedValue,
        this.colorSelectedValue,
        this.sizeSelectedValues,
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

  getAllActiveInventories() {
    this.dataSource = new inventoryDataSource(this.inventoryService, this.dialog);

    this.dataSource.loadDatas(0, 25, 'StyleNumber', 'desc', '', this.styleSelectedValue,
      this.colorSelectedValue,
      this.sizeSelectedValues,
      this.codeSelectedValues
    );
    this.getFilterValue();
  }

  getInventorybyCompanycode() {
    this.dataSource = new inventoryDataSource(this.inventoryService, this.dialog);

    this.dataSource.loadDatasByCompanyCode(0, 25, 'StyleNumber', 'desc', '',
      this.styleSelectedValue, this.colorSelectedValue,
      this.sizeSelectedValues, this.companycode);
    this.getFilterValueByCompanyCode();
  }

  noDataDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '35%';
    dialogConfig.position = {
      bottom: '18%',
    };
    dialogConfig.direction = 'rtl';
    dialogConfig.data = 'No Inventory Transaction ';
    this.dialog.open(AlertDialogComponent, dialogConfig);
  }

  onRowSelected(row) {
    if (row.FinishedGoodsAdjustments.length !== 0) {
      this.router.navigate(['/inventoryitem'], { queryParams: { FinishedgoodsId: row.FinishedGoodsID } });
    } else {
      this.noDataDialog();
    }
  }



  openExportcsvModal() {
    this.dateRange.startdate = '';
    this.dateRange.enddate = '';
    this.Stylenumber = '';
    this.ExportcsvModal.open();
  }
  closemodel() {
    this.ExportcsvModal.close();
  }

  getFilterValue() {
    this.inventoryService.getFilterValue().subscribe(
      data => {
        this.filterValue = data;
        this.spinnerService.hide();
      },
      error => {
        this.spinnerService.hide();
      }
    );
  }
  getFilterValueData(filterValueData) {
    this.inventoryService.getFilterValueData(filterValueData).subscribe(
      customerCodeData => {
        this.filterValue = customerCodeData;
      },
      customerCodeError => {
      }
    );
  }

  getFilterValueDataByCompanyCode(filterData) {
    this.inventoryService.getFilterValueDataByCompanyCode(filterData, this.companycode).subscribe(
      data => {
        this.filterValue = data;
      },
      error => {
      }
    );
  }

  getFilterValueByCompanyCode() {
    this.inventoryService.getFilterValueByCompanyCode(this.companycode).subscribe(
      customerCodeData => {
        this.filterValue = customerCodeData;
        this.spinnerService.hide();
      },
      customerCodeError => {
        this.spinnerService.hide();
      }
    );
  }


  styleFilter() {
    this.styleSelectedValue = this.filterStyle.value;
    const filterValueData = [
      { 'filter': 'CompanyCode', 'value': this.filterLocation.value },
      { 'filter': 'StyleNumber', 'value': this.filterStyle.value },
      { 'filter': 'StyleColor', 'value': this.filterColor.value },
      { 'filter': 'GarmentSize', 'value': this.filterSize.value }
    ];

    const getValue = filterValueData.some(function (el) { return el.value !== null && el.value[0] !== undefined; });
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      if (getValue) {
        this.getFilterValueData(filterValueData);
      } else { this.getFilterValue(); }
    } else {
      if (getValue) {
        this.getFilterValueDataByCompanyCode(filterValueData);
      } else { this.getFilterValueByCompanyCode(); }
    }
    this.paginator.pageIndex = 0;
    this.loadDataPage();
  }
  colorFilter() {
    this.colorSelectedValue = this.filterColor.value;
    const filterValueData = [
      { 'filter': 'CompanyCode', 'value': this.filterLocation.value },
      { 'filter': 'StyleNumber', 'value': this.filterStyle.value },
      { 'filter': 'StyleColor', 'value': this.filterColor.value },
      { 'filter': 'GarmentSize', 'value': this.filterSize.value }
    ];

    const getValue = filterValueData.some(function (el) { return el.value !== null && el.value[0] !== undefined; });
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      if (getValue) {
        this.getFilterValueData(filterValueData);
      } else { this.getFilterValue(); }
    } else {
      if (getValue) {
        this.getFilterValueDataByCompanyCode(filterValueData);
      } else { this.getFilterValueByCompanyCode(); }
    }

    this.paginator.pageIndex = 0;
    this.loadDataPage();
  }
  sizeFilter() {
    this.sizeSelectedValues = this.filterSize.value;
    const filterValueData = [
      { 'filter': 'CompanyCode', 'value': this.filterLocation.value },
      { 'filter': 'StyleNumber', 'value': this.filterStyle.value },
      { 'filter': 'StyleColor', 'value': this.filterColor.value },
      { 'filter': 'GarmentSize', 'value': this.filterSize.value }
    ];

    const getValue = filterValueData.some(function (el) { return el.value !== null && el.value[0] !== undefined; });
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      if (getValue) {
        this.getFilterValueData(filterValueData);
      } else { this.getFilterValue(); }
    } else {
      if (getValue) {
        this.getFilterValueDataByCompanyCode(filterValueData);
      } else { this.getFilterValueByCompanyCode(); }
    }

    this.paginator.pageIndex = 0;
    this.loadDataPage();
  }
  codeFilter() {
    this.codeSelectedValues = this.filterLocation.value;
    const filterValueData = [
      { 'filter': 'CompanyCode', 'value': this.filterLocation.value },
      { 'filter': 'StyleNumber', 'value': this.filterStyle.value },
      { 'filter': 'StyleColor', 'value': this.filterColor.value },
      { 'filter': 'GarmentSize', 'value': this.filterSize.value }
    ];

    const getValue = filterValueData.some(function (el) { return el.value !== null && el.value[0] !== undefined; });
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      if (getValue) {
        this.getFilterValueData(filterValueData);
      } else { this.getFilterValue(); }
    } else {
      if (getValue) {
        this.getFilterValueDataByCompanyCode(filterValueData);
      } else { this.getFilterValueByCompanyCode(); }
    }

    this.paginator.pageIndex = 0;
    this.loadDataPage();
  }
  radioChange(event: MatRadioChange) {
    this.exportValue = event.value;
  }
  styleselect() {
    this.Stylenumber = this.selectexport.value;
  }
  exportDetails() {
    if (this.exportValue === 'Inventory') {
      this.exportInventory();
    } else if (this.exportValue === 'Inventory Transaction') {
      this.exportInventoryItems();
    }
  }
  exportInventory() {
    this.ExportcsvModal.close();
    this.spinnerlogo = true;
    this.spinnerService.show();
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      this.inventoryService.exportAllInventory().subscribe(
        data => {
          this.spinnerlogo = false;
          this.exportCSV(data);
          this.spinnerService.hide();

        },
        inventoryError => {
          this.spinnerService.hide();
          this.spinnerlogo = false;
        });
    } else {
      this.inventoryService.exportAllInventoryByCode(this.companycode).subscribe(
        customerCodeData => {
          this.spinnerlogo = false;
          this.spinnerService.hide();
          this.exportCSV(customerCodeData);
        },
        CodeError => {
          this.spinnerService.hide();
          this.spinnerlogo = false;
        }
      );
    }
  }
  exportInventoryItems() {
    this.ExportcsvModal.close();
    const addDate = new Date(this.dateRange.enddate);
    const constructDate = new Date(addDate.getFullYear(), addDate.getMonth(), addDate.getDate() + 1);
    const endDate = this.datePipe.transform(constructDate, 'yyyy-MM-dd');
    if (this.companycode === undefined || this.companycode === 'STAHLS') {
      this.inventoryService.getInventoryItemsByDateRange(this.dateRange.startdate, endDate, this.Stylenumber)
        .subscribe(
          data => {
            this.exportInventoryItemsCSV(data);
          },
          inventoryError => {
          });
    } else {
      this.inventoryService.getInventoryItemsByDateRangeCode(this.dateRange.startdate,
        endDate, this.companycode, this.Stylenumber)
        .subscribe(
          customerCodeData => {
            this.exportInventoryItemsCSV(customerCodeData);
          },
          customerCodeError => {
          });
    }
  }
  exportCSV(data) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: [
        'uuid', 'FinishedGoodsID', 'AdjustedQuantityOnHand', 'CompanyCode', 'CompanyID', 'CustomerCode',
        'DataExportDate', 'DataExportID', 'Description', 'GarmentSize', 'ListPrice', 'QuantityOnHand',
        'QuantityAllocated', 'QuantitySeconds', 'QuantityThirds', 'Season', 'SKUNumber', 'StatusID',
        'StatusName', 'StyleColor', 'StyleID', 'StyleName', 'StyleNumber', 'StyleOption', 'UPCNumber'
      ],
      title: 'inventory-Report'
    };

    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(data, 'inventory-Report', options);
  }
  // nneed to comments
  exportInventoryItemsCSV(data) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: [
        'uuid', 'GoodsTransactionID', 'CompanyCode', 'CompanyID', 'CustomerCode', 'DataExportDate',
        'DataExportID', 'FinishedGoodsID', 'GarmentSize', 'Quantity', 'StyleColor', 'StyleCustomerNumber',
        'StyleNumber', 'TransactionReasonCode', 'TransactionReasonCode2', 'UPCNumber'
      ],
      title: 'inventoryTransaction-Report'
    };

    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(data, 'inventoryTransaction-Report', options);
  }

}
