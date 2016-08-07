module app.models {

    export interface INewsFeedModel {
        AdDetails: app.domain.Ad;
        AdApplication: app.models.AdApplicantModel;
    }

    export class NewsFeedModel implements INewsFeedModel {
        constructor(public AdDetails: app.domain.Ad, public AdApplication: app.models.AdApplicantModel) {
        }
    }
}