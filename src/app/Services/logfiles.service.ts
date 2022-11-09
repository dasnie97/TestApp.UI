import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { idText } from 'typescript';
import { LogFile } from '../Models/logfile.model';

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
  getAllWorkstations():Observable<string[]>
  {
    return this.http.get<string[]>(this.baseApiUrl + '/api/LogFile/workstations');
  }
  getFilteredLogFiles(workstation:string, serialNumber?:string, result?:string, dut?:string, failure?:string):Observable<LogFile[]>
  {
    return this.http.get<LogFile[]>(this.baseApiUrl + '/api/LogFile/filter?workstation='+workstation);
  }
}
 