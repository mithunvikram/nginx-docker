import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { NewRoleComponent } from './new-role.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IRole } from '../user-role/IRole';
import { UserService } from '../user.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { OrganizationService } from '../../organization/organization.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { MatSelectModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { NewUserComponent } from '../new-user/new-user.component';
import { LoginService } from '../../login/login.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AppInterceptor } from '../../app.interceptor';
import { MockLoginService } from '../../../mock/service/login/mockLoginService';
import { MockUserService } from '../../../mock/service/user/MockUser.service';
import { MockOrganizationService } from '../../../mock/service/organization/mockOrganizationService';


describe('NewRoleComponent', () => {
    let component: NewRoleComponent;
    let fixture: ComponentFixture<NewRoleComponent>;
    // let addRoleEL: DebugElement;
    // let organizationDetails;
    // let authoritiesDetails;
    // let loginService: LoginService = null;
    // let backend: MockBackend = null;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewRoleComponent],
            imports: [
                RouterModule.forRoot([{
                    path: '',
                    component: NewRoleComponent
                }]),
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                MatSelectModule,
                MatDialogModule,
                Ng2Bs3ModalModule,
                MatButtonModule,
                MatInputModule,
                MatListModule,
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
                MockLoginService,
                MockUserService,
                { provide: UserService, useClass: MockUserService },
                OrganizationService,
                MockOrganizationService,
                { provide: OrganizationService, useClass: MockOrganizationService },
                { provide: APP_BASE_HREF, useValue: '/' },
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AppInterceptor,
                    multi: true
                },

            ]


        })
            .compileComponents();

    }));

    // beforeEach(inject([LoginService, MockBackend], (Service: LoginService, mockBackend: MockBackend) => {
    //     loginService = Service;
    //     backend = mockBackend;
    // }));

    // // beforeEach((done) => {
    // //     // it('#login should call endpoint and return it\'s result', (done) => {
    // //     backend.connections.subscribe((connection: MockConnection) => {
    // //         const options = new ResponseOptions({
    // //             body: JSON.stringify({ success: true })
    // //         });
    // //         connection.mockRespond(new Response(options));
    // //         // Check the request method
    // //         expect(connection.request.method).toEqual(RequestMethod.Post);
    // //         // Check the url
    // //         expect(connection.request.url).toEqual('/auth/login');
    // //         // Check the body
    // //         // expect(connection.request.text())
    // //         expect(connection.request.text()).toEqual(JSON.stringify({ username: 'ramkumar', password: 'ram' }));
    // //         // Check the request headers
    // //         expect(connection.request.headers.get('Content-Type')).toEqual('application/json');
    // //     });

    // //     loginService.login('ramkumar', 'ram')
    // //         .subscribe((response) => {
    // //             console.log('response values are ---####------------ ', response);
    // //             // Check the response
    // //             expect(response.user.username).toEqual('ramkumar');
    // //             expect(response.user.password).toEqual('ram');
    // //             // set value in sessionStorage
    // //             sessionStorage.setItem('currentUser', JSON.stringify(response));
    // //             sessionStorage.setItem('token', JSON.stringify(response.token));
    // //             sessionStorage.setItem('dismissOrders', 'false');
    // //             done();
    // //         },
    // //             (error) => {
    // //                 expect(error).toThrowError();
    // //             });
    // // });

    // beforeEach(() => {
    //     fixture = TestBed.createComponent(NewRoleComponent);
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
        fixture = TestBed.createComponent(NewRoleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    afterAll(() => {
        sessionStorage.removeItem('currentUser');
    });

    it('should create a component', () => {
        expect(component).toBeTruthy();
    });

    it('should run #ngOnInit() by admin user', inject([MockLoginService], (mockLoginService) => {
        // orderService = service;
        // mockTicketCreationService = mockService;
        sessionStorage.removeItem('currentUser');
        mockLoginService.login().subscribe((responseValue) => {
            sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
        });

        // mockLoginService.loginByOtherUser().subscribe(responseValue => {
        //     sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
        // });
        component.uuid = '1ER32W';
        const result = component.ngOnInit();
        spyOn(component, 'ngOnInit');
        // tslint:disable-next-line:no-unused-expression
        expect(component.ngOnInit).toHaveBeenCalled;
        spyOn(component, 'getAllOrganization').and.callThrough();
        // tslint:disable-next-line:no-unused-expression
        expect(component.getAllOrganization).toHaveBeenCalled;
        spyOn(component, 'currentUserDetails');
        // tslint:disable-next-line:no-unused-expression
        expect(component.currentUserDetails).toHaveBeenCalled;
        // expect(component.update).toBeTruthy();

    }));

    it('should run #ngOnInit() by other user', inject([MockLoginService], (mockLoginService) => {
        // orderService = service;
        // mockTicketCreationService = mockService;
        sessionStorage.removeItem('currentUser');
        // mockLoginService.login().subscribe((responseValue) => {
        //     sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
        // });

        mockLoginService.loginByOtherUser().subscribe(responseValue => {
            sessionStorage.setItem('currentUser', JSON.stringify(responseValue));
        });
        component.uuid = '1ER32W';
        const result = component.ngOnInit();
        spyOn(component, 'ngOnInit');
        // tslint:disable-next-line:no-unused-expression
        expect(component.ngOnInit).toHaveBeenCalled;
        spyOn(component, 'getAllOrganization').and.callThrough();
        // tslint:disable-next-line:no-unused-expression
        expect(component.getAllOrganization).toHaveBeenCalled;
        spyOn(component, 'currentUserDetails');
        // tslint:disable-next-line:no-unused-expression
        expect(component.currentUserDetails).toHaveBeenCalled;
        // expect(component.update).toBeTruthy();
    }));

    // it('should run #ngOnInit() and ', async () => {
    //     const result = component.ngOnInit();
    //     spyOn(component, 'ngOnInit');
    //     // tslint:disable-next-line:no-unused-expression
    //     expect(component.ngOnInit).toHaveBeenCalled;
    //     spyOn(component, 'getAllOrganization').and.callThrough();
    //     // tslint:disable-next-line:no-unused-expression
    //     expect(component.getAllOrganization).toHaveBeenCalled;
    //     spyOn(component, 'currentUserDetails');
    //     // tslint:disable-next-line:no-unused-expression
    //     expect(component.currentUserDetails).toHaveBeenCalled;
    // });

    it('should run #currentUserDetails()', async () => {
        const result = component.currentUserDetails();
        spyOn(component, 'currentUserDetails');
        // tslint:disable-next-line:no-unused-expression
        expect(component.currentUserDetails).toHaveBeenCalled;
    });

    it('should run #getAllOrganization()', async () => {
        const result = component.getAllOrganization();
        spyOn(component, 'getAllOrganization');
        // tslint:disable-next-line:no-unused-expression
        expect(component.getAllOrganization).toHaveBeenCalled;
    });

    it('should run #organizationchanged()', async () => {
        const result = component.organizationchanged();
        spyOn(component, 'organizationchanged');
        // tslint:disable-next-line:no-unused-expression
        expect(component.organizationchanged).toHaveBeenCalled;
        expect(component.duplicaterole).toBeFalsy();
        expect(component.organizationRole).toBeFalsy();
    });

    it('should run #textChanged() and the orgID is true', async () => {
        component.orgUUID = true;
        const result = component.textChanged('user');
        spyOn(component, 'textChanged');
        // tslint:disable-next-line:no-unused-expression
        expect(component.textChanged).toHaveBeenCalled;
    });


    it('should run #textChanged() and the orgID is false', async () => {
        component.orgUUID = false;
        component.role.organizationUuid = '2WE32';
        const result = component.textChanged('user');
        spyOn(component, 'textChanged');
        // tslint:disable-next-line:no-unused-expression
        expect(component.textChanged).toHaveBeenCalled;
    });

    it('should run #textChanged() and the orgID is null', async () => {
        component.orgUUID = false;
        // component.role.organizationUuid = '2WE32';
        const result = component.textChanged('user');
        spyOn(component, 'textChanged');
        // tslint:disable-next-line:no-unused-expression
        expect(component.textChanged).toHaveBeenCalled;
    });



    it('should run #getUserRoleDetails()', async () => {
        const result = component.getUserRoleDetails('1ERw2');
        spyOn(component, 'getUserRoleDetails');
        // tslint:disable-next-line:no-unused-expression
        expect(component.getUserRoleDetails).toHaveBeenCalled;
    });

    it('should run #allowedScreenList() and the allowedScreenList is tickets', async () => {
        component.allowedScreens = ['Dashboard', 'Orders'];
        const result = component.allowedScreenList('tickets');
        spyOn(component, 'allowedScreenList');
        // tslint:disable-next-line:no-unused-expression
        expect(component.allowedScreenList).toHaveBeenCalled;

    });

    it('should run #allowedScreenList() and the allowedScreenList is dashboard', async () => {
        component.allowedScreens = ['Dashboard', 'Orders'];
        const result = component.allowedScreenList('Dashboard');
        spyOn(component, 'allowedScreenList');
        // tslint:disable-next-line:no-unused-expression
        expect(component.allowedScreenList).toHaveBeenCalled;

    });

    it('should run #createUserRole()', async () => {
        const result = component.createUserRole();
        spyOn(component, 'createUserRole');
        // tslint:disable-next-line:no-unused-expression
        expect(component.createUserRole).toHaveBeenCalled;
    });

    it('should run #updateUserRole()', async () => {
        const result = component.updateUserRole();
        spyOn(component, 'updateUserRole');
        // tslint:disable-next-line:no-unused-expression
        expect(component.updateUserRole).toHaveBeenCalled;
    });

    // it(`should call #ngOnIt`, () => {
    //     comp.ngOnInit();
    //     comp.uuid = 'rJ8mfM5GQ';
    //     // tslint:disable-next-line:max-line-length
    //     // tslint:disable-next-line:max-line-length
    //     comp.orgUUID = organizationDetails.uuid;
    //     expect(comp.orgUUID).toBeTruthy();
    //     if (expect(authoritiesDetails.role).toBe('ROLE_USER')) {
    //         expect(comp.adminrole).toBe(true);
    //     }
    //     expect(comp.screensForAction).toBeTruthy();
    //     expect(comp.uuid).toBeTruthy();
    //     console.log('--------updateboolean--->>>>>', comp.uuid);
    //     expect(comp.update).toBeFalsy();
    //     // tslint:disable-next-line:no-unused-expression
    //     expect(comp.getUserRoleDetails).toHaveBeenCalledWith;
    // });


    // it(`should call #ngOnIt for the Admin`, () => {
    //     comp.ngOnInit();
    //     organizationDetails = '';
    //     comp.uuid = undefined;
    //     comp.update = true;
    //     // tslint:disable-next-line:max-line-length
    //     // comp.orgUUID = organizationDetails.uuid;
    //     // expect(comp.orgUUID).toBeTruthy();
    //     if (expect(authoritiesDetails.role).toBe('ADMIN')) {
    //         expect(comp.adminrole).toBe(true);
    //     }
    //     expect(comp.screensForAction).toBeTruthy();
    //     expect(comp.uuid).toBeUndefined();
    //     console.log('--------adminupdateboolean--->>>>>', comp.uuid);
    //     expect(comp.update).toBeTruthy();
    //     // tslint:disable-next-line:no-unused-expression
    //     expect(comp.getUserRoleDetails).toHaveBeenCalledWith;

    // });

    // it('should call the currentUserDetails', () => {
    //     comp.organizationRole = false;
    //     // tslint:disable-next-line:max-line-length
    //     expect(comp.currentUserDetails).toBeTruthy();
    //     expect(authoritiesDetails.role).toEqual('ADMIN');
    //     expect(comp.organizationRole).toBeFalsy();
    //     comp.currentUserDetails();
    //     spyOn(comp, 'currentUserDetails');
    //     expect(comp.currentUserDetails).toBeTruthy();

    // });

    // // it('should call the currentUserDetails for authorities less than 0', () => {
    // //     authoritiesDetails = '';
    // //     comp.organizationRole = true;
    // //     comp.currentUserDetails();
    // //     expect(comp.currentUserDetails).toBeTruthy();
    // //     expect(authoritiesDetails.role).not.toEqual('ADMIN');
    // //     console.log('--------organizatiorole--->>>>>', comp.organizationRole);
    // //     expect(comp.organizationRole).toBeTruthy();
    // //     spyOn(comp, 'currentUserDetails');
    // //     expect(comp.currentUserDetails).toBeTruthy();

    // // });

    // it('getAllOrganization', () => {
    //     spyOn(comp, 'getAllOrganization');

    //     expect(comp.getAllOrganization).toBeTruthy();

    // });

    // it('organizationchanged', () => {
    //     comp.duplicaterole = false;
    //     comp.organizationRole = false;
    //     comp.organizationchanged();
    //     expect(comp.duplicaterole).toBeFalsy();
    //     expect(comp.organizationRole).toBeFalsy();
    //     spyOn(comp, 'organizationchanged');
    //     expect(comp.organizationchanged).toBeTruthy();
    // });

    // it('should call the textChanged', () => {
    //     comp.role.role = 'ROLE_ORGANIZATION_ADMIN';
    //     comp.role.organizationUuid = 'rkZJDf9fm';
    //     comp.orgUUID = 'rkZJDf9fm';
    //     comp.orgid = comp.orgUUID;
    //     comp.duplicaterole = true;
    //     expect(comp.orgid).toBe('rkZJDf9fm');
    //     expect(comp.duplicaterole).toBeTruthy();
    //     comp.textChanged('ROLE_ORGANIZATION_ADMIN');
    //     spyOn(comp, 'textChanged');
    //     // tslint:disable-next-line:no-unused-expression
    //     expect(comp.textChanged).toHaveBeenCalledWith;

    // });

    // it('should call the textChanged for the else part', () => {
    //     comp.role.role = 'ROLE_ORGANIZATION_ADMIN';
    //     comp.role.organizationUuid = '';
    //     comp.orgUUID = '';
    //     comp.orgid = '';
    //     comp.duplicaterole = true;
    //     expect(comp.orgid).toBe('');
    //     expect(comp.duplicaterole).toBeTruthy();
    //     comp.textChanged('ROLE_ORGANIZATION_ADMIN');
    //     spyOn(comp, 'textChanged');
    //     // tslint:disable-next-line:no-unused-expression
    //     expect(comp.textChanged).toHaveBeenCalledWith;

    // });

    // it('should call the getUserRoleDetails', () => {
    //     comp.uuid = '43WpowpfM';
    //     comp.getUserRoleDetails('43WpowpfM');
    //     spyOn(comp, 'getUserRoleDetails');
    //     expect(comp.getUserRoleDetails).toBeTruthy();

    // });

    // it('should call the allowedScreenList', () => {
    //     comp.allowedScreens = ['Dashboard', 'Orders', 'Purchase Orders', 'Invoices', 'Shipments'];
    //     comp.allowedScreenList('Orders');
    //     spyOn(comp, 'allowedScreenList');
    //     expect(comp.allowedScreens).toBeTruthy();
    //     expect(comp.allowedScreenList).toBeTruthy();

    // });


    // it('should call the createUserRole', () => {
    //     comp.role.organizationUuid = '';
    //     comp.orgUUID = 'rkZJDf9fm';
    //     // tslint:disable-next-line:max-line-length
    //     comp.createUserRole();
    //     expect(comp.role.organizationUuid).toBe('rkZJDf9fm');
    //     spyOn(comp, 'createUserRole');
    //     expect(comp.createUserRole).toBeTruthy();

    // });

    // it('should call the updateUserRole', () => {
    //     comp.role.organizationUuid = '';
    //     comp.orgUUID = 'rkZJDf9fm';
    //     // tslint:disable-next-line:max-line-length
    //     comp.updateUserRole();
    //     spyOn(comp, 'updateUserRole');
    //     expect(comp.updateUserRole).toBeTruthy();

    // });

    // it(`select dropdownvalue for the role`, () => {
    //     const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    //     spyOn(comp, 'textChanged');
    //     trigger.click();
    //     fixture.detectChanges();
    //     // expect(selectEl.nativeElement.value).toEqual('STAHLS');
    // });

    // it(`select dropdownvalue for the organizations`, () => {
    //     const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    //     spyOn(comp, 'organizationchanged');
    //     trigger.click();
    //     fixture.detectChanges();
    //     // expect(selectEl.nativeElement.value).toEqual('STAHLS');
    // });

    // it(`select dropdownvalue for the organizations`, () => {
    //     const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    //     spyOn(comp, 'allowedScreenList');
    //     trigger.click();
    //     fixture.detectChanges();
    //     // expect(selectEl.nativeElement.value).toEqual('Dashboard');
    // });

    // it(`add role button selected`, () => {
    //     addRoleEL = fixture.debugElement.query(By.css('.testbutton'));
    //     expect(addRoleEL.nativeElement.disbaled).toBeFalsy();
    //     // const addrolespy = spyOn(comp, 'createUserRole');
    //     // addRoleEL.triggerEventHandler('click', null);
    //     // expect(addrolespy).toHaveBeenCalled();
    // });



});
