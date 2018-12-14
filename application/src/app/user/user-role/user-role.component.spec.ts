import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UserRoleComponent } from './user-role.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatDialogModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';
import { BrowserModule, By } from '@angular/platform-browser';
import { AuthGuard } from '../../login/auth.guard';
import { UserService } from '../user.service';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IRole } from './IRole';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';
import { AppInterceptor } from '../../app.interceptor';
import { MockLoginService } from '../../../mock/service/login/mockLoginService';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { UsersListModule } from '../users-list/users-list.module';




describe('UserRoleComponent', () => {
  let component: UserRoleComponent;
  let fixture: ComponentFixture<UserRoleComponent>;
  let role: IRole;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // declarations: [ UserRoleComponent ]
      imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot([
          {
            path: 'user-roles',
            component: UserRoleComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        MatDialogModule,
        MatButtonModule,
        SidenavModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatCardModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        SidenavModule,
        MatPaginatorModule,
        AvatarModule,
        UsersListModule
      ],
      declarations: [UserRoleComponent, AlertDialogComponent, DeleteDialogComponent,
      ],
      providers: [
        UserService,
        ApiService,
        ConfigService,
        SharedService,
        MockLoginService,
        Constants,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true
        },

      ]
      // providers: [
      //   UserService,
      //   { provide: APP_BASE_HREF, useValue: '/' }
      // ]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AlertDialogComponent, DeleteDialogComponent]
      }
    }).compileComponents();
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UserRoleComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(inject([MockLoginService], (mockLoginService) => {
    // orderService = service;
    // mockTicketCreationService = mockService;
    mockLoginService.login().subscribe((responseValue) => {
      sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
    });

    mockLoginService.loginByOtherUser().subscribe(responseValue => {
      sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
    });


  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(UserRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a component', () => {
    expect(component).toBeTruthy();
  });
  it('should run #ngOnInit()', inject([MockLoginService], (mockLoginService) => {

    sessionStorage.removeItem('currentUser');
    mockLoginService.login().subscribe((responseValue) => {
      sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
    });


    //  component.orgUUID = '1ER32W';
    const result = component.ngOnInit();
    spyOn(component, 'ngOnInit');
    // tslint:disable-next-line:no-unused-expression
    expect(component.ngOnInit).toHaveBeenCalled;
    spyOn(component, 'getUserRoleList').and.callThrough();
    // tslint:disable-next-line:no-unused-expression
    expect(component.getUserRoleList).toHaveBeenCalled;
    // spyOn(component, 'currentUserDetails');
    // tslint:disable-next-line:no-unused-expression
    // expect(component.currentUserDetails).toHaveBeenCalled;
    // expect(component.update).toBeTruthy();

  }));
  it('should run #getUserRoleList and the org id is true', async () => {
    component.orgUUID = true;
    component.test = false;
    const result = component.getUserRoleList();
    spyOn(component, 'getUserRoleList');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getUserRoleList).toHaveBeenCalled;
  });
  it('should run #getUserRoleList and the org id is false', async () => {
    component.orgUUID = false;
    component.test = false;
    const result = component.getUserRoleList();
    spyOn(component, 'getUserRoleList');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getUserRoleList).toHaveBeenCalled;
  });

  it('should run #editUserRole', async () => {
    const result = component.editUserRole({ uuid: '2WER23' });
    spyOn(component, 'editUserRole');
    // tslint:disable-next-line:no-unused-expression
    expect(component.editUserRole).toHaveBeenCalled;
  });
  it('should run #openDialog', async () => {
    const result = component.openDialog('');
    spyOn(component, 'openDialog');
    // tslint:disable-next-line:no-unused-expression
    expect(component.openDialog).toHaveBeenCalled;
  });
  it('should run #handleUserRoleDisable', async () => {
    const result = component.handleUserRoleDisable({ uuid: 'qR23G' });
    spyOn(component, 'handleUserRoleDisable');
    // tslint:disable-next-line:no-unused-expression
    expect(component.handleUserRoleDisable).toHaveBeenCalled;
  });
  it('should run #DataSorting', () => {
    component.DataSorting();
    spyOn(component, 'DataSorting');
    // tslint:disable-next-line:no-unused-expression
    expect(component.DataSorting).toHaveBeenCalled;
  });
  it('click matHeader should calling sortingDataAccessor function', () => {
    const matHeaderFirstEl = fixture.debugElement.query(By.css('.mat-column-Name'));
    matHeaderFirstEl.nativeElement.click();
    const matHeaderSecondEl = fixture.debugElement.query(By.css('.mat-column-Organisation'));
    matHeaderSecondEl.nativeElement.click();
    fixture.detectChanges();
  });
});
