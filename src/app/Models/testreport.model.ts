export interface TestReport
{
    id:number,
    workstation:string,
    serialNumber:string,
    isFirstPass:boolean | null,
    isFalseCall:boolean | null,
    status:string,
    fixtureSocket:string,
    failure:string,
    operator:string,
    testDateTimeStarted:Date,
    recordCreated:Date
}