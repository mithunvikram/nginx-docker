import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';



@Injectable()
export class SyncService {
    constructor(private apiService: ApiService, private configService: ConfigService, private constants: Constants) { }

    updateFrequency(data): Observable<any> {
        return this.apiService.put(this.configService.sync_url + Constants.frequencyupdate, data);
    }
    getFrequency(): Observable<any> {
        return this.apiService.get(this.configService.sync_url + Constants.getfrequency);
    }
    getCountFrequency(): Observable<any> {
        return this.apiService.get(this.configService.sync_url + Constants.getsynccount);
    }
    updateCountFrequency(count: any): Observable<any> {
        return this.apiService.put(this.configService.sync_url + Constants.updatesynccount, count);
    }
    getData(pageIndex, pageSize, sortLabel, sortDirection): Observable<any> {
        const object = {
            pageIndex: pageIndex,
            pageSize: pageSize,
            sortLabel: sortLabel,
            sortDirection: sortDirection
        };
        return this.apiService.post(this.configService.api_url + Constants.get_allSyncService, object);
    }

}
