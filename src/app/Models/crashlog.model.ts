export interface Crashlog
{
    id:number,
    workstation:string,
    problem:string,
    action:string,
    technician:string,
    operator:string,
    time:Date,
    status:string,
}