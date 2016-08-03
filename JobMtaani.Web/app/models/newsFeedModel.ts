module app.models {

    export interface INewsFeedModel {
        ad: app.domain.Ad;
        adApplication: app.models.AdApplicantModel;
    }

    export class NewsFeedModel implements INewsFeedModel {
        constructor(public ad: app.domain.Ad, public adApplication: app.models.AdApplicantModel) {
        }
    }
}