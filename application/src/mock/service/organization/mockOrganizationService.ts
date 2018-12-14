import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class MockOrganizationService {
    constructor() { }
    getAllOrganization(): Observable<any> {
        return Observable.of([
            {
                'organizationname': 'Dicks',
                'orgImage': 'uploads/OrgImage/1558-dicks.png',
                'PolypmCustomerCode': 'DIC'
            },
            {
                'organizationname': 'NewBalance',
                'orgImage': 'uploads/OrgImage/New.png',
                'PolypmCustomerCode': 'NEW'
            }
        ]);
    }
    saveOrganization(Organization): Observable<any> {
        return Observable.of(
            {
                'organizationname': 'Dicks',
                'orgImage': 'uploads/OrgImage/1558-dicks.png',
                'PolypmCustomerCode': 'DIC'
            });
    }
    deleteOrganization(uuid): Observable<any> {
        return Observable.of([]);
    }
    updateOrganization(Organization): Observable<any> {
        return Observable.of();
    }
    getOrganizationbyid(id): Observable<any> {
        return Observable.of(
            {
                'uuid':'ySvjE6URZ',
                'organizationname': 'Dicks',
                'orgImage': 'uploads/OrgImage/1558-dicks.png',
                'PolypmCustomerCode': 'DIC'
            });
    }

    uploadOrganization(Organization) {
        return Observable.of();
    }
}
