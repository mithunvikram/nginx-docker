import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject, Observable } from 'rxjs';
import { SyncService } from './sync-service.service';
import { CollectionViewer } from '@angular/cdk/collections';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';


@Injectable()
export class SyncServiceDataSource implements DataSource<any> {
    private dataSubject = new BehaviorSubject<any[]>([]);
    public countValue: number;
    constructor(private syncService: SyncService) { }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.dataSubject.asObservable();
    }
    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
    }
    loadDatas(
        pageIndex: number,
        pageSize: number,
        sortLabel: string,
        sortDirection: string,
    ) {
        this.syncService.getData(pageIndex, pageSize, sortLabel,
            sortDirection).pipe(
                catchError(() => of([]))
            ).subscribe(lessons => {
                if (lessons !== null) {
                    this.countValue = lessons['count'];
                    this.dataSubject.next(lessons['response']);
                } else {
                    this.countValue = 0;
                    this.dataSubject.next([]);
                }
            });

    }
}
