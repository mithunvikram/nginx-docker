import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable()
export class MockLoginService {
    // private subject: Subject<any>;
    constructor() {
        // const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        // this.subject = new BehaviorSubject<any>(currentUser);
    }
    login(): Observable<any> {
        // return this.http.post(this.config.login_url, { username: username, password: password });
        return Observable.of({
            'user': {
                'username': 'admin',
                'firstname': 'admin',
                'ResetpasswordToken': null,
                'lastname': 'admin',
                'email': 'admin@gmail.com',
                'isDisabled': true,
                'organizationUuid': null,
                'Authorities': [
                    {
                        'role': 'ADMIN',
                        // tslint:disable-next-line:max-line-length
                        'allowedScreens': 'Dashboard,Purchase Orders,Orders,Tickets,Invoices,Shipments,Inventory,Organization,Users,SyncService,GroupMail,Settings'
                    }
                ],
                'organization': null
            }
        });
    }
    loginByOtherUser(): Observable<any> {
        return Observable.of({
            'user': {
              'username': 'otheruser',
              'email': 'otheruser@gmail.com',
              'Authorities': [
                {
                  'role': 'ROLE_USER',
                  'allowedScreens': 'Dashboard,Orders,Purchase Orders,Tickets,Invoices,Shipments,Inventory'
                }
              ],
              'organization': {
                'organizationname': 'NewBalance',
                'orgImage': 'uploads/OrgImage/New-Balance-logo.png',
                'PolypmCustomerCode': 'NEWC01',
                'uuid': 'rASW2Df9fm'
              }
            }
          });
    }
    logout(userDetails) {
        // this.subject.next();
        // this.router.navigate(['']);
        // sessionStorage.removeItem('currentUser');
        // sessionStorage.removeItem('showSettings');
        // sessionStorage.clear();
        // return this.http.post(this.config.logout_url, userDetails);
    }
    getStatus(): Observable<any> {
        // return this.subject.asObservable();
        return Observable.of([]);
    }

    sendMail(data): Observable<any> {
        // return this.api.post(this.config.changepassword + Constants.Forgotpassword , data);
        return Observable.of([]);
    }

}

