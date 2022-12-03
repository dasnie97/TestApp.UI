import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Workstation } from '../Models/workstation.model';

@Injectable({
  providedIn: 'root'
})
export class WorkstationService {
  
  baseApiUrl:string = environment.baseApiUrl;
  constructor(private http:HttpClient) { }

  getWorkstations():Observable<Workstation[]>
  {
    return this.http.get<Workstation[]>(this.baseApiUrl + '/api/Workstation');
  }
}
