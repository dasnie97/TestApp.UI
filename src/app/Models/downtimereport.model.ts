export interface DowntimeReport
{
    id:number,
    problemDescription:string,
    actionTaken:string,
    technician:string,
    workstation:string,
    operator:string,
    timeStarted:Date,
    timeFinished:Date,
    totalDowntime:Date,
    recordCreated:Date
}