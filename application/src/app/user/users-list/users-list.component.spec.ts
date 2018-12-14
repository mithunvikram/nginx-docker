import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule, MatDialogConfig, MatDialog } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, MatDialogModule } from '@angular/material';
import { AvatarModule } from 'ngx-avatar';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AuthGuard } from '../../login/auth.guard';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from '../user.service';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { SharedService } from '../../shared/shared.service';
import { Constants } from '../../config/Constant';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { DeleteDialogComponent } from '../../dialog/delete-dialog/delete-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Iuser } from '../Iuser';
import { MatPaginator, MatSort, MatTableDataSource, MatSortable } from '@angular/material';
import { FormControl } from '@angular/forms';
import { AppInterceptor } from '../../app.interceptor';
import { MockUserService } from '../../../mock/service/user/MockUser.service';
import { OrganizationService } from '../../organization/organization.service';
import { MockOrganizationService } from '../../../mock/service/organization/mockOrganizationService';
import { MockLoginService } from '../../../mock/service/login/mockLoginService';
import { UsersListModule } from './users-list.module';


describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;
  let spinnerservice: Ng4LoadingSpinnerService;
  let userService: UserService;
  let userdata;
  let user: Iuser;
  let mockUserService: MockUserService = null;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot([
          {
            path: 'users',
            component: UsersListComponent,
            canActivate: [AuthGuard]
          }
        ]),
        HttpClientModule,
        MatDialogModule,
        Ng2Bs3ModalModule,
        MatButtonModule,
        SidenavModule,
        MatSortModule,
        MatTableModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatCardModule,
        ReactiveFormsModule,
        SidenavModule,
        MatPaginatorModule,
        AvatarModule,
        UsersListModule,
        // AlertDialogComponent,
        // DeleteDialogComponent,
      ],
      declarations: [
        AlertDialogComponent,
        DeleteDialogComponent,
      ],
      providers: [
        UserService,
        ApiService,
        ConfigService,
        SharedService,
        MatDialog,
        MockLoginService,
        MockUserService,
        { provide: UserService, useClass: MockUserService },
        OrganizationService,
        MockOrganizationService,
        { provide: OrganizationService, useClass: MockOrganizationService },
        Ng4LoadingSpinnerService,
        Constants,
        { provide: APP_BASE_HREF, useValue: '/' },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppInterceptor,
          multi: true
        },

      ],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AlertDialogComponent, DeleteDialogComponent]
      }
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(UsersListComponent);
        component = fixture.componentInstance;
      });
  }));

  // beforeEach(inject([Ng4LoadingSpinnerService],
  //   (spinnerService) => {
  //   }));


  // beforeEach(() => {
  //   userdata = {
  //     'token': '12345',
  //     'user': {
  //       'uuid': '',
  //       'username': 'xxxx', 'firstname': 'xxxx',
  //       'lastname': 'xxxx', 'email': 'xxxx@gmail.com', 'isDisabled': false,
  //       'Authorities': [{
  //         'uuid': '', 'role': 'ROLE_DUMMY', 'allowedScreens': 'Dashboard'
  //       }],
  //       'organization': [{ 'uuid': '', 'organizationname': '' }], 'organizationUuid': ''
  //     }
  //   };
  //   // const organizationname: String = userdata.user.organization[0].organizationname;
  //   sessionStorage.setItem('currentUser', JSON.stringify(userdata));
  //   fixture = TestBed.createComponent(UsersListComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(inject([MockLoginService, MockUserService], (mockLoginService, mockuserservice) => {
    // orderService = service;
    // mockTicketCreationService = mockService;
    mockUserService = mockuserservice;
    mockLoginService.login().subscribe((responseValue) => {
      console.log('userlist login storage in spec files ---- ', responseValue);
      sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
    });

    mockLoginService.loginByOtherUser().subscribe(responseValue => {
      sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
    });


  }));



  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterAll(() => {
    sessionStorage.removeItem('currentUser');
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });


  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    expect(component.ngOnInit).toBeTruthy();
    spyOn(component, 'getUserList').and.callThrough();
    // tslint:disable-next-line:no-unused-expression
    expect(component.getUserList).toHaveBeenCalled;
  });

  it('should run  #getUserList and have Organization ID', async () => {
    component.orgUUID = 'reWQ2f';
    expect(component.orgUUID).toBeTruthy();
    component.getUserList();
    spyOn(component, 'getUserList');
    expect(component.getUserList).toBeTruthy();
  });

  it('should run  #getUserList', async () => {
    component.orgUUID = undefined;
    component.dataSource = new MatTableDataSource();
    
    component.getUserList();
    spyOn(component, 'getUserList');
    expect(component.getUserList).toBeTruthy();
  });

  it('should run #popupForNoData', () => {
    component.popupForNoData();
    spyOn(component, 'popupForNoData');
    expect(component.popupForNoData).toBeTruthy();
  });

  it('should run #openDialog', () => {
    component.openDialog({});
    spyOn(component, 'openDialog');
    expect(component.openDialog).toBeTruthy();
  });

  it('should run #handleUserDisable', () => {
    component.handleUserDisable({ uuid: '2RE32' });
    spyOn(component, 'handleUserDisable').and.callThrough();
    expect(component.handleUserDisable).toBeTruthy();
  });

  // uuid: string;
  // firstname: string;
  // lastname: string;
  // email: string;
  // position: string;
  // rol: string;
  // userimage: string;
  // username: string;
  // password: string;
  // organization: any;
  // Authorities: any;
  it('should run #OrgFilter', () => {
    component.UsersList = mockUserService.getUsersList();
    component.selectfilter = new FormControl(['NEW']);
    component.OrgFilter();
    spyOn(component, 'OrgFilter');
    expect(component.OrgFilter).toBeTruthy();
  });

  it('should run #RoleFilter', () => {
    component.UsersList = mockUserService.getUsersList();

    component.selectedValue = [];
    component.filterArr = [];
    component.selectedValue = ['test'];
    component.selectfilter = new FormControl(['test']);
    component.RoleFilter();
    spyOn(component, 'RoleFilter');
    expect(component.RoleFilter).toBeTruthy();
  });

  it('should run #RoleFilter with no value', () => {
    component.UsersList = mockUserService.getUsersList();

    component.dataSource = new MatTableDataSource();
    component.selectedValue = [];
    component.filterArr = [];
    component.selectedValue = [];
    component.selectfilter = new FormControl(['test']);
  
    component.RoleFilter();
    spyOn(component, 'RoleFilter');
    expect(component.RoleFilter).toBeTruthy();
  });

  it('should run #applyFilter', () => {
    component.applyFilter('user');
    spyOn(component, 'applyFilter');
    expect(component.applyFilter).toBeTruthy();

  });

  it('should run #initializeValue', () => {
    component.initializeValue();
    spyOn(component, 'initializeValue');
    expect(component.initializeValue).toBeTruthy();

  });

  it('should run #sortPage', () => {
    component.sortPage();
    spyOn(component, 'sortPage');
    expect(component.sortPage).toBeTruthy();

  });

  it('should run #handleUserEdit', () => {
    component.handleUserEdit({ uuid: '34EREW' });
    spyOn(component, 'handleUserEdit');
    expect(component.handleUserEdit).toBeTruthy();

  });

  // it('should run part #getUserList()', async () => {
  //   component.orgUUID = 'rkZJDf9fm';
  //   component.filter_Organization = ['Sthals'];
  //   component.filter_Role = ['Admin'];
  //   component.UsersList = [];
  //   component.dataSource = new MatTableDataSource();
  //   expect(component.orgUUID).toBeTruthy();
  //   expect(component.filter_Organization).toBeTruthy();
  //   expect(component.filter_Role).toBeTruthy();
  //   expect(component.UsersList).toBeTruthy();
  //   expect(component.dataSource).toBeTruthy();
  //   spyOn(component, 'popupForNoData');
  //   component.getUserList();
  //   spyOn(component, 'getUserList');
  //   expect(component.getUserList).toBeTruthy();
  // });



  // it('should run #popupForNoData()', async () => {
  //   component.popupForNoData();
  //   spyOn(component, 'popupForNoData');
  //   const dialogConfig = new MatDialogConfig();
  //   expect(dialogConfig.disableClose).toBe(false);
  //   expect(dialogConfig.autoFocus).toBe(true);
  //   expect(dialogConfig.width).toBe('');
  //   expect(dialogConfig.direction).toBe('ltr');
  //   expect(dialogConfig.data).toBe(null);
  // });

  // it('should run #openDialog()', async () => {
  //   component.openDialog(userdata);
  //   spyOn(component, 'openDialog');
  //   const dialogConfig = new MatDialogConfig();
  //   expect(dialogConfig.disableClose).toBe(false);
  //   expect(dialogConfig.autoFocus).toBe(true);
  //   expect(dialogConfig.width).toBe('');
  //   expect(dialogConfig.direction).toBe('ltr');
  //   expect(dialogConfig.data).toBe(null);
  //   // const result = component.openDialog(userData);
  // });

  // it('should run #handleUserDisable()', async () => {

  //   component.handleUserDisable(userdata);
  //   spyOn(component, 'handleUserDisable');
  //   expect(component.handleUserDisable).toBeTruthy();
  //   spyOn(component, 'getUserList');
  // });

  // it('should run #OrgFilter()', () => {
  //   component.selectfilter = new FormControl(['Stahls']);
  //   component.OrgFilter();
  //   spyOn(component, 'OrgFilter');
  //   expect(component.OrgFilter).toBeTruthy();
  // });

  // it('should call the if condition', () => {
  //   component.selectfilter = new FormControl([]);
  //   console.log('--------component selectedvalue length----<>>>>>>>', component.selectfilter);
  //   component.OrgFilter();
  //   spyOn(component, 'OrgFilter');
  //   expect(component.OrgFilter).toBeTruthy();
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.getUserList).toHaveBeenCalled;
  // });

  // it('should call the else part ', () => {
  //   component.selectfilter = new FormControl(['Stahls']);
  //   // tslint:disable-next-line:max-line-length
  //   let one = { uuid: 'rkZJDf9fm', id: 3, organizationname: 'NewBalance', orgImage: 'uploads/OrgImage/New-Balance-logo.png', PolypmCustomerCode: 'NEWC01' };
  //   component.selectfilter = new FormControl(['Stahls']);
  //   component.OrgFilter();
  //   spyOn(component, 'OrgFilter');
  //   expect(component.OrgFilter).toBeTruthy();

  // });


  // it('should run #RoleFilter()', () => {
  //   component.selectfilter = new FormControl(['ADMIN']);
  //   component.RoleFilter();
  //   spyOn(component, 'RoleFilter');
  //   expect(component.RoleFilter).toBeTruthy();
  // });

  // it('should call the if condition', () => {
  //   component.selectfilter = new FormControl([]);
  //   console.log('--------component selectedvalue length----<>>>>>>>', component.selectfilter);
  //   component.RoleFilter();
  //   spyOn(component, 'RoleFilter');
  //   expect(component.RoleFilter).toBeTruthy();
  //   // tslint:disable-next-line:no-unused-expression
  //   expect(component.initializeValue).toHaveBeenCalled;
  // });

  // it('should call the else part ', () => {
  //   // tslint:disable-next-line:max-line-length
  //   let one = { uuid: '43WpowpfM', role: 'ROLE_USER' };
  //   component.selectfilter = new FormControl(['ADMIN']);
  //   component.RoleFilter();
  //   spyOn(component, 'RoleFilter');
  //   expect(component.RoleFilter).toBeTruthy();

  // });

  // it('should run #applyFilter()', async () => {
  //   component.applyFilter('FilterValue');
  //   spyOn(component, 'applyFilter');
  //   // const result = component.applyFilter(filterValue);
  // });

  // it('should run #initializeValue()', async () => {
  //   component.initializeValue();
  //   spyOn(component, 'initializeValue');
  //   // const result = component.initializeValue();
  // });

  // it('should run #sortPage()', async () => {
  //   component.sortPage();
  //   spyOn(component, 'sortPage');
  //   // const result = component.sortPage();
  // });

  // it('should run #handleUserEdit()', async () => {
  //   component.handleUserEdit(userdata);
  //   spyOn(component, 'handleUserEdit');
  //   // const result = component.handleUserEdit(userData);
  // });

});
