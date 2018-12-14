import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatRadioChange } from '@angular/material';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IShipments } from './IShipments';
import { ShipmentDataSource } from './ShipmentsDataSource';
import { ShipmentsService } from './shipments.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';


@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.css']
})
export class ShipmentsComponent implements OnInit {
  date = new FormControl(new Date());
  serializedDate = new FormControl();
  public filter_PONumber: any = [];
  public filter_shipmentMethod: any[];
  public filter_Style: string[] = [];
  public filter_Customer: any[];
  public beforeFilter_shipmentStatus: any[];
  public filter_shipmentStatus: string[];
  public selectedValue: any[];
  public filterArr: any[];
  public listOfShipments: any[] = [];
  public startDate: string;
  public endDate: string;
  public startDateMin: Date = new Date(2000, 0, 1);
  public startDateMax: Date = new Date();
  public endDateMin: Date = new Date(2000, 0, 1);
  public endDateMax: Date = new Date();
  public endDateDisable: boolean;
  public exportValue: string;
  pageNo: number;
  public filterValue: any;

  filterdata: any = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;
  @ViewChild('ExportCSV')
  ExportcsvModal: ModalComponent;

  selectfilter = new FormControl();
  public IShipments: IShipments = {
    uuid: '',
    OrderUuid: '',
    item: 0,
    shipmentinfo: '',
    date: [],
    time: [],
    location: [],
    activity: []
  };
  public listOfShipment;
  public povalue: any;
  public customervalue: any;
  selectedLocation: any;
  public companyCode: string;
  public startdate: string;
  public enddate: string;
  displayedColumns = ['PONumber', 'ShipToName', 'ShipCity', 'State', 'Waybill', 'ShipDate', 'ShipMethod'];
  dataSource: ShipmentDataSource;

  public organizationDetails : any;

  public shipmentdata = [];
  public ponfilter: string[] = [];
  public customerfilter: string[] = [];
  constructor(private spinnerservice: Ng4LoadingSpinnerService, private shipmentsService: ShipmentsService, private router: Router,
    private dailog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit() {
    this.endDateDisable = true;
    this.intializeCurrentUser();

  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.spinnerservice.show();
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
    if (this.companyCode === undefined || this.companyCode === 'STAHLS') {
      this.pageNo = this.paginator.pageIndex + 1;
      this.dataSource.loadDatas(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.input.nativeElement.value,
        this.ponfilter,
        this.startDate,
        this.endDate
      );
    } else {
      this.pageNo = this.paginator.pageIndex + 1;
      this.dataSource.loadDatasByCompanyCode(
        this.paginator.pageIndex,
        this.paginator.pageSize,
        this.sort.active,
        this.sort.direction,
        this.input.nativeElement.value,
        this.ponfilter,
        this.companyCode,
        this.startDate,
        this.endDate
      );
    }
  }

  intializeCurrentUser() {
    this.organizationDetails = JSON.parse(sessionStorage.getItem('currentUser')).user.organization;
    if (this.organizationDetails !== null) {
      if (this.organizationDetails.PolypmCustomerCode !== null && this.organizationDetails.PolypmCustomerCode !== 'STAHLS') {
        this.companyCode = this.organizationDetails.PolypmCustomerCode;
        this.getAllShipmentsByOrg(this.organizationDetails.PolypmCustomerCode);
      } else {
        this.getAllShipments();
      }
    } else {
      this.getAllShipments();
    }
  }

  getAllShipments() {
    this.dataSource = new ShipmentDataSource(this.shipmentsService, this.dailog);

    this.dataSource.loadDatas(0, 25, 'PONumber', 'desc', '', this.ponfilter, this.startDate, this.endDate);
    this.spinnerservice.hide();
    this.getFilterValue();
  }
  getAllShipmentsByOrg(orgName) {

    this.dataSource = new ShipmentDataSource(this.shipmentsService, this.dailog);

    this.dataSource.loadDatasByCompanyCode(0, 25, 'PONumber', 'desc', '', this.ponfilter, this.companyCode, this.startDate, this.endDate);
    this.spinnerservice.hide();
    this.getFilterValueByCompanyCode();
  }
  getFilterValue() {
    this.shipmentsService.getFilterValue().subscribe(
      data => {
        this.filterValue = data;
        this.spinnerservice.hide();
      },
      error => {
        this.spinnerservice.hide();
        
      }
    );
  }

  getFilterValueByCompanyCode() {
    this.shipmentsService.getFilterValueByCompanyCode(this.companyCode).subscribe(
      data => {
        this.filterValue = data;
        this.spinnerservice.hide();
      },
      error => {
        this.spinnerservice.hide();
      }
    );
  }




  PONumberFilter() {
    this.ponfilter = this.selectfilter.value;
    this.paginator.pageIndex = 0;
    this.loadDataPage();
  }
  startDateCalcs(event) {
    this.convert(event, 'startDate');
  }
  endDateCalcs(event) {
    this.convert(event, 'endDate');
  }
  startDataInput() {
    this.paginator.pageIndex = 0;
    if (this.startDate != null) {
      this.convert(this.startDate, 'startDate');
    } else {
      this.loadDataPage();
    }
  }
  endDataInput() {
    this.paginator.pageIndex = 0;
    if (this.endDate != null) {
      this.convert(this.endDate, 'endDate');
    } else {
      this.loadDataPage();
    }
  }
  filterDate() {
    this.loadDataPage();
    this.shipmentsService.getPonumberbyDate(this.startDate, this.endDate).subscribe(data => {
      this.filterValue = data;
      this.spinnerservice.hide();
    }, error => {
    });
  }
  convert(str, methodName) {
    const mnths = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    },
      date = str.toString().split(' ');
    if (methodName === 'startDate') {
      this.startDate = [date[3], mnths[date[1]], date[2]].join('-');
      this.endDateDisable = false;

    }
    if (methodName === 'endDate') {
      this.endDate = [date[3], mnths[date[1]], date[2]].join('-');
    }
    this.filterDate();
  }


  onRowSelected(row) {
    this.router.navigate(['/shipments-tems'], { queryParams: { shipmentId: row.ShipmentID } });
  }
  openExportcsvModal() {
    this.startdate = '';
    this.enddate = '';
    this.exportValue = '';
    this.ExportcsvModal.open();
  }
  closemodel() {
    this.ExportcsvModal.close();
  }
  radioChange(event: MatRadioChange) {
    this.exportValue = event.value;
  }

  exportCSV() {
    this.ExportcsvModal.close();
    if (this.companyCode === undefined || this.companyCode === 'STAHLS') {
      this.shipmentsService.getShipmentByDate(this.startdate, this.enddate).subscribe(
        data => {
          this.exportShipment(data);
        },
        error => {
        });
    } else {
      this.shipmentsService.getShipmentByDateCode(this.companyCode, this.startdate, this.enddate).subscribe(
        data => {
          this.exportShipment(data);
        },
        error => {
        });
    }
  }

  exportShipment(data) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      useBom: true,
      headers: [
        'uuid', 'ShipmentID', 'BillToName', 'BillToNumber',
        'CompanyCode', 'CompanyID', 'ContainerNumber', 'CustomerCode',
        'ShipToCity', 'ShipToState', 'CustomerID', 'DataExportDate',
        'DataExportID', 'Discount', 'DueDate', 'EdiTransportationMethod',
        'Freight', 'InvoiceDate', 'InvoiceNumber', 'IsReturn', 'OrderComments10',
        'OrderComments11', 'OrderComments12', 'OrderComments13', 'OrderComments14',
        'OrderDiscount', 'OrderFreight', 'OrderID', 'OrderNumber', 'OrderSalesTax',
        'OrderStatusID', 'OrderStatusName', 'PONumber', 'POProductGroup',
        'RequiredDate', 'RetailerPONumber', 'SalesPerson', 'SalesTax', 'ShipCount',
        'ShipDate', 'ShipNumber', 'ShipperNumber', 'ShipToName', 'ShipToNumber',
        'Subtotal', 'Terms',
        'TotalPrice', 'WayBill', 'StatusName', 'EdiCarrierSCAC'
      ],
      title: 'shipment-Report'
    };

    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(data, 'shipment-Report', options);
  }

}
