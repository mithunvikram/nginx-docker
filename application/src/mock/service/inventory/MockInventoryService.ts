import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockInventoryService {
    constructor() { }

    getFilterValue(): Observable<any> {
        return Observable.of({
            'style': [
                {
                    'StyleNumber': 'JS71389',
                    '': 25
                },
                {
                    'StyleNumber': 'MJ81005',
                    '': 15
                },
                {
                    'StyleNumber': 'MJ83059',
                    '': 5
                }
            ],
            'color': [
                {
                    'StyleColor': 'AG',
                    '': 17
                },
                {
                    'StyleColor': 'ALY',
                    '': 22
                }
            ],
            'size': [
                {
                    'GarmentSize': '2XL',
                    '': 302
                },
                {
                    'GarmentSize': '2XS',
                    '': 88
                },
                {
                    'GarmentSize': '2XT',
                    '': 26
                }
            ],
            'code': [
                {
                    'CompanyCode': 'DFC',
                    '': 2498
                }
            ]
        });
    }
    getFilterValueByCompanyCode(companyCode: any): Observable<any> {
        return Observable.of({
            'style': [
                {
                    'StyleNumber': 'JS71389',
                    '': 25
                },
                {
                    'StyleNumber': 'MJ81005',
                    '': 15
                },
                {
                    'StyleNumber': 'MJ83059',
                    '': 5
                }
            ],
            'color': [
                {
                    'StyleColor': 'AG',
                    '': 17
                },
                {
                    'StyleColor': 'ALY',
                    '': 22
                }
            ],
            'size': [
                {
                    'GarmentSize': '2XL',
                    '': 302
                },
                {
                    'GarmentSize': '2XS',
                    '': 88
                },
                {
                    'GarmentSize': '2XT',
                    '': 26
                }
            ],
            'code': [
                {
                    'CompanyCode': 'DFC',
                    '': 2498
                }
            ]
        });
    }
    getInventoryByDateRange(startDate, endDate): Observable<any> {
        return Observable.of();
    }
    getInventoryItemsByDateRange(startDate, endDate, style): Observable<any> {
        const object = {
            startDate: startDate,
            endDate: endDate,
            style: style
        };
        return Observable.of({
            'uuid': '83b7bqW21',
            'FinishedGoodsID': 1,
            'AdjustedQuantityOnHand': 1,
            'CompanyCode': 'TTC',
            'CompanyID': 1,
            'CustomerCode': 'NEW',
            'DataExportDate': '1900-01-01T06:00:00.000Z',
            'DataExportID': 1,
            'Description': 'SST Blank Only ST',
            'GarmentSize': 'S',
            'ListPrice': '0.9',
            'QuantityOnHand': 1,
            'QuantityAllocated': 1,
            'QuantitySeconds': 0,
            'QuantityThirds': 0,
            'Season': ''
        });
    }
    getInventoryItemsByDateRangeCode(startDate, endDate, code, style): Observable<any> {
        const object = {
            startDate: startDate,
            endDate: endDate,
            code: code,
            style: style
        };
        return Observable.of({
            'uuid': '83b7bqW21',
            'FinishedGoodsID': 1,
            'AdjustedQuantityOnHand': 1,
            'CompanyCode': 'TTC',
            'CompanyID': 1,
            'CustomerCode': 'NEW',
            'DataExportDate': '1900-01-01T06:00:00.000Z',
            'DataExportID': 1,
            'Description': 'SST Blank Only ST',
            'GarmentSize': 'S',
            'ListPrice': '0.9',
            'QuantityOnHand': 1,
            'QuantityAllocated': 1,
            'QuantitySeconds': 0,
            'QuantityThirds': 0,
            'Season': ''
        });
    }
    exportAllInventory(): Observable<any> {
        return Observable.of({
            'uuid': '83b7bqW21',
            'FinishedGoodsID': 1,
            'AdjustedQuantityOnHand': 1,
            'CompanyCode': 'TTC',
            'CompanyID': 1,
            'CustomerCode': 'NEW',
            'DataExportDate': '1900-01-01T06:00:00.000Z',
            'DataExportID': 1,
            'Description': 'SST Blank Only ST',
            'GarmentSize': 'S',
            'ListPrice': '0.9',
            'QuantityOnHand': 1,
            'QuantityAllocated': 1,
            'QuantitySeconds': 0,
            'QuantityThirds': 0,
            'Season': ''
        });
    }
    exportAllInventoryByCode(code): Observable<any> {
        return Observable.of({
            'uuid': '83b7bqW21',
            'FinishedGoodsID': 1,
            'AdjustedQuantityOnHand': 1,
            'CompanyCode': 'TTC',
            'CompanyID': 1,
            'CustomerCode': 'NEW',
            'DataExportDate': '1900-01-01T06:00:00.000Z',
            'DataExportID': 1,
            'Description': 'SST Blank Only ST',
            'GarmentSize': 'S',
            'ListPrice': '0.9',
            'QuantityOnHand': 1,
            'QuantityAllocated': 1,
            'QuantitySeconds': 0,
            'QuantityThirds': 0,
            'Season': ''
        });
    }

    getData(
        pageNumber, pageSize, sortLabel, sortDirection, search,
        style, color, size, code): Observable<any> {
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
        return Observable.of({
            'count': 2,
            'response': [
                {
                    'uuid': '83b7bqW21',
                    'FinishedGoodsID': 1,
                    'AdjustedQuantityOnHand': 1,
                    'CompanyCode': 'TTC',
                    'CompanyID': 1,
                    'CustomerCode': 'NEW',
                    'DataExportDate': '1900-01-01T06:00:00.000Z',
                    'DataExportID': 1,
                    'Description': 'SST Blank Only ST',
                    'GarmentSize': 'S',
                    'ListPrice': '0.9',
                    'QuantityOnHand': 1,
                    'QuantityAllocated': 1,
                    'QuantitySeconds': 0,
                    'QuantityThirds': 0,
                    'Season': '',
                    'StyleColor': 'T',
                    'StyleID': 1,
                    'StyleName': 'CORE HOOD',
                    'StyleNumber': 'WT731',
                    'StyleOption': 'Blank Only',
                    'UPCNumber': '19084',
                    'FinishedGoodsAdjustments': [
                        {
                            'uuid': '2e16d4',
                            'GoodsTransactionID': 1,
                            'CompanyCode': 'DFFF',
                            'CompanyID': 1,
                            'CustomerCode': 'NEW',
                            'DataExportDate': '1900-01-01T15:36:00.000Z'
                        }
                    ]
                },
                {
                    'uuid': '155deec',
                    'FinishedGoodsID': 2,
                    'AdjustedQuantityOnHand': 2,
                    'CompanyCode': 'DSS',
                    'CompanyID': 2,
                    'CustomerCode': 'NEW',
                    'DataExportDate': '1900-01-01T06:00:00.000Z',
                    'DataExportID': 2,
                    'Description': 'ST Blanks Only XL',
                    'GarmentSize': 'XL',
                    'ListPrice': '0.9',
                    'QuantityOnHand': 2,
                    'QuantityAllocated': 2,
                    'QuantitySeconds': 0,
                    'QuantityThirds': 0,
                    'Season': '',
                    'StyleName': 'COREFL HOOD',
                    'StyleNumber': 'WT151',
                    'StyleOption': 'Blank Only',
                    'UPCNumber': '1907391',
                    'FinishedGoodsAdjustments': [
                        {
                            'uuid': '33f8ddb',
                            'GoodsTransactionID': 2,
                            'CompanyCode': 'DFS',
                            'CompanyID': 2,
                            'CustomerCode': 'NEW'
                        }
                    ]
                }
            ]
        });
    }
    getDataByCompanyCode(
        pageNumber, pageSize, sortLabel, sortDirection, search, style, color, size, companyCode): Observable<any> {

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
        return Observable.of({
            'count': 2,
            'response': [
                {
                    'uuid': '83b7bqW21',
                    'FinishedGoodsID': 1,
                    'AdjustedQuantityOnHand': 1,
                    'CompanyCode': 'TTC',
                    'CompanyID': 1,
                    'CustomerCode': 'NEW',
                    'DataExportDate': '1900-01-01T06:00:00.000Z',
                    'DataExportID': 1,
                    'Description': 'SST Blank Only ST',
                    'GarmentSize': 'S',
                    'ListPrice': '0.9',
                    'QuantityOnHand': 1,
                    'QuantityAllocated': 1,
                    'QuantitySeconds': 0,
                    'QuantityThirds': 0,
                    'Season': '',
                    'StyleColor': 'T',
                    'StyleID': 1,
                    'StyleName': 'CORE HOOD',
                    'StyleNumber': 'WT731',
                    'StyleOption': 'Blank Only',
                    'UPCNumber': '19084',
                    'FinishedGoodsAdjustments': [
                        {
                            'uuid': '2e16d4',
                            'GoodsTransactionID': 1,
                            'CompanyCode': 'DFFF',
                            'CompanyID': 1,
                            'CustomerCode': 'NEW',
                            'DataExportDate': '1900-01-01T15:36:00.000Z'
                        }
                    ]
                },
                {
                    'uuid': '155deec',
                    'FinishedGoodsID': 2,
                    'AdjustedQuantityOnHand': 2,
                    'CompanyCode': 'DSS',
                    'CompanyID': 2,
                    'CustomerCode': 'NEW',
                    'DataExportDate': '1900-01-01T06:00:00.000Z',
                    'DataExportID': 2,
                    'Description': 'ST Blanks Only XL',
                    'GarmentSize': 'XL',
                    'ListPrice': '0.9',
                    'QuantityOnHand': 2,
                    'QuantityAllocated': 2,
                    'QuantitySeconds': 0,
                    'QuantityThirds': 0,
                    'Season': '',
                    'StyleName': 'COREFL HOOD',
                    'StyleNumber': 'WT151',
                    'StyleOption': 'Blank Only',
                    'UPCNumber': '1907391',
                    'FinishedGoodsAdjustments': [
                        {
                            'uuid': '33f8ddb',
                            'GoodsTransactionID': 2,
                            'CompanyCode': 'DFS',
                            'CompanyID': 2,
                            'CustomerCode': 'NEW'
                        }
                    ]
                }
            ]
        });
        // return this.apiService.post(this.config.api_url + Constants.GetInventoryByCompanyCode, object).pipe(
        //     map(res => res)
        // );
    }

    getFilterValueData(data): Observable<any> {
        return Observable.of({
            'style': [
                {
                    'StyleNumber': 'JS71389',
                    '': 50
                },
                {
                    'StyleNumber': 'JT71388',
                    '': 55
                },
                {
                    'StyleNumber': 'MJ71042',
                    '': 5
                },
                {
                    'StyleNumber': 'MJ81005',
                    '': 15
                }
            ],
            'color': [
                {
                    'StyleColor': 'AG',
                    '': 17
                },
                {
                    'StyleColor': 'ALLOY',
                    '': 17
                },
                {
                    'StyleColor': 'ALY',
                    '': 25
                },
                {
                    'StyleColor': 'AST',
                    '': 48
                }
            ],
            'size': [
                {
                    'GarmentSize': '0',
                    '': 11
                },
                {
                    'GarmentSize': '1X',
                    '': 74
                },
                {
                    'GarmentSize': '2X',
                    '': 73
                },
                {
                    'GarmentSize': '2XL',
                    '': 352
                }
            ],
            'code': [
                {
                    'CompanyCode': 'DFC',
                    '': 3135
                }
            ]
        });
    }
    getFilterValueDataByCompanyCode(data, companyCode: any): Observable<any> {
        return Observable.of({
            'style': [
                {
                    'StyleNumber': 'JS71389',
                    '': 50
                },
                {
                    'StyleNumber': 'JT71388',
                    '': 55
                },
                {
                    'StyleNumber': 'MJ71042',
                    '': 5
                },
                {
                    'StyleNumber': 'MJ81005',
                    '': 15
                }
            ],
            'color': [
                {
                    'StyleColor': 'AG',
                    '': 17
                },
                {
                    'StyleColor': 'ALLOY',
                    '': 17
                },
                {
                    'StyleColor': 'ALY',
                    '': 25
                },
                {
                    'StyleColor': 'AST',
                    '': 48
                }
            ],
            'size': [
                {
                    'GarmentSize': '0',
                    '': 11
                },
                {
                    'GarmentSize': '1X',
                    '': 74
                },
                {
                    'GarmentSize': '2X',
                    '': 73
                },
                {
                    'GarmentSize': '2XL',
                    '': 352
                }
            ],
            'code': [
                {
                    'CompanyCode': 'DFC',
                    '': 3135
                }
            ]
        });
    }

    getInventoryitems(id): Observable<any> {
        return Observable.of([{
            'uuid': '33f8ddb',
            'GoodsTransactionID': 2,
            'CompanyCode': 'DFS',
            'CompanyID': 2,
            'CustomerCode': 'NEW'
        }, {
            'uuid': '33f8d543',
            'GoodsTransactionID': 4,
            'CompanyCode': 'DSS',
            'CompanyID': 3,
            'CustomerCode': 'NEW'
        }]);
    }

}
