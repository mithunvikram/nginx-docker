import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from '../config/api.service';
import { ConfigService } from '../config/config.service';
import { Constants } from '../config/Constant';



@Injectable()
export class GroupMailService {
    constructor(private apiService: ApiService, private configService: ConfigService, private constants: Constants) { }


    getAllMail(): Observable<any> {
        return this.apiService.get(this.configService.api_url + Constants.GetAllMail);
    }
    saveMail(mail): Observable<any> {
        return this.apiService.post(this.configService.api_url + Constants.CreateMail, mail);
    }
    updateMail(mail): Observable <any> {
        return this.apiService.put(this.configService.api_url + Constants.UpdateMail, mail);
    }

    deleteMail(mail): Observable <any> {
        return this.apiService.delete(this.configService.api_url + Constants.DeleteMail + mail.uuid);
    }

}
