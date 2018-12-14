import { TicketService } from './ticket.service';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { TicketComponent } from './ticket.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SidenavModule } from '../../sidenav/sidenav.module';
import { MatPaginatorModule } from '@angular/material';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Constants } from '../../config/Constant';
import { AuthGuard } from '../../login/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { SharedService } from '../../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod, XHRBackend, HttpModule } from '@angular/http';


describe('TicketService', () => {
    let service;


    const apiService: any = {
        // mock properties here
    };

    const configService: any = {
        // mock properties here
    };
    const mockService = {
        getAllTicket: jasmine.createSpy('getAllTicket').and.returnValue(Observable.of('getAllTicket called')),
        getAllTicketByOrg: jasmine.createSpy('getAllTicketByOrg').and.returnValue(Observable.of('getAllTicketByOrg called')),
        searchcomments: jasmine.createSpy('searchcomments').and.returnValue(Observable.of('searchcomments called')),
        Orgsearchcomments: jasmine.createSpy('Orgsearchcomments').and.returnValue(Observable.of('Orgsearchcomments called')),
        getSearchResult: jasmine.createSpy('getSearchResult').and.returnValue(Observable.of('getSearchResult called')),
        getSearchResultByOrgId: jasmine.createSpy('getSearchResultByOrgId').and.returnValue(Observable.of('getSearchResultByOrgId called')),
        getFilterValueByOrgId: jasmine.createSpy('getFilterValueByOrgId').and.returnValue(Observable.of('getFilterValueByOrgId called')),
        getFilterValue: jasmine.createSpy('getFilterValue').and.returnValue(Observable.of('getFilterValue called')),
        getData: jasmine.createSpy('getData').and.returnValue(Observable.of('getData called')),
        getDataByOrgId: jasmine.createSpy('getDataByOrgId').and.returnValue(Observable.of('getDataByOrgId called')),
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([
                    {
                        path: 'ticket',
                        component: TicketComponent,
                        canActivate: [AuthGuard]
                    }
                ]),
                RouterModule,
                BrowserModule,
                BrowserAnimationsModule,
                HttpClientModule,
                HttpModule,
                CommonModule,
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                MatSelectModule,
                MatSortModule,
                FormsModule,
                MatCardModule,
                ReactiveFormsModule,
                SidenavModule,
                MatPaginatorModule,
                MatDialogModule
            ],
            declarations: [
                TicketComponent
            ],
            providers: [
                { provide: XHRBackend, useClass: MockBackend },
                TicketService,
                ApiService,
                ConfigService,
                {
                    provide: TicketService,
                    useValue: mockService
                },
                SharedService,
                Constants,
                Ng4LoadingSpinnerService,
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
    }));

    // beforeEach(inject([LoginService], (loginService) => {
    //     service = loginService;
    // }));

    beforeEach(() => {
        service = new TicketService(apiService, configService);
    });


    it('should run #getAllTicket()', inject([TicketService, XHRBackend], (ticketService, mockBackend) => {
        // const result = getAllTicket();
        // const mockResponse = {
        //     data: { username: 'testusername', password: '1111111' }
        // };
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
            })));
        });
        ticketService.getAllTicket().subscribe((responseValue) => {
            console.log('getAllTickets values are --------- ', responseValue);
        });
    }));

    // it('should run #getAllTicketByOrg()', async () => {
    //     // const result = getAllTicketByOrg(uuid);
    // });

    it('should run #getAllTicketByOrg()', inject([TicketService, XHRBackend], (ticketService, mockBackend) => {
        // const result = getAllTicket();
        const mockResponse = {
            data: { username: 'testusername', password: '1111111' }
        };
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });
        ticketService.getAllTicketByOrg('NEWC01').subscribe((responseValue) => {
            console.log('getAllTickets values are --------- ', responseValue);
        });
    }));

    // // it('should run #searchcomments()', async () => {
    // //     // const result = searchcomments(searchtext);
    // // });

    it('should run #searchcomments()', inject([TicketService, XHRBackend], (ticketService, mockBackend) => {
        // const result = getAllTicket();
        // const mockResponse = {
        //     data: { username: 'testusername', password: '1111111' }
        // };
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                // body: JSON.stringify(mockResponse)
            })));
        });
        ticketService.searchcomments('search').subscribe((responseValue) => {
            console.log('getAllTickets values are --------- ', responseValue);
        });
    }));

    // it('should run #Orgsearchcomments()', async () => {
    //     // const result = Orgsearchcomments(searchtext, code);
    // });

    it('should run #Orgsearchcomments()', inject([TicketService, XHRBackend], (ticketService, mockBackend) => {
        // const result = getAllTicket();
        // const mockResponse = {
        //     data: { username: 'testusername', password: '1111111' }
        // };
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                // body: JSON.stringify(mockResponse)
            })));
        });
        ticketService.Orgsearchcomments('search', 'NEWC01').subscribe((responseValue) => {
            console.log('getAllTickets values are --------- ', responseValue);
        });
    }));

    // it('should run #getSearchResult()', async () => {
    //     // const result = getSearchResult(pageIndex, pageSize, sortLabel, sortDirection,
    //     // organization, createdBy, assignedTo, status, search);
    // });

    it('should run #getSearchResult()', inject([TicketService, XHRBackend], (ticketService, mockBackend) => {
        // const result = getAllTicket();
        // const mockResponse = {
        //     data: { username: 'testusername', password: '1111111' }
        // };
        mockBackend.connections.subscribe((connection) => {
            connection.mockRespond(new Response(new ResponseOptions({
                // body: JSON.stringify(mockResponse)
            })));
        });
        ticketService.getSearchResult(1, 1, 'OrderNumber', 'asc',
            'NEWC01', 'createdUser', 'assignedUser', 'status', 'search').subscribe((responseValue) => {
                console.log('getAllTickets values are --------- ', responseValue);
            });
    }));

    // it('should run #getSearchResultByOrgId()', async () => {
    //     // const result = getSearchResultByOrgId(pageIndex, pageSize,
    //     // sortLabel, sortDirection, organization, createdBy, assignedTo, status, search, orgId);
    // });

    // it('should run #getFilterValueByOrgId()', async () => {
    //     // const result = getFilterValueByOrgId(orgId);
    // });

    // it('should run #getFilterValue()', async () => {
    //     // const result = getFilterValue();
    // });

    // it('should run #getData()', async () => {
    //     // const result = getData(pageNumber, pageSize, sortLabel, sortDirection, search, createdBy, assignedTo, status, organization);
    // });

    // it('should run #getDataByOrgId()', async () => {
    //     // const result = getDataByOrgId(pageNumber, pageSize, sortLabel, sortDirection, search, createdBy, assignedTo, status, orgId);
    // });

});
