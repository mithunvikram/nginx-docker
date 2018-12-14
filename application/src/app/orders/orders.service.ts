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
export class OrderService {
    private subject: Subject<any>;
    constructor(private http: HttpClient, private router: Router, private apiService: ApiService, private config: ConfigService) {
    }
    getExportOrders(dateRange): Observable<any> {
        return this.apiService.post(this.config.api_url + Constants.ExportSalesOrder, dateRange);
    }
    getExportOrdersByCode(dateRange, code: string): Observable<any> {
        const object = {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            code: code
        };
        return this.apiService.post(this.config.api_url + Constants.ExportSalesOrderbyCode, object);
    }
    getFilterValue(): Observable<number> {
        return this.apiService.get(this.config.api_url + Constants.SalesOrderByFiltervalue);
    }

    getFilterValueData(data): Observable<number> {
        return this.apiService.post(this.config.api_url + Constants.SalesOrderByFilterData, data);
    }

    getFilterValueDataByCompanyCode(data, companyCode: any): Observable<number> {
        return this.apiService.post(this.config.api_url + Constants.SalesOrderByFilterDatabycode + companyCode, data);
    }


    getFilterValueByCompanyCode(companyCode: any): Observable<number> {
        return this.apiService.get(this.config.api_url + Constants.SalesOrderFilterValuebycode + companyCode);
    }

    getCountByStatusName(): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.SalesOrderCountBystatusname);
    }
    getStatusNameCountByCode(code: string): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.SalesOrderCountBystatusnamebycode + code);
    }

    getSalesOrderByStatusName(statusName: string): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.getsalesorderBystatus + statusName);
    }

    getData(
        pageNumber, pageSize, sortLabel, sortDirection, search,
        location, ticketCount, status, styleOption): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            location: location,
            ticketCount: ticketCount,
            status: status,
            styleOption: styleOption
        };

        return this.apiService.post(this.config.api_url +
            '/SalesOrder/getall', object).pipe(
                map(res => res)
            );
    }
    getDataByCompanyCode(
        pageNumber, pageSize, sortLabel,
        sortDirection, search, location, ticketCount, status, styleOption, companyCode): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            location: location,
            ticketCount: ticketCount,
            status: status,
            styleOption: styleOption,
            companyCode: companyCode
        };
        return this.apiService.post(this.config.api_url + Constants.SalesOrderByOrg, object).pipe(
            map(res => res)
        );
    }

    getDataByStatusName(
        pageNumber, pageSize, sortLabel, sortDirection, search,
        location, ticketCount, status, styleOption, statusName): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            location: location,
            ticketCount: ticketCount,
            status: status,
            styleOption: styleOption,
            statusName: statusName
        };

        return this.apiService.post(this.config.api_url +
            Constants.salesorderbystatus, object).pipe(
                map(res => res)
            );
    }

    getDataByStatusNameCompanyCode(
        pageNumber, pageSize, sortLabel,
        sortDirection, search, location, ticketCount, status, styleOption, statusName, companyCode): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            location: location,
            ticketCount: ticketCount,
            status: status,
            styleOption: styleOption,
            statusName: statusName,
            companyCode: companyCode
        };
        return this.apiService.post(this.config.api_url + Constants.SalesorderstatusbyOrg, object).pipe(
            map(res => res)
        );
    }
}

