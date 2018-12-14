import { DataSource } from '@angular/cdk/table';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { OrderService } from './orders.service';
import { Injectable } from '@angular/core';
@Injectable()
export class OrderDataSource implements DataSource<any> {
    private dataSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public countValue: number;
    public loading$ = this.loadingSubject.asObservable();
    constructor(private orderService: OrderService) { }
    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        console.log('data source  connection are ------ >>> ');
        return this.dataSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
    }
    loadDatas(pageIndex: number, pageSize: number, sortLabel: string,
        sortDirection: string, search: any, location: string[],
        ticketCount: string[], status: string[], styleOption: string[]) {
        this.loadingSubject.next(true);
        this.orderService.getData(pageIndex, pageSize, sortLabel,
            sortDirection, search, location,
             ticketCount, status, styleOption).pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(false)))
            .subscribe(responses => {
                this.countValue = responses['count'];
                this.dataSubject.next(responses['response']);
            });
    }
    loadDatasByCompanyCode(pageIndex: number, pageSize: number, sortLabel: string,
        sortDirection: string, search: any,
        location: string[], ticketCount: string[], status: string[], styleOption: string[], companyCode: any) {
        this.loadingSubject.next(true);
        this.orderService.getDataByCompanyCode(pageIndex, pageSize, sortLabel,
            sortDirection, search, location, ticketCount, status,
            styleOption, companyCode).pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(false)))
            .subscribe(responses => {
                this.countValue = responses['count'];
                this.dataSubject.next(responses['response']);
            });
    }

    loadDatasByStatusName(pageIndex: number, pageSize: number, sortLabel: string,
        sortDirection: string, search: any, location: string[],
        ticketCount: string[], status: string[], styleOption: string[], statusName: string) {
        this.loadingSubject.next(true);
        this.orderService.getDataByStatusName(pageIndex, pageSize, sortLabel,
            sortDirection, search, location, ticketCount, status,
            styleOption, statusName).pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(false)))
            .subscribe(responses => {
                this.countValue = responses['count'];
                this.dataSubject.next(responses['response']);
            });
    }

    loadDatasByStatusNameCompanyCode(pageIndex: number, pageSize: number, sortLabel: string,
        sortDirection: string, search: any,
        location: string[], ticketCount: string[], status: string[], styleOption: string[], statusName, companyCode: any) {
        this.loadingSubject.next(true);
        this.orderService.getDataByStatusNameCompanyCode(pageIndex, pageSize, sortLabel,
            sortDirection, search, location, ticketCount,
             status, styleOption, statusName, companyCode).pipe(catchError(() => of([])), finalize(() => this.loadingSubject.next(false)))
            .subscribe(responses => {
                this.countValue = responses['count'];
                this.dataSubject.next(responses['response']);
            });
    }
}
