import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../config/api.service';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../config/Constant';

@Injectable()
export class ShipmentsService {
    private subject: Subject<any>;
    constructor(private http: HttpClient, private router: Router, private api: ApiService, private config: ConfigService) {
    }
    getallShipments(): Observable<any> {
        return this.api.get(this.config.api_url + Constants.Shipmentgetall);
    }
    getAllShipmentsByOrg(orgName: any): Observable<any> {
        return this.api.get(this.config.api_url + Constants.ShipmentbyOrg + orgName);
    }
    getShipments(shipmentId): Observable<any> {
        return this.api.get(this.config.api_url + Constants.Shipmentbyid + shipmentId);
    }

    getPackedBox(packedBoxId): Observable<any> {
        return this.api.get(this.config.api_url + Constants.packedboxbyid + packedBoxId);
    }

    getPackedItemByShipmentId(shipmentId: any): Observable<any> {
        return this.api.get(this.config.api_url + Constants.packedItemid + shipmentId);
    }

    getShipmentByDate(startdate, enddate): Observable<any> {
        const object = {
            startDate: startdate,
            endDate: enddate
        };
        return this.api.post(this.config.api_url + Constants.shipmentbydate, object);
    }
    getShipmentByDateCode(code, startdate, enddate): Observable<any> {
        const object = {
            startDate: startdate,
            endDate: enddate,
            code: code
        };
        return this.api.post(this.config.api_url + Constants.shipmentdatebycode, object);
    }
    getFilterValue(): Observable<number> {
        return this.api.get(this.config.api_url + Constants.shipmentbyfiltervalue);
    }
    getFilterValueByCompanyCode(companyCode: any): Observable<number> {
        return this.api.get(this.config.api_url + Constants.shipmentfilterbycode + companyCode);
    }
    getPonumberbyDate(startdate, enddate): Observable<any> {
        const object = {
            startDate: startdate,
            endDate: enddate
        };
        return this.api.post(this.config.api_url + Constants.shipmentponumberbydate, object);
    }

    getData(
        pageNumber, pageSize, sortLabel, sortDirection, search, ponumber, startdate, enddate): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            ponumber: ponumber,
            startdate: startdate,
            enddate: enddate,

        };
        return this.api.post(this.config.api_url +
            Constants.getallshipment, object).pipe(
                map(res => res)
            );
    }
    getDataByCompanyCode(
        pageNumber, pageSize, sortLabel, sortDirection, search, ponumber, companyCode, startdate, enddate): Observable<any[]> {

        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            ponumber: ponumber,
            companyCode: companyCode,
            startDate: startdate,
            endDate: enddate,
        };
        return this.api.post(this.config.api_url + Constants.getallshipmentbyorg, object).pipe(
            map(res => res)
        );
    }


}

