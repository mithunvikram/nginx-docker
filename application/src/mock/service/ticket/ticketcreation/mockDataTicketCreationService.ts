import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';



@Injectable()
export class MockTicketCreationService {
    constructor() { }
    saveTicket(ticket: any): Observable<any> {
        return Observable.of('saveTicket mock service called');
    }
    saveFileUrl(file: any): Observable<any> {
        return Observable.of('saveFileUrl mock service called');
    }
    get_priority() {
        return Observable.of('getPriority mock service called');
    }

    orgGetAll(): Observable<any> {
        return Observable.of([{
            'organizationname': 'Dicks',
            'orgImage': 'uploads/OrgImage/1532693442747-dicks.png',
            'PolypmCustomerCode': 'DIC'
        },
        {
            'organizationname': 'NewBalance',
            'orgImage': 'uploads/OrgImage/New-Balance-logo.png',
            'PolypmCustomerCode': 'NEWC01'
        }]);
    }

    sendMail(data): Observable<any> {
        return Observable.of('sendMail mock service called');
    }

    LogHistory(data): Observable<any> {
        return Observable.of('LogHistory mock service called');
    }

    getSelectedValue() {
        return [
            {
                'ActualCount': 1,
                'AllocateCount': 0,
                'AllocateDate': '1000-01-01T00:00:00.000Z',
                'Comments7': 'DecorationNew',
                'Comments9': '',
                'CompanyCode': 'DTT',
                'CompanyID': 2,
                'CustomerCode': 'NEW',
                'CustomerDueDate': '1000-01-01T00:00:00.000Z',
                'CustomerID': 1,
                'CustomerPODate': '1000-01-01T00:00:00.000Z',
                'DataExportDate': '1000-01-01T14:36:00.000Z',
                'DataExportID': 222,
                'ForecastFinish': '1000-01-01T00:00:00.000Z',
                'Tickets': 2
            },
            {
                'ActualCount': 1,
                'AllocateCount': 0,
                'AllocateDate': '1000-01-01T00:00:00.000Z',
                'Comments7': 'DecorationNEW',
                'Comments9': '',
                'CompanyCode': 'DFT',
                'CompanyID': 2,
                'CustomerCode': 'NEW',
                'CustomerDueDate': '1000-01-01T00:00:00.000Z',
                'CustomerID': 22,
                'CustomerPODate': '1000-01-01T00:00:00.000Z',
                'DataExportDate': '1000-01-01T14:56:00.000Z',
                'DataExportID': 122,
                'ForecastFinish': '1000-01-01T00:00:00.000Z',
                'Tickets': 0
            }
        ];
    }
    getMatchedSelectedValue() {
        return {
            'ActualCount': 1,
            'AllocateCount': 0,
            'AllocateDate': '1000-01-01T00:00:00.000Z',
            'Comments7': 'DecorationNew',
            'Comments9': '',
            'CompanyCode': 'DTT',
            'CompanyID': 2,
            'CustomerCode': 'NEW',
            'CustomerDueDate': '1000-01-01T00:00:00.000Z',
            'CustomerID': 1,
            'CustomerPODate': '1000-01-01T00:00:00.000Z',
            'DataExportDate': '1000-01-01T14:36:00.000Z',
            'DataExportID': 222,
            'ForecastFinish': '1000-01-01T00:00:00.000Z',
            'Tickets': 2
        };
    }

    getNotMatchedSelectedValue() {
        return {
            'ActualCount': 1,
            'AllocateCount': 0,
            'AllocateDate': '1000-01-01T00:00:00.000Z',
            'Comments7': 'DecorationNew',
            'Comments9': '',
            'CustomerPODate': '1000-01-01T00:00:00.000Z',
            'DataExportDate': '1000-01-01T14:36:00.000Z',
            'Tickets': 2
        };
    }



}
