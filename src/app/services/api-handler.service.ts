import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { dataHolderUrl } from './dataHandler';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  dataholder: string = dataHolderUrl

  constructor(private http: HttpClient) { }

  getAllVehicles() { 
    return this.http.get<any>(this.dataholder);
  }

}
