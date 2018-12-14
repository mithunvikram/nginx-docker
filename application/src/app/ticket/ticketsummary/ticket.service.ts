import { Injectable } from '@angular/core';
import { ApiService } from '../../config/api.service';
import { ConfigService } from '../../config/config.service';
import { Observable } from 'rxjs/Observable';
import { Constants } from '../../config/Constant';
import { map } from 'rxjs/operators';



@Injectable()
export class TicketService {
    constructor(private apiService: ApiService, private configService: ConfigService) { }
    getAllTicket(): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.getalltickets);
    }
    getAllTicketByOrg(uuid): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.Ticketbyorg + uuid);
    }
    searchcomments(searchtext): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.Searchcomments + searchtext);
    }
    Orgsearchcomments(searchtext, code): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.OrgSearchcomments + searchtext + '/' + code);
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
        return this.apiService.post(this.configService.api_url + Constants.Ticketsearch, search);
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
        return this.apiService.post(this.configService.api_url + Constants.Ticketsearchbyid, search);
    }
    getFilterValueByOrgId(orgId): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.TicketFilterbyOrgid + orgId);
    }
    getFilterValue(): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.Ticketfilter);
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
        return this.apiService.post(this.configService.api_url +
            Constants.Ticketgetall, object).pipe(
                map(res => res)
            );
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
        return this.apiService.post(this.configService.api_url + Constants.getTicketbyOrgid, object).pipe(
            map(res => res)
        );
    }
}
