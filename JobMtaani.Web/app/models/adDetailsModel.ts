module app.models {
    export interface IAdDetailsModel {
        ad: app.domain.IAd;
        user: app.domain.ProfileModel;
    }

    export class AdDetailsModel implements IAdDetailsModel {
        constructor(public ad: app.domain.IAd, public user: app.domain.ProfileModel) {
        }
    }
}