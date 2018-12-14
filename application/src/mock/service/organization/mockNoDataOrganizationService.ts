import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class MockNODataOrganizationService {
    constructor() { }
    getAllOrganization(): Observable<any> {
        return Observable.of('There is no Organisation');
    }
}
