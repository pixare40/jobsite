module app.models {

    export interface INewsFeedModel {
        AdDetails: app.domain.Ad;
        AdApplication: app.models.AdApplicationModel;
    }

    export class NewsFeedModel implements INewsFeedModel {
        constructor(public AdDetails: app.domain.Ad, public AdApplication: app.models.AdApplicationModel) {
        }
    }
}