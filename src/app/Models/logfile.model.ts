export interface LogFile
{
    id:number,
    workstation:string,
    serialNumber:string,
    status:string,
    fixtureSocket:string,
    failure:string,
    operator:string,
    testDateTimeStarted:Date
}