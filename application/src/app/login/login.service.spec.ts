import { async, TestBed, getTestBed, inject } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterModule, Routes, Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { SharedService } from '../shared/shared.service';
import { Constants } from '../config/Constant';
import { ConfigService } from '../config/config.service';
import { ApiService } from '../config/api.service';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod, XHRBackend } from '@angular/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';

describe('LoginService', () => {
    // let injector: TestBed;
    let service: LoginService;
    // let httpMock: HttpTestingController;
    const mockService = {
        login: jasmine.createSpy('login').and.returnValue(Observable.of({ username: 'username', password: 'password' })),
        logout: jasmine.createSpy('logout').and.returnValue(Observable.of('logout called')),
        getStatus: jasmine.createSpy('getStatus').and.returnValue(Observable.of('getStatus called')),
        sendMail: jasmine.createSpy('sendMail').and.returnValue(Observable.of('sendMail called'))
    };
    const naviageRouter = {
        navigate: jasmine.createSpy('navigate')
    };


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                RouterModule.forRoot([{
                    path: '',
                    component: LoginComponent
                }]),
                BrowserModule,
                FormsModule,
                ReactiveFormsModule,
                Ng2Bs3ModalModule,
                RouterTestingModule,
                HttpClientModule,
            ],
            declarations: [
                LoginComponent
            ],
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
                LoginService,
                {
                    provide: LoginService,
                    useValue: mockService
                },
                { provide: XHRBackend, useClass: MockBackend },
                { provide: Router, useValue: naviageRouter },
                ApiService,
                ConfigService,
                Constants,
                SharedService,
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        });
        // injector = getTestBed();
        // service = injector.get(LoginService);
        // httpMock = injector.get(HttpTestingController);
    });

    beforeEach(inject([LoginService, HttpClient, Router, ApiService, ConfigService],
        (loginService, http, router, api, config) => {
            // service = loginService;
            service = new LoginService(http, router, api, config);
        }));

    // beforeEach( => {

    // });


    it('should run #login()', inject([LoginService, XHRBackend], (newLoginService, mockBackend) => {
        // const result = login(username, password);
        const mockResponse = {
            data: { username: 'testusername', password: '1111111' }
        };
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });
        newLoginService.login('admin', 'admin').subscribe((responseValue) => {
            console.log('newloginservice called 11', responseValue);
        });
    }));

    it('should run #logout()', inject([LoginService, XHRBackend], (newLoginService, mockBackend) => {
        // const result = logout(userDetails);
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify('mockResponse')
            })));
        });
        service.logout('userDetails').subscribe((responseValue) => {
            console.log('logout values are ------------- ', responseValue);
            expect(naviageRouter.navigate).toHaveBeenCalledWith(['']);
        });
    }));

    it('should run #getStatus()', inject([LoginService, XHRBackend], (newLoginService, mockBackend) => {
        // const result = getStatus();
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify('mockResponse')
            })));
        });
        service.getStatus().subscribe((responseValue) => {
            console.log('get status response values ', responseValue);
        });
    }));

    it('should run #sendMail()', inject([LoginService, XHRBackend], (newLoginService, mockBackend) => {
        // const result = sendMail(data);
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify('mockResponse')
            })));
        });
        service.sendMail('mail').subscribe((responseValue) => {
            console.log('Mail response values ', responseValue);
        });
    }));

});



// it('should run #login()', inject([LoginService, XHRBackend], (newLoginService, mockBackend) => {
//     // const result = login(username, password);
//     const mockResponse = {
//         data: { username: 'testusername', password: '1111111' }
//     };
//     mockBackend.connections.subscribe((connection) => {
//         console.log('newloginservice called 222');
//         connection.mockRespond(new Response(new ResponseOptions({
//             body: JSON.stringify(mockResponse)
//         })));
//     });
//     newLoginService.login('admin', 'admin').subscribe((responseValue) => {
//         console.log('newloginservice called 11');
//     });
// }));



// it('should run #login()', async () => {
//     // const result = login(username, password);
//     let fakeResponse = null;

//     // Call the service function and subscribe to it to catch the fake response coming from the mock.
//     service.login('admin', 'admin').subscribe((value) => {
//         console.log('entering into MockLogin service');
//         // in here value will be whatever you put as returnValue (remember to keep the observable.of())
//         fakeResponse = value;
//     });

//     // expects as in any test.
//     expect(fakeResponse).toBeDefined();
//     expect(fakeResponse).toBe('your session object mock goes here');
// });
