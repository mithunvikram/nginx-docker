import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Constants } from '../config/Constant';

@Injectable()
export class OrderDetailService {
    private subject: Subject<any>;
    constructor(private http: HttpClient, private router: Router, private api: ApiService, private config: ConfigService) {
    }
    getOrder(orderId): Observable<any> {
        return this.api.get(this.config.api_url + Constants.SalesorderbyId + orderId);
    }
    getOrderAndItemsById(orderId: string): Observable<any> {
        return this.api.get(this.config.api_url + Constants.Saleorderitem + orderId);
    }

}

