export class CreateDowntimeReport
{
    problemDescription:string = "";
    actionTaken:string = "";
    technician:string = "";
    workstation:string = "";
    operator:string = "";
    timeStarted:string = "";
    timeFinished:string = "";
    totalDowntime:string = "";

    public constructor(init?: Partial<CreateDowntimeReport>)
    {
        Object.assign(this, init);
    }
}