module app.models {
    export interface IAdApplicationDetailsModel {
    }

    export class AdApplicationDetailsModel {
        constructor(public AdApplication: app.models.AdApplicationModel, public AdDetails: app.domain.Ad) {
        }
    }
}