module app.models {
    export interface IAdDetailsModel {
        AdDetails: app.domain.IAd;
        AdApplicantDetails: app.domain.ProfileModel[];
    }

    export class AdDetailsModel implements IAdDetailsModel {
        constructor(public AdDetails: app.domain.IAd, public AdApplicantDetails: app.domain.ProfileModel[]) {
        }
    }
}