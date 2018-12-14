import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';



@Injectable()
export class MockNoDataTicketService {
    constructor() { }
    getAllTicket(): Observable<any> {
        // return this.apiService.get(this.configService.api_url + Constants.getalltickets);
        return Observable.of([]);
    }
    getAllTicketByOrg(uuid): Observable<any> {
        return Observable.of([]);
    }
    searchcomments(searchtext): Observable<any> {
        return Observable.of([]);
    }
    Orgsearchcomments(searchtext, code): Observable<any> {
        return Observable.of([]);
    }
    getSearchResult(pageIndex: number,
        pageSize: number,
        sortLabel: string,
        sortDirection: string,
        organization: string[],
        createdBy: string[],
        assignedTo: string[],
        status: string[],
        search: any): Observable<any> {
        search.pageIndex = pageIndex;
        search.pageSize = pageSize;
        search.sortLabel = sortLabel;
        search.sortDirection = sortDirection;
        search.organization = organization;
        search.createdBy = createdBy;
        search.assignedTo = assignedTo;
        search.status = status;
        // return this.apiService.post(this.configService.api_url + Constants.Ticketsearch, search);
        return Observable.of(null);
    }
    getSearchResultByOrgId(pageIndex: number,
        pageSize: number,
        sortLabel: string,
        sortDirection: string,
        organization: string[],
        createdBy: string[],
        assignedTo: string[],
        status: string[],
        search: any, orgId: any): Observable<any> {
        search.pageIndex = pageIndex;
        search.pageSize = pageSize;
        search.sortLabel = sortLabel;
        search.sortDirection = sortDirection;
        search.orgId = orgId;
        search.organization = organization;
        search.createdBy = createdBy;
        search.assignedTo = assignedTo;
        search.status = status;
        // return this.apiService.post(this.configService.api_url + Constants.Ticketsearchbyid, search);
        return Observable.of(null);
    }
    getFilterValueByOrgId(orgId): Observable<any> {
        // return this.apiService.get(this.configService.api_url + Constants.TicketFilterbyOrgid + orgId);
        // tslint:disable-next-line:max-line-length
        return Observable.of([]);
    }
    getFilterValue(): Observable<any> {
        // return this.apiService.get(this.configService.api_url + Constants.Ticketfilter);
        // tslint:disable-next-line:max-line-length
        return Observable.of([]);
    }
    getData(
        pageNumber, pageSize, sortLabel, sortDirection, search,
        createdBy, assignedTo, status, organization): Observable<any[]> {
        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            createdBy: createdBy,
            assignedTo: assignedTo,
            status: status,
            organization: organization
        };
        return Observable.of(null);
    }
    getDataByOrgId(
        pageNumber, pageSize, sortLabel, sortDirection, search, createdBy, assignedTo, status, orgId): Observable<any[]> {

        const object = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection,
            search: search,
            createdBy: createdBy,
            assignedTo: assignedTo,
            status: status,
            orgId: orgId
        };
        // return this.apiService.post(this.configService.api_url + Constants.getTicketbyOrgid, object).pipe(
        //     map(res => res)
        // );
        return Observable.of(null);
    }
}
