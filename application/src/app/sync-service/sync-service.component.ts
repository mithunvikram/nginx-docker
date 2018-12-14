import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { SyncService } from './sync-service.service';
import { MatDialog, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { SyncServiceDataSource } from './sync-service.datasource';
import { debounceTime, distinctUntilChanged, startWith, tap, delay } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent } from 'rxjs/observable/fromEvent';

@Component({
  selector: 'app-sync-service',
  templateUrl: './sync-service.component.html',
  styleUrls: ['./sync-service.component.css']
})
export class SyncServiceComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  public dialogConfig :any;
  displayedColumns = ['updatedAt', 'updatedAtTime', 'SyncTable', 'SyncStatus', 'DataExportDate', 'TotalCount', 'MigratedCount'];
  dataSource: SyncServiceDataSource;
  migrationCount = {
    id: 0,
    label: '',
    description: '',
    name: '',
    sub_type: '',
    value: 0
  };
  countUpdate: boolean;
  public frequency: any;
  public time: number;
  public update: any;
  public enable: boolean;
  public sliderValue: number;
  pageNo: number;
  constructor(private syncService: SyncService, private dailog: MatDialog) { }


  ngOnInit() {
    this.countUpdate = false;
    this.pageNo = 1;
    this.timeFrequency();
    this.getCountFrequency();
    this.getSyncService();
  }
  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadDataPage())
      )
      .subscribe();

  }

  loadDataPage() {
    if (this.sort.active === 'updatedAtTime') {
      this.sort.active = 'updatedAt';
    }
    this.pageNo = this.paginator.pageIndex + 1;
    this.dataSource.loadDatas(
      this.paginator.pageIndex,
      this.paginator.pageSize,
      this.sort.active,
      this.sort.direction,
    );
  }

  getSyncService() {
    this.dataSource = new SyncServiceDataSource(this.syncService);
    this.dataSource.loadDatas(0, 25, 'createdAt', 'desc');
  }

  timeFrequency() {
    this.syncService.getFrequency().subscribe(
      data => {
        this.frequency = data;
        this.sliderValue = data.value;
        if (this.sliderValue === data.value) {
          this.update = false;
        }
      },
      error => {
        this.OpenDialog();
      }
    );
  }
  getCountFrequency() {
    this.syncService.getCountFrequency().subscribe(
      data => {
        this.migrationCount = data;
      },
      error => {
      }
    );
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
    this.dialogConfig.data = 'Sync-Service is Down';
    this.dailog.open(AlertDialogComponent, this.dialogConfig);
  }

  updateTime() {
    this.updateTimeFrequency();
    this.updateCountFrequency();
  }
  updateTimeFrequency() {
    this.frequency.value = this.sliderValue;
    this.syncService.updateFrequency(this.frequency).subscribe(
      data => {
        this.enable = false;
      },
      error => {
      }
    );
  }
  updateCountFrequency() {
    this.syncService.updateCountFrequency(this.migrationCount).subscribe(
      data => {
        this.countUpdate = true;
      },
      error => {
      }
    );
  }

  increment() {
    this.migrationCount.value = Number(this.migrationCount.value) + 25;
    this.update = true;
    this.countUpdate = false;
  }

  decrement() {
    this.migrationCount.value = Number(this.migrationCount.value) - 25;
    this.update = true;
    this.countUpdate = false;
  }
  countValueChanged() {
    this.update = true;
    this.countUpdate = false;
  }

  Onchange() {
    if (this.frequency.value !== this.sliderValue) {
      this.update = true;
    }
  }

}

export interface DialogPosition {
  /** Override for the dialog's top position. */
  top?: '50%';

  /** Override for the dialog's bottom position. */
  bottom?: '50%';

  /** Override for the dialog's left position. */
  // left?: string;

  /** Override for the dialog's right position. */
  // right?: string;
}

