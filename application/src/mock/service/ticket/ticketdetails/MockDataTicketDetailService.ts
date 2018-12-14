import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockDataTicketDetailService {
    constructor() {

    }

    getTicketByUuid(uuid: any): Observable<any> {
        return Observable.of({
            'id': 1,
            'uuid': '22ere32',
            'Date': '2018-11-22T12:36:57.981Z',
            'Type': 'Urgent',
            'description': 'testing ticket by other user',
            'Status': 'Assigned',
            'attachments': [],
            'assigned_to': [
                {
                    'username': 'assignedTo',
                    'firstname': 'assignedTo',
                    'lastname': 'assignedTo',
                    'email': 'assignedTo@gmail.com',
                    'AssignedUserTickets': {}
                }
            ],
            'created_by': {
                'firstname': 'createdBy',
                'email': 'createdBy@gmail.com'
            },
            'salesorder': [
                {
                    'CompanyID': 2,
                    'ShipCount': 0,
                    'RequestCount': 2,
                    'ActualCount': 2,
                    'AllocateCount': 0,
                    'Tickets': 2,
                    'SalesOrderTickets': {}
                }
            ],
            'CloseReason': null,
            'organization': {
                'organizationname': 'NewBalance',
                'orgImage': 'uploads/OrgImage/Newlogo.png',
                'PolypmCustomerCode': 'NEW'
            }
        });
    }
    update_Ticket(data): Observable<any> {
        return Observable.of([1]);
    }
    getAttachementbyTicketid(id): Observable<any> {
        return Observable.of(null);
    }
    DeleteAttachementbyid(id): Observable<any> {
        return Observable.of([]);
    }

    Reopen_ticket(data): Observable<any> {
        return Observable.of([1]);
    }

    sendMail(data): Observable<any> {
        return Observable.of({ 'message': 'Success' });
    }
    getReason(): Observable<any> {
        return Observable.of([
            {
                'code': 100,
                'Reason': 'It was Solved',
                'createdAt': '1900-01-01T00:00:00.000Z',
                'updatedAt': '1900-01-01T00:00:00.000Z'
            },
            {
                'code': 101,
                'Reason': 'It is not important anymore',
                'createdAt': '1900-01-01T00:00:00.000Z',
                'updatedAt': '1900-01-01T00:00:00.000Z'
            },
            {
                'code': 102,
                'Reason': 'It was included on another ticket',
                'createdAt': '1900-01-01T00:00:00.000Z',
                'updatedAt': '1900-01-01T00:00:00.000Z'
            }
        ]);
    }
    getAllUserByOrg(uuid): Observable<any> {
        return Observable.of([
            {
                'organization': {
                    'organizationname': 'Stahls',
                    'orgImage': 'assets/img/logo.png',
                    'PolypmCustomerCode': 'STAHLS'
                },
                'username': 'first',
                'password': 'first',
                'email': 'first@gmail.com',
                'Authorities': [
                    {
                        'role': 'ROLE_USER'
                    }
                ]
            },
            {
                'username': 'second@gmail.com',
                'password': 'second',
                'organization': {
                    'organizationname': 'NewBalance',
                    'orgImage': 'uploads/OrgImage/New-Balance-logo.png',
                    'PolypmCustomerCode': 'NEWC01'
                },
                'Authorities': [
                    {
                        'role': 'ROLE_USER'
                    }
                ]
            }
        ]);
    }
    getAllUser(): Observable<any> {
        return Observable.of([
            {
                'organization': {
                    'organizationname': 'Stahls',
                    'orgImage': 'assets/img/logo.png',
                    'PolypmCustomerCode': 'STAHLS'
                },
                'username': 'first',
                'password': 'first',
                'email': 'first@gmail.com',
                'Authorities': [
                    {
                        'role': 'ROLE_USER'
                    }
                ]
            },
            {
                'username': 'second@gmail.com',
                'password': 'second',
                'organization': {
                    'organizationname': 'NewBalance',
                    'orgImage': 'uploads/OrgImage/New-Balance-logo.png',
                    'PolypmCustomerCode': 'NEWC01'
                },
                'Authorities': [
                    {
                        'role': 'ROLE_USER'
                    }
                ]
            }
        ]);
    }
    getuserByid(id): Observable<any> {
        return Observable.of([
            {
                'organization': {
                    'organizationname': 'Stahls',
                    'orgImage': 'assets/img/logo.png',
                    'PolypmCustomerCode': 'STAHLS'
                },
                'username': 'first',
                'password': 'first',
                'email': 'first@gmail.com',
                'Authorities': [
                    {
                        'role': 'ROLE_USER'
                    }
                ]
            },
            {
                'username': 'second@gmail.com',
                'password': 'second',
                'organization': {
                    'organizationname': 'NewBalance',
                    'orgImage': 'uploads/OrgImage/New-Balance-logo.png',
                    'PolypmCustomerCode': 'NEWC01'
                },
                'Authorities': [
                    {
                        'role': 'ROLE_USER'
                    }
                ]
            }
        ]);
    }
    orgGetAll(): Observable<any> {
        return Observable.of([
            {
                'organizationname': 'Dicks',
                'orgImage': 'uploads/OrgImage/1547-dicks.png',
                'PolypmCustomerCode': 'DIC'
            },
            {
                'organizationname': 'NewBalance',
                'orgImage': 'uploads/OrgImage/Newo11-logo.png',
                'PolypmCustomerCode': 'NEWC'
            }
        ]);
    }
    createAssignedUserTicket(Object: any): Observable<any> {
        return Observable.of('success');
    }
    saveFileUrl(file: any): Observable<any> {
        return Observable.of([]);
    }
    createcomments(comments) {
        return Observable.of({
            'CommentDate': '2018-11-23T05:35:00.559Z',
            'Comments': 'testing ticket comments',
            'CommentUserName': 'admin'
        });
    }
    getCommentsByTicketID(ticketId: string): Observable<any> {
        if (ticketId === 'uii1') {
            return Observable.of('There is no Comments');
        } else {
            return Observable.of([
                {
                    'CommentDate': '2018-11-23T14:28:32.844Z',
                    'CommentUserName': 'admin',
                    'Comments': 'testing ticket flow'
                }
            ]);
        }
    }
    LogHistory(data): Observable<any> {
        return Observable.of({
            'Date': '2018-11-23T05:36:24.091Z',
            'AssignedTo': '',
            'LogDescription': 'Closed:It is not important anymore',
            'CreatedBy': 'admin'
        });
    }
    getHistory(id): Observable<any> {
        return Observable.of([
            {
                'Date': '2018-11-22T12:36:28.747Z',
                'CreatedBy': 'admin',
                'AssignedTo': '',
                'LogDescription': 'Ticket has been created'
            }
        ]);
    }
    getSelectedAttachementUrl() {
        return [
            {
                'uuid': '1aTeer',
                'attachmenturl': 'uploads/15429.jpg',
                'filename': '15429.jpg'
            },
            {
                'uuid': '2Yure',
                'attachmenturl': 'uploads/15429.jpg',
                'filename': '15429.jpg'
            }
        ];
    }

    getAttachementUrlNotMatched() {
        return {
            'uuid': '1OUI2',
            'attachmenturl': 'uploads/29.jpg',
            'filename': '15429.jpg'
        };
    }

    getAttachementUrlMatched() {
        return {
            'uuid': '1aTeer',
            'attachmenturl': 'uploads/15429.jpg',
            'filename': '15429.jpg'
        };
    }

    getAllUserForFilterOrg() {
        return [
            {
                'organization': {
                    'uuid': '1WE1_1'
                }
            },
            {
                'organization': {
                    'uuid': '1WE1_2'
                }
            },
            {
                'organization': {
                    'uuid': '1WE1_3'
                }
            }
        ];
    }

    getSelectedFilterOrg() {
        return {
            'organization': {
                'uuid': '1WE1_3'
            }
        };
    }

    getCloseReasonDetails() {
        return [{
            'Reason': 'It is not important anymore',
            'code': 101,
            'createdAt': '1900-01-01T00:00:00.000Z',
            'id': 2,
            'updatedAt': '1900-01-01T00:00:00.000Z',
            'uuid': 'e0f12326'
        }];
    }


}
