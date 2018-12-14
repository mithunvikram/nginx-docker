import { async } from '@angular/core/testing';
import { SyncService } from './sync-service.service';

describe('SyncService', () => {
    let service;


    const apiService: any = {
        // mock properties here
    };

    const configService: any = {
        // mock properties here
    };

    const constants: any = {
        // mock properties here
    };

    beforeEach(() => {
        service = new SyncService(apiService, configService, constants);
    });


    it('should run #updateFrequency()', async () => {
        // const result = updateFrequency(data);
    });

    it('should run #getFrequency()', async () => {
        // const result = getFrequency();
    });

    it('should run #getCountFrequency()', async () => {
        // const result = getCountFrequency();
    });

    it('should run #updateCountFrequency()', async () => {
        // const result = updateCountFrequency(count);
    });

    it('should run #getData()', async () => {
        // const result = getData(pageIndex, pageSize, sortLabel, sortDirection);
    });

});
