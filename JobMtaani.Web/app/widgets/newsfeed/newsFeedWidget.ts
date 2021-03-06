﻿module app.widgets {

    class NewsFeedWidgetController {

        alerts: Array<app.models.IAlertModal>;
        newsFeedItems: app.models.NewsFeedModel[];
        totalItems: number;
        currentPage: number;
        maxSize: number;

        static $inject = ["app.services.AdService", "$location"];
        constructor(private adService: app.services.AdService, private $location: ng.ILocationService) {
            this.currentPage = 1;
            this.maxSize = 6;

            this.alerts = [];
            this.getTotalNewsFeedItems();
            this.pageChanged();
        }

        getTotalNewsFeedItems(): void {
            this.adService.getTotalAdApplications().success((data) => {
                this.totalItems = data;
            })
        }

        pageChanged(): void {
            this.adService.getNewsFeed(this.currentPage).success((data, status) => {
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

        viewApplication(adApplicationId: number): void {
            this.$location.path("/adApplication/" + adApplicationId);
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