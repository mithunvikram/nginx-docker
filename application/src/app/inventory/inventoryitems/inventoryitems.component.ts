import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-inventoryitems',
  templateUrl: './inventoryitems.component.html',
  styleUrls: ['./inventoryitems.component.css']
})
export class InventoryitemsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['GoodsTransactionID', 'StyleNumber',
    'StyleColor', 'GarmentSize', 'TransactionReasonCode', 'TransactionReasonCode2', 'DataExportDate'];

  dataSource: any;
  public inventoryitems: any[] = [];
  public filterArr: any[];
  public itemsid: any;
  public selectedLocation: any;
  constructor(private inventoryService: InventoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getquerydetails();

  }
  getquerydetails() {
    this.route.queryParams.subscribe(params => {
      this.itemsid = params['FinishedgoodsId'];
      this.getallInventoryitems();
    });
  }
  getallInventoryitems() {
    this.inventoryService.getInventoryitems(this.itemsid).subscribe(data => {
      this.inventoryitems = data;
      this.dataSource = new MatTableDataSource(this.inventoryitems);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'GoodsTransactionID': return item.GoodsTransactionID;
          case 'StyleNumber': return item.StyleNumber;
          case 'StyleColor': return item.StyleColor;
          case 'GarmentSize': return item.GarmentSize;
          case 'TransactionReasonCode': return item.TransactionReasonCode;
          case 'TransactionReasonCode2': return item.TransactionReasonCode2;
          case 'DataExportDate': return item.DataExportDate;
          default: return item[property];
        }
      };
    }, error => {
    });
  }
}
