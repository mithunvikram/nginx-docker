import { Component, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { IShipments } from '../IShipments';
declare var jquery: any;
import { ShipmentsService } from '../shipments.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-packeditems',
  templateUrl: './packeditems.component.html',
  styleUrls: ['./packeditems.component.css']
})
export class PackeditemsComponent implements OnInit {

  public listOfShipments: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
  packedboxnumber: any;
  selectedLocation: any;
  PackedBox: any;
  listPackedBoxItem: any;

  displayedColumns = ['PackedItemID', 'StyleNumber', 'StyleColor', 'GarmentSize', 'StyleOption', 'Quantity'];
  dataSource: any = [];

  dialogConfig : any;

  public shipmentdata = [];

  constructor(private spinnerservice: Ng4LoadingSpinnerService, private shipmentsService: ShipmentsService,
    private router: Router, private route: ActivatedRoute,
    private dailog: MatDialog) { }

  ngOnInit() {
    this.spinnerservice.show();
    this.getQueryDetails();

  }

  initializeValue() {
    this.dataSource = new MatTableDataSource(this.listOfShipments);
  }

  Onclick() {
    this.router.navigate(['/packedboxes'], { queryParams: { shipmentId: this.packedboxnumber } });
  }
  Onclick1() {
    this.router.navigate(['/shipments-tems'], { queryParams: { shipmentId: this.packedboxnumber } });
  }


  getQueryDetails() {
    this.route.queryParams.subscribe(params => {
      const shipmentId = params['shipmentId'];
      this.getShipments(shipmentId);
    });
  }

  getShipments(id) {
    this.packedboxnumber = id;
    this.shipmentsService.getPackedItemByShipmentId(id)
      .subscribe(data => {
        if (data === 'There is no PackedBox') {
          this.listPackedBoxItem = [];
          this.dataSource = new MatTableDataSource(this.listPackedBoxItem);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.OpenDialog();
        } else {
          this.spinnerservice.hide();
          this.listPackedBoxItem = data;
          this.dataSource = new MatTableDataSource(this.listPackedBoxItem);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
        error => {
          console.log('something went wrong');
        });
  }

  OpenDialog() {
    this.spinnerservice.hide();
     this.dialogConfig = new MatDialogConfig();
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.data = 'No Data in PackedBoxItems';
    this.dailog.open(AlertDialogComponent, this.dialogConfig);
  }


}
