import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DowntimeReport } from '../Models/downtimereport.model';

@Injectable({
  providedIn: 'root'
})
export class DowntimereportService {

  baseApiUrl:string = environment.baseApiUrl;
  constructor(private http:HttpClient) { }

  getDowntimeReports():Observable<DowntimeReport[]>
  {
    return this.http.get<DowntimeReport[]>(this.baseApiUrl + '/api/DowntimeReport');
  }

  getFilteredDowntimeReports(filters:{key:string, value:string[]}[]):Observable<DowntimeReport[]>
  {
    var options = new HttpParams();
    filters.forEach(filter => {
      if (filter.value) {
        filter.value.forEach(filterValue => {
          options = options.append(filter.key, filterValue);
        })
      }
    });
    var response = this.http.get<DowntimeReport[]>(this.baseApiUrl + '/api/DowntimeReport', {params: options});
    return response;
  }
}
