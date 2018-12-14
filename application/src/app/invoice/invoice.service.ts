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
export class InvoiceService {
    constructor(private api: ApiService, private config: ConfigService) {
    }
    getallInvoice(): Observable<any> {
        return this.api.get(this.config.api_url + Constants.GetAllInvoice);
    }
    getAllInvoiceByOrg(orgName: any): Observable<any> {
        return this.api.get(this.config.api_url + Constants.GetInvoiceByOrg + orgName);
    }

    getData(
        pageNumber, pageSize, sortLabel, sortDirection, search,
        item, status): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            item: item,
            status: status
        };
        return this.api.post(this.config.api_url +
            '/Invoices/getall', object).pipe(
                map(res => res)
            );
    }
    getDataByCompanyCode(
        pageNumber, pageSize, sortLabel,
        sortDirection, search, item, status, companyCode): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            item: item,
            status: status,
            companyCode: companyCode
        };
        return this.api.post(this.config.api_url + Constants.GetInvoiceByCode, object).pipe(
            map(res => res)
        );
    }


    getFilterValue(): Observable<number> {
        return this.api.get(this.config.api_url + Constants.GetInvoiceFiltervalue);
    }

    getFilterValueData(data): Observable<number> {
        return this.api.post(this.config.api_url + Constants.GetInvoiceFilterbydata, data);
    }

    getFilterValueDataByCompanyCode(data, companyCode: any): Observable<number> {
        return this.api.post(this.config.api_url + Constants.GetInvoiceFilterdatabycode + companyCode, data);
    }


    getFilterValueByCompanyCode(companyCode: any): Observable<number> {
        return this.api.get(this.config.api_url + Constants.GetInvoiceFiltervaluebyCode + companyCode);
    }
}

