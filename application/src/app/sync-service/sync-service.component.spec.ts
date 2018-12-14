import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncServiceComponent } from './sync-service.component';
import { SyncService } from './sync-service.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { SidenavModule } from '../sidenav/sidenav.module';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import {
  MatCardModule, MatPaginatorModule, MatTableDataSource,
  MatTableModule, MatButtonModule, MatInputModule,
  MatFormFieldModule, MatSliderModule, MatSortModule,
  MatSelectModule, MatChipsModule, MatDialogModule, MatDialog, MatSort
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../login/auth.guard';
import { ApiService } from '../config/api.service';
import { HttpClientModule } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { SharedService } from '../shared/shared.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, By } from '@angular/platform-browser';
import { SyncServiceDataSource } from './sync-service.datasource';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { SyncServiceModule } from './sync-service.module';

describe('SyncServiceComponent', () => {
  let component: SyncServiceComponent;
  let fixture: ComponentFixture<SyncServiceComponent>;
  let syncService: SyncService;
  let migrationCount = {
    id: 0,
    label: '',
    description: '',
    name: '',
    sub_type: '',
    value: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{
          path: 'syncservice',
          component: SyncServiceComponent,
          canActivate: [AuthGuard]
        }
        ]),
        HttpClientModule,
        MatChipsModule,
        MatSelectModule,
        MatSortModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        CommonModule,
        FormsModule,
        CommonModule,
        SidenavModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MDBBootstrapModule.forRoot(),
        ReactiveFormsModule,
        Ng4LoadingSpinnerModule,
        SyncServiceModule
      ],
      declarations: [
        AlertDialogComponent
      ],
      providers: [
        SyncService,
        ApiService,
        ConfigService,
        Constants,
        SharedService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AlertDialogComponent]
      }
    });
    fixture = TestBed.createComponent(SyncServiceComponent);
    component = fixture.debugElement.componentInstance;
    component.migrationCount = migrationCount;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });



  it('should call ngOnInit', () => {
    //component.dataSource = new MatTableDataSource();
    component.countUpdate = false;
    component.pageNo = 1;

    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    expect(component.ngOnInit).toBeTruthy();
  });


  it('should call ngAfterViewInit', () => {
    //component.dataSource = new MatTableDataSource();
    component.countUpdate = false;
    component.pageNo = 1;
    component.paginator.pageIndex = 0;
    component.sort = new MatSort();

    component.ngAfterViewInit();
    spyOn(component, 'ngAfterViewInit');
    expect(component.ngAfterViewInit).toBeTruthy();
  });


  it('should call loadDataPage', () => {
    component.dataSource = new SyncServiceDataSource(syncService);
    component.sort.active === 'updatedAtTime';
    component.pageNo = 1;
    component.loadDataPage();
    spyOn(component, 'loadDataPage');
    expect(component.loadDataPage).toBeTruthy();
  });


  it('should call getSyncService', () => {
    component.dataSource = new SyncServiceDataSource(syncService);

    component.getSyncService();
    spyOn(component, 'getSyncService');
    expect(component.getSyncService).toBeTruthy();
  });


  it('should call timeFrequency to get the frequency', () => {
    component.frequency = 3;
    component.sliderValue = 2;

    component.timeFrequency();
    spyOn(component, 'timeFrequency');
    expect(component.timeFrequency).toBeTruthy();
  });


  it('should call getCountFrequency to get the count', () => {
    component.migrationCount = {
      id: 1234,
      label: 'test',
      description: 'test',
      name: 'xxxx',
      sub_type: '',
      value: 3
    };;

    component.getCountFrequency();
    spyOn(component, 'getCountFrequency');
    expect(component.getCountFrequency).toBeTruthy();
  });

  it('should call OpenDialog to get the frequency', () => {
    component.frequency = 3;
    component.sliderValue = 2;

    component.OpenDialog();
    spyOn(component, 'OpenDialog');
    expect(component.OpenDialog).toBeTruthy();
  });


  it('should call increment and decrement method', () => {

    component.migrationCount.value = 25;
    component.update = true;
    component.countUpdate = false;

    component.increment();
    spyOn(component, 'increment');
    expect(component.increment).toBeTruthy();
    component.decrement();
    spyOn(component, 'decrement');
    expect(component.decrement).toBeTruthy();
  });

  it('should triggers on count value change', () => {
    component.update = true;
    component.countUpdate = false;

    component.countValueChanged();
    spyOn(component, 'countValueChanged');
    expect(component.countValueChanged).toBeTruthy();
  });

  it('should call Onchange method', () => {
    component.frequency = { value: 2 };
    component.sliderValue = 3;
    component.update = true;

    component.Onchange();
    spyOn(component, 'Onchange');
    expect(component.Onchange).toBeTruthy();
  });


});
