import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogFile } from '../Models/logfile.model';
import { YieldPoint } from '../Models/yield-point.model';

@Injectable({
  providedIn: 'root'
})
export class LogfilesService {

  baseApiUrl:string = environment.baseApiUrl;
  constructor(private http:HttpClient) { }

  getAllLogfiles():Observable<LogFile[]>
  {
    return this.http.get<LogFile[]>(this.baseApiUrl + '/api/LogFile');
  }
  addLogFile(addLogFileRequest: LogFile) :Observable<LogFile>
  {
    return this.http.post<LogFile>(this.baseApiUrl + '/api/LogFile', addLogFileRequest);
  }
  getLogFile(id:string) : Observable<LogFile>{
    return this.http.get<LogFile>(this.baseApiUrl + '/api/LogFile/' + id);
  }
  updateLogFile(updateLogFileRequest: LogFile) : Observable<LogFile>
  {
    return this.http.put<LogFile>(this.baseApiUrl + '/api/LogFile', updateLogFileRequest);
  }
  deleteLogFile(id:string) : Observable<LogFile>
  {
    return this.http.delete<LogFile>(this.baseApiUrl + '/api/LogFile?id=' + id);
  }
  getAllWorkstations():Observable<any[]>
  {
    var output:{name:string, checked:boolean}[] = [];
    var response = this.http.get<string[]>(this.baseApiUrl + '/api/LogFile/workstations');
    response.subscribe(
      {
        next:(workstations)=>
        {
          for (let i = 0; i < workstations.length; i++) {
            const element = workstations[i];
            output.push({name:element, checked:false});
          }
        },
        error:(response)=>
        {
          console.log(response);
        }
      }
    );
    return of(output);
  }
  getFilteredLogFiles(filters:{key:string, value:string[]}[]):Observable<LogFile[]>
  {
    var options = new HttpParams();
    filters.forEach(filter => {
      if (filter.value) {
        filter.value.forEach(filterValue => {
          options = options.append(filter.key, filterValue);
        })
      }
    });
    return this.http.get<LogFile[]>(this.baseApiUrl + '/api/LogFile', {params: options});
  }
  getYieldPoints():Observable<{[workstation:string]:YieldPoint[]}>
  {
    var temp = this.http.get<{[workstation:string]:YieldPoint[]}>(this.baseApiUrl + '/api/LogFile/yield');
    return temp;
  }
}
 