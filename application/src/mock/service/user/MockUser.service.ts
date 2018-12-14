import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockUserService {
    constructor() { }

    getAllUser(): Observable<any> {
        return Observable.of([
            {
                'uuid': '1UUID2e',
                'id': 1,
                'username': 'first@gmail.com',
                'password': 'first',
                'firstname': 'first',
                'lastname': 'first',
                'email': 'first@gmail.com',
                'loggedInDate': '1900-01-01T19:41:19.794Z',
                'loggedOutDate': '1900-01-01T20:18:22.989Z',
                'isDisabled': false,
                'organizationUuid': '1OrgTR',
                'organization': {
                    'uuid': '1OrgTR',
                    'id': 1,
                    'organizationname': 'firstNEW',
                    'orgImage': 'uploads/OrgImage/New.png',
                    'PolypmCustomerCode': 'NEW'
                },
                'Authorities': [
                    {
                        'uuid': '1UUIDAUTH',
                        'role': 'ROLE_USER'
                    }
                ]
            },
            {
                'uuid': '2UUIDYU',
                'id': 2,
                'username': 'second',
                'password': 'second',
                'firstname': 'second',
                'lastname': 'second',
                'email': 'second@gmail.com',
                'loggedInDate': '1900-01-01T17:10:27.598Z',
                'loggedOutDate': '1900-01-01T09:50:14.313Z',
                'isDisabled': false,
                'organizationUuid': '2ORi',
                'organization': {
                    'uuid': '2ORi',
                    'id': 1,
                    'organizationname': 'Stahls',
                    'orgImage': 'assets/img/log.png',
                    'PolypmCustomerCode': 'STAHLS'
                },
                'Authorities': [
                    {
                        'uuid': '2UIDAUTH',
                        'role': 'ROLE_TICKET'
                    }
                ]
            }
        ]);
    }
    getUserDetails(uuid): Observable<any> {
        return Observable.of({
            'uuid': '1UID1',
            'id': 1,
            'username': 'username',
            'password': 'password',
            'firstname': 'firstname',
            'ResetpasswordToken': '1EWRE2',
            'lastname': 'lastname',
            'email': 'first@gmail.com',
            'loggedInDate': '1900-01-01T05:53:43.438Z',
            'loggedOutDate': '1900-01-01T06:09:59.880Z',
            'isDisabled': false,
            'organizationUuid': '1OORG1',
            'organization': {
                'uuid': '1OORG1',
                'id': 1,
                'organizationname': 'Stahls',
                'orgImage': 'assets/img/log.png',
                'PolypmCustomerCode': 'STAHLS'
            },
            'Authorities': [
                {
                    'uuid': '1UIDAUth',
                    'role': 'ROLE_USER'
                }
            ]
        });
    }
    getAllUserByOrg(uuid): Observable<any> {
        return Observable.of([
            {
                'uuid': '1UUID2e',
                'id': 1,
                'username': 'first@gmail.com',
                'password': 'first',
                'firstname': 'first',
                'lastname': 'first',
                'email': 'first@gmail.com',
                'loggedInDate': '1900-01-01T19:41:19.794Z',
                'loggedOutDate': '1900-01-01T20:18:22.989Z',
                'isDisabled': false,
                'organizationUuid': '1OrgTR',
                'organization': {
                    'uuid': '1OrgTR',
                    'id': 1,
                    'organizationname': 'firstNEW',
                    'orgImage': 'uploads/OrgImage/New.png',
                    'PolypmCustomerCode': 'NEW'
                },
                'Authorities': [
                    {
                        'uuid': '1UUIDAUTH',
                        'role': 'ROLE_USER'
                    }
                ]
            },
            {
                'uuid': '2UUIDYU',
                'id': 2,
                'username': 'second',
                'password': 'second',
                'firstname': 'second',
                'lastname': 'second',
                'email': 'second@gmail.com',
                'loggedInDate': '1900-01-01T17:10:27.598Z',
                'loggedOutDate': '1900-01-01T09:50:14.313Z',
                'isDisabled': false,
                'organizationUuid': '2ORi',
                'organization': {
                    'uuid': '2ORi',
                    'id': 1,
                    'organizationname': 'Stahls',
                    'orgImage': 'assets/img/log.png',
                    'PolypmCustomerCode': 'STAHLS'
                },
                'Authorities': [
                    {
                        'uuid': '2UIDAUTH',
                        'role': 'ROLE_TICKET'
                    }
                ]
            }
        ]);
    }
    getAllUserRole(): Observable<any> {
        return Observable.of([
            {
                'uuid': '1UID1',
                'id': 1,
                'role': 'ROLE_ORGANIZATION_ADMIN',
                'allowedScreens': 'Dashboard,Orders,Purchase Orders,Tickets,Invoices,Shipments,Inventory,Users,Organization',
                'isDisabled': true,
                'organizationUuid': null,
                'organization': null
            },
            {
                'uuid': '2UIDS2',
                'id': 2,
                'role': 'ADMIN',
                // tslint:disable-next-line:max-line-length
                'allowedScreens': 'Dashboard,Purchase Orders,Orders,Tickets,Invoices,Shipments,Inventory,Organization,Users,SyncService,GroupMail,Settings',
                'isDisabled': true,
                'organizationUuid': null,
                'organization': null
            }
        ]);
    }
    getAllUserRoleByOrg(uuid): Observable<any> {
        return Observable.of([
            {
                'uuid': '1UID1',
                'id': 1,
                'role': 'ROLE_ORGANIZATION_ADMIN',
                'allowedScreens': 'Dashboard,Orders,Purchase Orders,Tickets,Invoices,Shipments,Inventory,Users,Organization',
                'isDisabled': true,
                'organizationUuid': null,
                'organization': null
            },
            {
                'uuid': '2UIDS2',
                'id': 2,
                'role': 'ADMIN',
                // tslint:disable-next-line:max-line-length
                'allowedScreens': 'Dashboard,Purchase Orders,Orders,Tickets,Invoices,Shipments,Inventory,Organization,Users,SyncService,GroupMail,Settings',
                'isDisabled': true,
                'organizationUuid': null,
                'organization': null
            }
        ]);
    }
    createUserRole(role): Observable<any> {
        return Observable.of({
            'uuid': 'ik08',
            'isDisabled': false,
            'role': 'ROLE_USER',
            'organizationUuid': '1ORg1',
            'allowedScreens': 'Inventory,Shipments,Invoices',
            'id': 1
        });
    }
    updateUserRole(role): Observable<any> {
        return Observable.of([0]);
    }
    createUser(user): Observable<any> {
        return Observable.of({
            'uuid': '1UID23',
            'id': 1,
            'username': 'testusernam',
            'password': 'testpassword',
            'firstname': 'testfirstnam',
            'lastname': 'testlastname',
            'email': 'test@gmail.com',
            'isDisabled': false,
            'organizationUuid': '1ORg2'
        });
    }
    updateUser(user): Observable<any> {
        return Observable.of([0]);
    }
    getUserRoleDetails(uuid): Observable<any> {
        return Observable.of([
            {
                'uuid': '1UID12',
                'id': 1,
                'role': 'ROLE_USER',
                'allowedScreens': 'Inventory,Shipments,Invoices',
                'isDisabled': false,
                'organizationUuid': '1Org2'
            }
        ]
        );
    }
    disableUser(uuid): Observable<any> {
        return Observable.of([1]);
    }
    disableUserRole(uuid): Observable<any> {
        return Observable.of([1]);
    }
    getUser(user) {
        return Observable.of(null);
    }
    getRole(role, orgid) {
        return Observable.of([]);
    }

    getRoleNoOrg(role) {
        return Observable.of(null);
    }
    getUsersList() {
        return [{
            uuid: 'Q00Y',
            firstname: 'first',
            lastname: 'first',
            email: 'first@gmail.com',
            position: '',
            rol: '',
            userimage: '',
            password: '',
            organization: {
                uuid: 'HGT23',
                id: 1, organizationname: 'Stahls',
                orgImage: 'assets/img/log.png',
                PolypmCustomerCode: 'STAHLS'
            },
            Authorities: [{
                role: 'ADMIN'
            }],
            username: 'first',

        }, {
            uuid: 'Q11Y',
            firstname: 'second',
            lastname: 'second',
            email: 'second@gmail.com',
            position: '',
            rol: '',
            userimage: '',
            password: '',
            organization: {
                uuid: 'HGT24',
                id: 1, organizationname: 'NEW',
                orgImage: 'assets/img/logNEW.png',
                PolypmCustomerCode: 'NEW'
            },
            Authorities: [{
                role: 'test'
            }],
            username: 'second',

        }];
    }
}
