import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';

import { NewUserComponent } from './new-user.component';
import { Iuser } from '../Iuser';
import { IRole } from '../user-role/IRole';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterModule } from '@angular/router';
import { IOrganization } from '../../organization/IOrganization';
import { OrganizationService } from '../../organization/organization.service';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { MatSelectModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockLoginService } from '../../../mock/service/login/mockLoginService';
import { MockUserService } from '../../../mock/service/user/MockUser.service';
import { MockOrganizationService } from '../../../mock/service/organization/mockOrganizationService';

describe('NewUserComponent', () => {
    let comp: NewUserComponent;
    let fixture: ComponentFixture<NewUserComponent>;
    let de: DebugElement;
    let firstNameEl: DebugElement;
    let lastNameEl: DebugElement;
    let emailEl: DebugElement;
    let usernameEl: DebugElement;
    let passwordEl: DebugElement;
    let organizationEl: DebugElement;
    let roleEl: DebugElement;
    let adduserEl: DebugElement;
    let updateuserEl: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewUserComponent],
            imports: [
                RouterModule.forRoot([{
                    path: '',
                    component: NewUserComponent
                }]),
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                MatSelectModule,
                MatDialogModule,
                Ng2Bs3ModalModule,
                MatListModule,
                MatButtonModule,
                MatInputModule,
                MatCardModule,
                SidenavModule,
                HttpClientModule,
                BrowserAnimationsModule,
                NoopAnimationsModule
            ],
            providers: [
                UserService,
                ApiService,
                ConfigService,
                Constants,
                SharedService,
                { provide: APP_BASE_HREF, useValue: '/' },
                MockLoginService,
                MockUserService,
                { provide: UserService, useClass: MockUserService },
                OrganizationService,
                MockOrganizationService,
                { provide: OrganizationService, useClass: MockOrganizationService },
            ]

        }).compileComponents().then(() => {
            fixture = TestBed.createComponent(NewUserComponent);
            comp = fixture.componentInstance;
            // de = fixture.debugElement.query(By.css('.col-lg-4 col-lg-offset-4'));
            // el = de.nativeElement;
            firstNameEl = fixture.debugElement.query(By.css('.firstname'));
            lastNameEl = fixture.debugElement.query(By.css('.lastname'));
            emailEl = fixture.debugElement.query(By.css('.email'));
            usernameEl = fixture.debugElement.query(By.css('.username'));
            passwordEl = fixture.debugElement.query(By.css('.password'));
            // organizationEl = fixture.debugElement.query(By.css('.organization'));
            // roleEl = fixture.debugElement.query(By.css('.role'));
            adduserEl = fixture.debugElement.query(By.css('.save'));
            updateuserEl = fixture.debugElement.query(By.css('.save'));
        });
    }));

    // beforeEach(() => {
    //     const userdata = {
    //         'token': '12345',
    //         'user': {
    //             'uuid': '',
    //             'username': 'xxxx', 'password': 'xxxx', 'firstname': 'xxxx',
    //             'lastname': 'xxxx', 'email': 'xxxx@gmail.com', 'isDisabled': false,
    //             'Authorities': [{
    //                 'uuid': '', 'role': 'ROLE_DUMMY', 'allowedScreens': 'Dashboard,Orders,Purchase Orders,\
    //           Tickets, Invoices,Shipments, Inventory,Users,Organization'
    //             }],
    //             'organization': [{ 'uuid': '', 'organizationname': '' }], 'organizationUuid': ''
    //         }
    //     };
    //     sessionStorage.setItem('currentUser', JSON.stringify(userdata));
    //     fixture = TestBed.createComponent(NewUserComponent);
    //     comp = fixture.componentInstance;
    //     fixture.detectChanges();
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
        fixture = TestBed.createComponent(NewUserComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });
    afterAll(() => {
        sessionStorage.removeItem('currentUser');
    });



    it(`entering value in createuser input controls`, () => {
        //console.log('firstname element are ----- ', firstNameEl);
        firstNameEl.nativeElement.value = 'kishan';
        lastNameEl.nativeElement.value = 'R';
        emailEl.nativeElement.value = 'kishan@gmail.com';
        usernameEl.nativeElement.value = 'admin';
        passwordEl.nativeElement.value = 'admin';
        // organizationEl.nativeElement.value = 'STAHLS';
        // roleEl.nativeElement.value = 'ADMIN';
        fixture.detectChanges();
    });

    it('after entering value the button should enabled', () => {
        expect(adduserEl.nativeElement.disabled).toBeFalsy();
    });

    it('after updating the value the button should enabled', () => {
        expect(updateuserEl.nativeElement.disabled).toBeFalsy();
    });

    it(`select dropdownvalue for the role`, () => {
        const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
        spyOn(comp, 'getRole');
        trigger.click();
        fixture.detectChanges();
    });

    it(`select dropdownvalue for the organization`, () => {
        const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
        spyOn(comp, 'organizationchanged');
        trigger.click();
        fixture.detectChanges();
    });

    it('should run #getErrorMessage()', async () => {
        comp.getErrorMessage();
        // const result = component.getErrorMessage();
      });
    
      it('should run #ngOnInit()', async () => {
          comp.ngOnInit();
          if(JSON.parse(sessionStorage.getItem('currentUser')).user.organization){
              expect(comp.orgUUID).toBe(JSON.parse(sessionStorage.getItem('currentUser')).user.organization.uuid)
          }
          if(JSON.parse(sessionStorage.getItem('currentUser')).user.Authorities[0].role === 'ADMIN'){
            expect(comp.adminrole).toBe(true);
          }
          
      });
    
    
    
    
      it('should run #getUserRoleList()', async () => {


          comp.roles = [];
          comp.orgUUID = '12345';

          comp.getUserRoleList();
          spyOn(comp, 'getUserRoleList');
          expect(comp.getUserRoleList).toBeTruthy();
        // const result = component.getUserRoleList();
      });

      it('should run #getUserRoleList() with no orgUUID', async () => {


        comp.roles = [];
        comp.orgUUID = null ;

        comp.usrerole = {
            role: "ADMIN",
            organizationUuid: "12345",
            allowedScreens: "[dashboard]"
        };
        comp.roles = [{
            role: "ADMIN",
            organizationUuid: "12345",
            allowedScreens: "[dashboard]"
        }];
        comp.filterrole =[];

        comp.getUserRoleList();
        spyOn(comp, 'getUserRoleList');
        expect(comp.getUserRoleList).toBeTruthy();
      // const result = component.getUserRoleList();
    });



    it('should detect textChanged() method', async () => {


        comp.update = false;
        comp.users.firstname = 'xxxx';
        comp.duplicateuser = false;

        comp.textChanged();
        spyOn(comp, 'textChanged');
        expect(comp.textChanged).toBeTruthy();
      
    });


    it('should call getUserDetails method', async () => {


        comp.orgName = [];
        comp.users = {
            'uuid': '12345',
            'firstname': 'xxxx',
            'lastname': 'xxxx',
            'email': 'x@gmail.com',
            'rol': '',
            'position': '',
            'userimage': '',
            'username': '',
            'password': '',
            'organization': [],
            'Authorities': []
          };
        comp.duplicateuser = false;

        comp.getUserDetails('12345');
        spyOn(comp, 'getUserDetails');
        expect(comp.getUserDetails).toBeTruthy();
      
    });

    it('should call createUser method', async () => {


        comp.updaterole = [];
        comp.userrole = 'test';
        comp.userroleuuid = 'test2';

        comp.createUser();
        spyOn(comp, 'createUser');
        expect(comp.createUser).toBeTruthy();
      
    });

    // it('should call getRole method', async () => {


    //     comp.roles = [{
    //         role: "ADMIN",
    //         organizationUuid: "12345",
    //         allowedScreens: "[dashboard]"
    //     }];
    //     comp.updaterole = 'test';

    //     var event
    //     event.value = "ADMIN"
    //     comp.getRole(event);
    //     spyOn(comp, 'getRole');
    //     expect(comp.getRole).toBeTruthy();
      
    // });

    it('should call updateUser method', async () => {


        comp.roles = [{
            role: "ADMIN",
            organizationUuid: "12345",
            allowedScreens: "[dashboard]"
        }];
        comp.updaterole = 'test';
        comp.userrole = 'ADMIN';
        comp.userroleuuid = '12345';

        comp.updateUser();
        spyOn(comp, 'updateUser');
        expect(comp.updateUser).toBeTruthy();
      
    });
    
    
});
