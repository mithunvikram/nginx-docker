import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../config/config.service';
import { ApiService } from '../config/api.service';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../config/Constant';
import { map } from 'rxjs/operators';

@Injectable()
export class InventoryService {
    public selected_id: number;
    constructor(private _http: HttpClient, private config: ConfigService, private apiService: ApiService) { }

    getAllActiveInventories(pageNumber, pageSize): Observable<any> {
        return this.apiService.get(this.config.api_url +
            Constants.GetAll_Active_Inventories + `/?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    }
    getAllInventories(pageNumber, pageSize): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.GetAll_Inventory);
    }
    getAllInventoryItems(): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.GetAllInventoryItems);
    }
    getInventorybyId(id): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.GetInventoryById + id);
    }
    getInventoryitems(id): Observable<any> {
        console.log('real service called in inventoryitem service');
        return this.apiService.get(this.config.api_url + Constants.GetInventoryItemById + id);
    }
    getInventorybyCompanycode(code): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.GetInventoryByCompanyCode + '/' + code);
    }
    getDataCount(): Observable<number> {
        return this.apiService.get(this.config.api_url + Constants.GetInventorycount);
    }
    getFilterValue(): Observable<number> {
        return this.apiService.get(this.config.api_url + Constants.GetInventoryFiltervalue);
    }
    getFilterValueByCompanyCode(companyCode: any): Observable<number> {
        return this.apiService.get(this.config.api_url + Constants.GetInventoryFiltervalueByComapnycode + companyCode);
    }
    getInventoryByDateRange(startDate, endDate): Observable<any> {
        return this.apiService.get(this.config.api_url + `/Inventory/getInventoryByDateRange/?startDate=${startDate}&endDate=${endDate}`);
    }
    getInventoryItemsByDateRange(startDate, endDate, style): Observable<any> {
        const object = {
            startDate: startDate,
            endDate: endDate,
            style: style
        };
        return this.apiService.post(this.config.api_url +
             Constants.GetInventoryItemBydate, object);
    }
    getInventoryItemsByDateRangeCode(startDate, endDate, code, style): Observable<any> {
        const object = {
            startDate: startDate,
            endDate: endDate,
            code: code,
            style: style
        };
        return this.apiService.post(this.config.api_url +
             Constants.GetInventoryItemBydatecode, object);
    }
    exportAllInventory(): Observable<any> {
        return this.apiService.get(this.config.api_url + Constants.ExportInventory);
    }
    exportAllInventoryByCode(code): Observable<any> {
        return this.apiService.get(this.config.api_url + `/Inventory/exportAllInventoryByCode/?code=${code}`);
    }

    getData(
        pageNumber, pageSize, sortLabel, sortDirection, search,
        style, color, size, code): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            style: style,
            color: color,
            size: size,
            code: code
        };
        return this.apiService.post(this.config.api_url +
            Constants.GetAll_Active_Inventories, object).pipe(
                map(res => res)
            );
    }
    getDataByCompanyCode(
        pageNumber, pageSize, sortLabel, sortDirection, search, style, color, size, companyCode): Observable<any[]> {

        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            style: style,
            color: color,
            size: size,
            companyCode: companyCode
        };
        return this.apiService.post(this.config.api_url + Constants.GetInventoryByCompanyCode, object).pipe(
            map(res => res)
        );
    }

    getFilterValueData(data): Observable<number> {
        return this.apiService.post(this.config.api_url + Constants.InventoryFilter, data);
    }
    getFilterValueDataByCompanyCode(data, companyCode: any): Observable<number> {
        return this.apiService.post(this.config.api_url + Constants.InventoryFilterbyCode + companyCode, data);
    }

}
