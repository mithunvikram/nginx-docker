import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { RouterModule, Router } from '@angular/router';
import { SidenavModule } from '../sidenav/sidenav.module';
import { OrganizationComponent } from './organization.component';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { OrganizationService } from './organization.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule, MatDialog } from '@angular/material';
import { MatSortModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { CreateComponent } from './create/create.component';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { MatFormFieldModule, MatInputModule, MatDialogModule, MatDialogConfig, MatTableDataSource } from '@angular/material';
import { AuthGuard } from '../login/auth.guard';
import { AvatarModule } from 'ngx-avatar';
import { TicketCreationModule } from '../ticket/ticketcreation/ticketcreation.module';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { DebugElement } from '@angular/core';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from '../login/login.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { OrganizationModule } from './organization.module';
import { DeleteDialogComponent } from '../dialog/delete-dialog/delete-dialog.component';
import { MockOrganizationService } from '../../mock/service/organization/mockOrganizationService';
import { MockLoginService } from '../../mock/service/login/mockLoginService';

describe('OrganizationComponent', () => {
  let component: OrganizationComponent;
  let fixture: ComponentFixture<OrganizationComponent>;
  let mockOrganizationService: MockOrganizationService;
  let location: Location;
  let router: Router;
  let orgObject: OrganizationComponent;
  // let loginService: LoginService = null;
  // let backend: MockBackend = null;
  // let mockservice;

  // TestBed.overrideComponent(OrganizationComponent, {
  //   set: {
  //     providers: [
  //       {
  //         provide: OrganizationService,
  //         useValue: mockservice
  //       },
  //       {
  //         provide: Router,
  //         useClass: class { navigate = jasmine.createSpy('navigate') }
  //       }
  //     ]
  //   }
  // });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([{
          path: 'organization',
          component: OrganizationComponent,
          canActivate: [AuthGuard]
        }, {
          path: 'create-org',
          component: CreateComponent,
          canActivate: [AuthGuard]
        }]),
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatButtonModule,
        SidenavModule,
        ReactiveFormsModule,
        Ng4LoadingSpinnerModule,
        MatDialogModule,
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        TicketCreationModule,
        AvatarModule,
        FileUploadModule,
        OrganizationModule,
      ],
      declarations: [AlertDialogComponent, DeleteDialogComponent],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        OrganizationService,
        MockOrganizationService,
        { provide: OrganizationService, useClass: MockOrganizationService },
        ApiService,
        ConfigService,
        MockLoginService,
        Constants,
        SharedService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    })
      .compileComponents();
    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [AlertDialogComponent, DeleteDialogComponent]
      }
    });
  }));


  beforeEach(inject([MockLoginService, MockOrganizationService, Ng4LoadingSpinnerService, OrganizationService, Router, MatDialog],
    (mockLoginService, service, spinnerservice, organizationService, routers, dailog) => {
      mockOrganizationService = service;
      // dialog = matdialog;
      // inventoryService = inventoryservice;
      // mockTicketCreationService = mockTicketService;
      // mockDataTicketDetailService = mockService;
      orgObject = new OrganizationComponent(spinnerservice, organizationService, routers, dailog);
      mockLoginService.login().subscribe((responseValue) => {
        sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
      });
      mockLoginService.loginByOtherUser().subscribe(responseValue => {
        sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
      });
    }));



  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    sessionStorage.removeItem('currentUser');
  });


  it('should create a component', () => {
    expect(component).toBeTruthy();
  });

  it('should call nginit', () => {
    component.ngOnInit();
    spyOn(component, 'ngOnInit');
    // tslint:disable-next-line:no-unused-expression
    expect(component.ngOnInit).toHaveBeenCalled;
    spyOn(component, 'intializeCurrentUser');
    // tslint:disable-next-line:no-unused-expression
    expect(component.intializeCurrentUser).toHaveBeenCalled;
    spyOn(component, 'getAllOrganization');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganization).toHaveBeenCalled;
  });

  it('should run #adduser', () => {
    component.adduser();
    spyOn(component, 'adduser');
    // tslint:disable-next-line:no-unused-expression
    expect(component.adduser).toHaveBeenCalled;
  });

  it('should run #Updateorganization', () => {
    component.Updateorganization({ uuid: 'QW23wT' });
    spyOn(component, 'Updateorganization');
    // tslint:disable-next-line:no-unused-expression
    expect(component.Updateorganization).toHaveBeenCalled;

  });
  it('should run #intializeCurrentUser', () => {
    component.intializeCurrentUser();
    spyOn(component, 'intializeCurrentUser');
    // tslint:disable-next-line:no-unused-expression
    expect(component.intializeCurrentUser).toHaveBeenCalled;
  });
  it('should run #getAllOrganization', () => {
    component.getAllOrganization();
    spyOn(component, 'getAllOrganization');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganization).toHaveBeenCalled;
  });
  it('should run #getAllOrganization and return no Organization data', () => {
    orgObject.getAllOrganization();
    spyOn(component, 'getAllOrganization');
    // tslint:disable-next-line:no-unused-expression
    expect(component.getAllOrganization).toHaveBeenCalled;
  });
  it('should run #Popup', () => {
    component.Popup();
    spyOn(component, 'Popup');
    // tslint:disable-next-line:no-unused-expression
    expect(component.Popup).toHaveBeenCalled;
  });
  it('should run #Opendialog', () => {
    component.Opendialog({});
    spyOn(component, 'Opendialog');
    // tslint:disable-next-line:no-unused-expression
    expect(component.Opendialog).toHaveBeenCalled;
  });
  it('should run #deleteorganization', () => {
    component.deleteorganization({ uuid: 'EW23VF' });
    spyOn(component, 'deleteorganization');
    // tslint:disable-next-line:no-unused-expression
    expect(component.deleteorganization).toHaveBeenCalled;
  });

  it('click matHeader should calling sortingDataAccessor function', () => {
    const matHeaderFirstEl = fixture.debugElement.query(By.css('.mat-column-Id'));
    console.log('matHeaderFirst ----- ', matHeaderFirstEl);
    matHeaderFirstEl.nativeElement.click();
    const matHeaderSecondEl = fixture.debugElement.query(By.css('.mat-column-Organization'));
    matHeaderSecondEl.nativeElement.click();
    const matHeaderThirdEl = fixture.debugElement.query(By.css('.mat-column-PolypmCustomerCode'));
    matHeaderThirdEl.nativeElement.click();
    fixture.detectChanges();
  });



  // it('should call Popup', () => {

  //   component.dialogConfig = new MatDialogConfig();
  //   component.Popup();
  //   spyOn(component, 'Popup');
  //   expect(component.Popup).toBeTruthy();

  // });

  // it('should call Opendialog2', () => {

  //   component.dialogConfig = new MatDialogConfig();
  //   component.Opendialog({ data: "test" });
  //   spyOn(component, 'Opendialog');
  //   expect(component.Opendialog).toBeTruthy();
  // });


  // it('should call getAllOrganization', () => {

  //   component.listOfOrganization = [];
  //   component.testArray = [];
  //   component.dataSource = new MatTableDataSource();
  //   component.getAllOrganization();
  //   spyOn(component, 'getAllOrganization');
  //   expect(component.getAllOrganization).toBeTruthy();
  // });


  // it('should call deleteorganization', () => {

  //   component.deleteorganization({ uuid: "1234" });
  //   spyOn(component, 'deleteorganization');
  //   expect(component.deleteorganization).toBeTruthy();
  // });

  // it('should call adduser and Updateorganization', () => {

  //   component.adduser();
  //   spyOn(component, 'adduser');
  //   expect(component.adduser).toBeTruthy();

  //   component.Updateorganization({ uuid: "1234" });
  //   spyOn(component, 'Updateorganization');
  //   expect(component.Updateorganization).toBeTruthy();
  // });


});
