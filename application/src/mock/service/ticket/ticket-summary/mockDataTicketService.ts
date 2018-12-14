import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class MockDataTicketService {
    constructor() { }
    getAllTicket(): Observable<any> {
        // return this.apiService.get(this.configService.api_url + Constants.getalltickets);
        return Observable.of([]);
    }
    getAllTicketByOrg(uuid): Observable<any> {
        return Observable.of([]);
    }
    searchcomments(searchtext): Observable<any> {
        return  Observable.of([]);
    }
    Orgsearchcomments(searchtext, code): Observable<any> {
        return  Observable.of([]);
    }
    getSearchResult(pageIndex: number,
        pageSize: number,
        sortLabel: string,
        sortDirection: string,
        organization: string[],
        createdBy: string[],
        assignedTo: string[],
        status: string[],
        search: any): Observable<any> {
        search.pageIndex = pageIndex;
        search.pageSize = pageSize;
        search.sortLabel = sortLabel;
        search.sortDirection = sortDirection;
        search.organization = organization;
        search.createdBy = createdBy;
        search.assignedTo = assignedTo;
        search.status = status;
        // return this.apiService.post(this.configService.api_url + Constants.Ticketsearch, search);
        return Observable.of([{
            'count': 2,
            'response': [
                {
                    'uuid': 'Ji5Yo7QiX',
                    'id': 14,
                    'Date': '2018-09-26T09:37:41.774Z',
                    'Type': 'Regular',
                    'description': 'testting new one',
                    'Status': 'Assigned',
                    'CloseReasonUuid': null,
                    'createdByUuid': '7XqbWrWmrL',
                    'organizationUuid': 'rkZJDf9fm',
                    'UserUuid': null,
                    'assigned_to': [
                        {
                            'firstname': 'ram',
                            'AssignedUserTickets': {
                                'id': 6,
                                'TicketUuid': 'Ji5Yo7QiX',
                                'UserUuid': '7XqbWrWmrL'
                            }
                        }
                    ],
                    'created_by': {
                        'firstname': 'ram'
                    },
                    'salesorder': [],
                    'organization': {
                        'organizationname': 'NewBalance'
                    }
                },
                {
                    'uuid': '9Oo7mkgLe',
                    'id': 13,
                    'Date': '2018-09-26T09:13:35.858Z',
                    'Type': 'Urgent',
                    'description': 'Testing mail notification excluding initiator',
                    'Status': 'Assigned',
                    'CloseReasonUuid': null,
                    'createdByUuid': 'dgA0C0XbK',
                    'organizationUuid': 'H1b9MM9zQ',
                    'UserUuid': null,
                    'assigned_to': [
                        {
                            'firstname': 'ram',
                            'AssignedUserTickets': {
                                'id': 5,
                                'TicketUuid': '9Oo7mkgLe',
                                'UserUuid': '7XqbWrWmrL'
                            }
                        }
                    ],
                    'created_by': {
                        'firstname': 'supriya'
                    },
                    'salesorder': [],
                    'organization': {
                        'organizationname': 'Stahls'
                    }
                }
            ]
        }]);
    }
    getSearchResultByOrgId(pageIndex: number,
        pageSize: number,
        sortLabel: string,
        sortDirection: string,
        organization: string[],
        createdBy: string[],
        assignedTo: string[],
        status: string[],
        search: any, orgId: any): Observable<any> {
        search.pageIndex = pageIndex;
        search.pageSize = pageSize;
        search.sortLabel = sortLabel;
        search.sortDirection = sortDirection;
        search.orgId = orgId;
        search.organization = organization;
        search.createdBy = createdBy;
        search.assignedTo = assignedTo;
        search.status = status;
        // return this.apiService.post(this.configService.api_url + Constants.Ticketsearchbyid, search);
        return Observable.of([{
            'count': 2,
            'response': [
                {
                    'uuid': 'QhlGY0HAG',
                    'id': 12,
                    'Date': '2018-09-26T09:04:05.833Z',
                    'Type': 'Regular',
                    'description': 'Testing notifications\n',
                    'Status': 'Assigned',
                    'CloseReasonUuid': null,
                    'createdByUuid': 'dgA0C0XbK',
                    'organizationUuid': 'H1b9MM9zQ',
                    'UserUuid': null,
                    'assigned_to': [
                        {
                            'firstname': 'ram',
                            'AssignedUserTickets': {
                                'id': 4,
                                'TicketUuid': 'QhlGY0HAG',
                                'UserUuid': '7XqbWrWmrL'
                            }
                        }
                    ],
                    'created_by': {
                        'firstname': 'supriya'
                    },
                    'salesorder': [],
                    'organization': {
                        'organizationname': 'Stahls'
                    }
                },
                {
                    'uuid': 'gBXqVKR7X',
                    'id': 10,
                    'Date': '2018-09-26T06:52:15.528Z',
                    'Type': 'Regular',
                    'description': 'testing ticket flow with no orders',
                    'Status': 'Assigned',
                    'CloseReasonUuid': null,
                    'createdByUuid': 'Hy-EMGqz7',
                    'organizationUuid': 'H1b9MM9zQ',
                    'UserUuid': null,
                    'assigned_to': [
                        {
                            'firstname': 'ram',
                            'AssignedUserTickets': {
                                'id': 28,
                                'TicketUuid': 'gBXqVKR7X',
                                'UserUuid': '7XqbWrWmrL'
                            }
                        }
                    ],
                    'created_by': {
                        'firstname': 'admin'
                    },
                    'salesorder': [],
                    'organization': {
                        'organizationname': 'Stahls'
                    }
                }
            ]
        }]);
    }
    getFilterValueByOrgId(orgId): Observable<any> {
        // return this.apiService.get(this.configService.api_url + Constants.TicketFilterbyOrgid + orgId);
        // tslint:disable-next-line:max-line-length
        return Observable.of([{ 'createdBy': [{ 'firstname': 'admin' }, { 'firstname': 'ram' }, { 'firstname': 'supriya' }, { 'firstname': 'supriya' }], 'assignedTo': [{ 'firstname': 'Dicks user' }, { 'firstname': 'ram' }, { 'firstname': 'UV' }], 'Status': [{ 'Status': 'Assigned' }, { 'Status': 'Closed' }, { 'Status': 'Open' }, { 'Status': 'Reopen' }] }]);
    }
    getFilterValue(): Observable<any> {
        // return this.apiService.get(this.configService.api_url + Constants.Ticketfilter);
        // tslint:disable-next-line:max-line-length
        return Observable.of([{ 'createdBy': [{ 'firstname': 'admin' }, { 'firstname': 'ram' }, { 'firstname': 'supriya' }, { 'firstname': 'supriya' }, { 'firstname': 'UV' }], 'assignedTo': [{ 'firstname': 'Dicks user' }, { 'firstname': 'ram' }, { 'firstname': 'UV' }], 'Status': [{ 'Status': 'Assigned' }, { 'Status': 'Closed' }, { 'Status': 'Open' }, { 'Status': 'Reopen' }], 'organization': [{ 'organizationname': 'Fanatics' }, { 'organizationname': 'NewBalance' }, { 'organizationname': 'Stahls' }] }]);
    }
    getData(
        pageNumber, pageSize, sortLabel, sortDirection, search,
        createdBy, assignedTo, status, organization): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            createdBy: createdBy,
            assignedTo: assignedTo,
            status: status,
            organization: organization
        };
        return Observable.of([{
            'count': 2,
            'response': [
                {
                    'uuid': 'MJeIUQ2Jt',
                    'id': 30,
                    'Date': '2018-11-19T09:55:13.842Z',
                    'Type': 'Urgent',
                    'description': 'test',
                    'Status': 'Assigned',
                    'CloseReasonUuid': null,
                    'createdByUuid': 'iEBd-p6rQ',
                    'organizationUuid': 'H1b9MM9zQ',
                    'UserUuid': null,
                    'assigned_to': [
                        {
                            'firstname': 'ram',
                            'AssignedUserTickets': {
                                'id': 31,
                                'TicketUuid': 'MJeIUQ2Jt',
                                'UserUuid': '7XqbWrWmrL'
                            }
                        }
                    ],
                    'created_by': {
                        'firstname': 'supriya'
                    },
                    'salesorder': [
                        {
                            'PONumber': 'J957413000',
                            'OrderNumber': 'D16765',
                            'SalesOrderTickets': {
                                'SalesOrderOrderID': 15554,
                                'TicketUuid': 'MJeIUQ2Jt'
                            }
                        }
                    ],
                    'organization': {
                        'organizationname': 'Stahls'
                    }
                },
                {
                    'uuid': 'MggRJ1-We',
                    'id': 29,
                    'Date': '2018-11-17T13:57:25.746Z',
                    'Type': 'Urgent',
                    'description': 'New ticket from dev system.',
                    'Status': 'Assigned',
                    'CloseReasonUuid': null,
                    'createdByUuid': 'Hy-EMGqz7',
                    'organizationUuid': 'H1b9MM9zQ',
                    'UserUuid': null,
                    'assigned_to': [
                        {
                            'firstname': 'UV',
                            'AssignedUserTickets': {
                                'id': 30,
                                'TicketUuid': 'MggRJ1-We',
                                'UserUuid': 'Q00Y2t7N1'
                            }
                        }
                    ],
                    'created_by': {
                        'firstname': 'admin'
                    },
                    'salesorder': [
                        {
                            'PONumber': 'J664114000',
                            'OrderNumber': 'D15709',
                            'SalesOrderTickets': {
                                'SalesOrderOrderID': 14498,
                                'TicketUuid': 'MggRJ1-We'
                            }
                        }
                    ],
                    'organization': {
                        'organizationname': 'Stahls'
                    }
                }
            ]
        }]);
    }
    getDataByOrgId(
        pageNumber, pageSize, sortLabel, sortDirection, search, createdBy, assignedTo, status, orgId): Observable<any[]> {

        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            createdBy: createdBy,
            assignedTo: assignedTo,
            status: status,
            orgId: orgId
        };
        // return this.apiService.post(this.configService.api_url + Constants.getTicketbyOrgid, object).pipe(
        //     map(res => res)
        // );
        return Observable.of([{
            'count': 2,
            'response': [
                {
                    'uuid': 'MJeIUQ2Jt',
                    'id': 30,
                    'Date': '2018-11-19T09:55:13.842Z',
                    'Type': 'Urgent',
                    'description': 'test',
                    'Status': 'Assigned',
                    'CloseReasonUuid': null,
                    'createdByUuid': 'iEBd-p6rQ',
                    'organizationUuid': 'H1b9MM9zQ',
                    'UserUuid': null,
                    'assigned_to': [
                        {
                            'firstname': 'ram',
                            'AssignedUserTickets': {
                                'id': 31,
                                'TicketUuid': 'MJeIUQ2Jt',
                                'UserUuid': '7XqbWrWmrL'
                            }
                        }
                    ],
                    'created_by': {
                        'firstname': 'supriya'
                    },
                    'salesorder': [
                        {
                            'PONumber': 'J957413000',
                            'OrderNumber': 'D16765',
                            'SalesOrderTickets': {
                                'SalesOrderOrderID': 15554,
                                'TicketUuid': 'MJeIUQ2Jt'
                            }
                        }
                    ],
                    'organization': {
                        'organizationname': 'Stahls'
                    }
                },
                {
                    'uuid': 'ISfYzvOnJ',
                    'id': 11,
                    'Date': '2018-09-26T07:57:55.422Z',
                    'Type': 'Regular',
                    'description': 'testing ticket flow 1',
                    'Status': 'Open',
                    'CloseReasonUuid': null,
                    'createdByUuid': '7XqbWrWmrL',
                    'organizationUuid': 'rkZJDf9fm',
                    'UserUuid': null,
                    'assigned_to': [],
                    'created_by': {
                        'firstname': 'ram'
                    },
                    'salesorder': [],
                    'organization': {
                        'organizationname': 'NewBalance'
                    }
                }
            ]
        }]);
    }
    getShowTableData(): Observable<any[]> {
        return Observable.of([
            {
                'uuid': '9Oo7mkgLe',
                'id': 13,
                'Date': '2018-09-26T09:13:35.858Z',
                'Type': 'Urgent',
                'description': 'Testing mail notification excluding initiator',
                'Status': 'Assigned',
                'CloseReasonUuid': null,
                'createdByUuid': 'dgA0C0XbK',
                'organizationUuid': 'H1b9MM9zQ',
                'UserUuid': null,
                'assigned_to': [
                    {
                        'firstname': 'ram',
                        'AssignedUserTickets': {
                            'id': 5,
                            'TicketUuid': '9Oo7mkgLe',
                            'UserUuid': '7XqbWrWmrL'
                        }
                    }
                ],
                'created_by': {
                    'firstname': 'supriya'
                },
                'salesorder': [],
                'organization': {
                    'organizationname': 'Stahls'
                }
            },
            {
                'uuid': 'gBXqVKR7X',
                'id': 10,
                'Date': '2018-09-26T06:52:15.528Z',
                'Type': 'Regular',
                'description': 'testing ticket flow with no orders',
                'Status': 'Assigned',
                'CloseReasonUuid': null,
                'createdByUuid': 'Hy-EMGqz7',
                'organizationUuid': 'H1b9MM9zQ',
                'UserUuid': null,
                'assigned_to': [
                    {
                        'firstname': 'ram',
                        'AssignedUserTickets': {
                            'id': 28,
                            'TicketUuid': 'gBXqVKR7X',
                            'UserUuid': '7XqbWrWmrL'
                        }
                    }
                ],
                'created_by': {
                    'firstname': 'admin'
                },
                'salesorder': [],
                'organization': {
                    'organizationname': 'Stahls'
                }
            },
            {
                'uuid': '5Moz3Uyvp',
                'id': 9,
                'Date': '2018-09-26T06:39:56.740Z',
                'Type': 'Regular',
                'description': 'testing ticket new ',
                'Status': 'Closed',
                'CloseReasonUuid': 'e0f12326-409a-4985-96b8-140ce81d941d',
                'createdByUuid': 'Hy-EMGqz7',
                'organizationUuid': 'H1b9MM9zQ',
                'UserUuid': null,
                'assigned_to': [],
                'created_by': {
                    'firstname': 'admin'
                },
                'salesorder': [],
                'organization': {
                    'organizationname': 'Stahls'
                }
            }
        ]
        );
    }
}
