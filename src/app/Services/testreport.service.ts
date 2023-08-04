import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { YieldPoint } from '../Models/yield-point.model';
import { TestReport } from '../Models/testreport.model';

@Injectable({
  providedIn: 'root'
})
export class TestReportService {

  baseApiUrl:string = environment.baseApiUrl;
  constructor(private http:HttpClient) { }

  getAllTestReports():Observable<TestReport[]>
  {
    return this.http.get<TestReport[]>(this.baseApiUrl + '/api/TestReport');
  }
  addTestReport(addTestReportRequest: TestReport) :Observable<TestReport>
  {
    return this.http.post<TestReport>(this.baseApiUrl + '/api/TestReport', addTestReportRequest);
  }
  getTestReport(id:string) : Observable<TestReport>{
    return this.http.get<TestReport>(this.baseApiUrl + '/api/TestReport/' + id);
  }
  updateTestReport(updateTestReportRequest: TestReport) : Observable<TestReport>
  {
    return this.http.put<TestReport>(this.baseApiUrl + '/api/TestReport', updateTestReportRequest);
  }
  deleteTestReport(id:string) : Observable<TestReport>
  {
    return this.http.delete<TestReport>(this.baseApiUrl + '/api/TestReport?id=' + id);
  }
  getAllWorkstations():Observable<any[]>
  {
    var output:{name:string, checked:boolean}[] = [];
    var response = this.http.get<string[]>(this.baseApiUrl + '/api/TestReport/workstations');
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
  getFilteredTestReports(filters:{key:string, value:string[]}[]):Observable<TestReport[]>
  {
    var options = new HttpParams();
    filters.forEach(filter => {
      if (filter.value) {
        filter.value.forEach(filterValue => {
          options = options.append(filter.key, filterValue);
        })
      }
    });
    return this.http.get<TestReport[]>(this.baseApiUrl + '/api/TestReport', {params: options});
  }
  getYieldPoints(filters:{key:string, value:string[]}[]):Observable<{[workstation:string]:YieldPoint[]}>
  {
    var options = new HttpParams();
    filters.forEach(filter => {
      if (filter.value) {
        filter.value.forEach(filterValue => {
          options = options.append(filter.key, filterValue);
        })
      }
    });
    var temp = this.http.get<{[workstation:string]:YieldPoint[]}>(this.baseApiUrl + '/api/TestReport/yield', {params: options});
    return temp;
  }
}
 