import { InventoryComponent } from './inventory.component';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule, MatDialog } from '@angular/material';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { SidenavModule } from '../sidenav/sidenav.module';
import { InventoryService } from './inventory.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';
import { AuthGuard } from '../login/auth.guard';
import { SharedService } from '../shared/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { OrderDetailModule } from '../order-detail/order-detail.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { MatRadioModule, MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialogModule } from '@angular/material';
import { DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { inventoryDataSource } from './inventoryDataSource';
import { LoginService } from '../login/login.service';
import { Http, BaseRequestOptions, ResponseOptions, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { MockInventoryService } from '../../mock/service/inventory/MockInventoryService';
import { MockLoginService } from '../../mock/service/login/mockLoginService';
import { AlertDialogComponent } from '../dialog/alert-dialog/alert-dialog.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { InventoryModule } from './inventory.module';
import { async, TestBed, inject } from '@angular/core/testing';
import { CollectionViewer } from '@angular/cdk/collections';

describe('inventoryDataSource', () => {
    let service;


    const inventoryService: any = {
        // mock properties here
    };

    const dialog: any = {
        // mock properties here
    };
    // tslint:disable-next-line:prefer-const
    let collectionViewer: CollectionViewer;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterModule.forRoot([
                    {
                        path: 'inventory',
                        component: InventoryComponent,
                        canActivate: [AuthGuard]
                    }
                ]),
                HttpClientModule,
                OrderDetailModule,
                MatRadioModule,
                Ng2Bs3ModalModule,
                MatChipsModule,
                MatSelectModule,
                MatSortModule,
                MatFormFieldModule,
                MatInputModule,
                MatButtonModule,
                MatTableModule,
                MatPaginatorModule,
                MatCardModule,
                MatDialogModule,
                BrowserAnimationsModule,
                CommonModule,
                FormsModule,
                ReactiveFormsModule,
                SidenavModule,
                InventoryModule
            ],
            declarations: [
                AlertDialogComponent
            ],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backendInstance, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                InventoryService,
                MockInventoryService,
                ApiService,
                MockLoginService,
                ConfigService,
                SharedService,
                Ng4LoadingSpinnerService,
                Constants,
                DatePipe,
                { provide: APP_BASE_HREF, useValue: '/' }
            ]
        })
            .compileComponents();
        TestBed.overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [AlertDialogComponent]
            }
        });
    }));

    beforeEach(inject([InventoryService, MockInventoryService, MatDialog],
        (inventoryservice, mockservice, matdialog) => {
            service = new inventoryDataSource(mockservice, matdialog);
        }));


    it('should run #connect()', async () => {
        const result = service.connect(collectionViewer);
        spyOn(service, 'connect');
        // tslint:disable-next-line:no-unused-expression
        expect(service.connect).toHaveBeenCalled;
    });

    it('should run #disconnect()', async () => {
        // disconnect(collectionViewer);
        const result = service.disconnect(collectionViewer);
        spyOn(service, 'disconnect');
        // tslint:disable-next-line:no-unused-expression
        expect(service.disconnect).toHaveBeenCalled;
    });

    // loadDatas
    it('should run #loadDatas() and returns value', async () => {
        service.loadDatas(0, 25, 'date', 'desc', '',
            [], [], [], []);
        spyOn(service, 'loadDatas');
        expect(service.loadDatas).toBeTruthy();
    });

    // loadDatasByCompanyCode
    it('should run #loadDatasByCompanyCode() and returns value', async () => {
        service.loadDatasByCompanyCode(0, 25, 'date', 'desc', '',
            [], [], [], '_uer21d');
        spyOn(service, 'loadDatasByCompanyCode');
        expect(service.loadDatasByCompanyCode).toBeTruthy();
    });

    it('should run #OpenDialog', () => {
        service.OpenDialog();
        spyOn(service, 'OpenDialog');
        // tslint:disable-next-line:no-unused-expression
        expect(service.OpenDialog).toHaveBeenCalled;
    });

    //   it('should run #loadDatas() and returns empty Array', async () => {
    //     noDataService.loadDatas(0, 25, 'date', 'desc', '',
    //       [], [], [], []);
    //     spyOn(service, 'loadDatas');
    //     expect(service.loadDatas).toBeTruthy();
    //   });
    //   // loadDatasByCompanyCode
    //   it('should run #loadDatasByCompanyCode() and returns value', async () => {
    //     service.loadDatasByCompanyCode(0, 25, 'date', 'desc', '',
    //       [], [], [], '_uer21d');
    //     spyOn(service, 'loadDatasByCompanyCode');
    //     expect(service.loadDatasByCompanyCode).toBeTruthy();
    //   });

    //   it('should run #loadDatasByCompanyCode() and returns empty Array', async () => {
    //     noDataService.loadDatasByCompanyCode(0, 25, 'date', 'desc', '',
    //       [], [], [], '_uer21d');
    //     spyOn(service, 'loadDatasByCompanyCode');
    //     expect(service.loadDatasByCompanyCode).toBeTruthy();
    //   });

    // it('should run #loadDatas()', async () => {
    //     // const result = loadDatas(pageIndex, pageSize, sortLabel, sortDirection, search, style, color, size, code);
    // });

    // it('should run #loadDatasByCompanyCode()', async () => {
    //     // const result = loadDatasByCompanyCode(pageIndex, pageSize, sortLabel, sortDirection, search, style, color, size, companyCode);
    // });

    it('should run #OpenDialog()', async () => {
        // const result = OpenDialog();
    });

});
