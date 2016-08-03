module app.models {
    export interface IAdApplicationModel {
        AdApplicationId: number;
        AdId: number;
        AdApplicantId: string;
        DateApplied: Date;
        Status: number
    }

    export class AdApplicantModel implements IAdApplicationModel {
        constructor(public AdApplicationId: number, public AdId: number, public AdApplicantId: string, public DateApplied: Date, public Status: number) {
        }
    }
}