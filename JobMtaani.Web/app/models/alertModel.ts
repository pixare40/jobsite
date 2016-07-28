module app.models {
    export interface IAlertModal {
        type: string;
        msg: string;
    }

    export class AlertModel implements IAlertModal {
        constructor(public type: string, public msg: string) {
        }
    }
}