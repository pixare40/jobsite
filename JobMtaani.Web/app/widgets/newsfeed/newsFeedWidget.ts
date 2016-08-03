module app.widgets {

    class NewsFeedWidgetController {

        alerts: Array<app.models.IAlertModal>;
        newsFeedItems: app.models.NewsFeedModel[];

        static $inject = ["app.services.AdService"];
        constructor(private adService: app.services.AdService) {
            this.alerts = [];
            this.getNewsFeedItems();
        }

        getNewsFeedItems(): void {
            this.adService.getNewsFeed().success((data, status) => {
                if (data.length < 1) {
                    this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.INFO, "No news items to show"));
                    return;
                }

                this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.INFO, "Success Fetching Newsfeed"));
                this.newsFeedItems = data;
            }).error((data, status) => {
                console.log("Error Fetching News Feed");
            });
        }
    }

    export class NewsFeedWidget implements ng.IDirective{
        static instance() {
            return new NewsFeedWidget();
        }

        restrict = 'AE';
        controllerAs = 'vm';
        controller = NewsFeedWidgetController;
        scope = {};
        templateUrl = '/app/widgets/newsfeed/newsFeedWidgetTemplate.html';
    }

    angular
        .module("app.widgets")
        .directive("jmNewsFeedWidget", NewsFeedWidget.instance);

}