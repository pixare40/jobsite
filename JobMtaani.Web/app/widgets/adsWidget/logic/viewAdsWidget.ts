module app.widgets {

    interface IViewAdsWidgetController {
    }

    class ViewAdsWidgetController {

        alerts: Array<app.models.IAlertModal>;
        adDetails: app.models.IAdDetailsModel;

        static $inject = ['app.services.AdService', '$routeParams'];
        constructor(private adService: app.services.AdService, private $routeParams: app.ads.IAdRouteParams) {
            this.renderAd();
        }

        renderAd(): void {
            var adId: number = this.$routeParams.adId;

            if (this.$routeParams.adId == null) {
                this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Fetching Ad"));
            }
            else {
                this.adService.getAdDetails(adId)
                    .success((data, status) => {
                        this.adDetails = data;
                    })
                    .error((data) => {
                        this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Fetching Ad"));
                    });
            }
        }
    }

    export class ViewAdsWidget implements ng.IDirective {
        static instance(): ng.IDirective{
            return new ViewAdsWidget;
        }

        restrict = 'AE';
        controllerAs = 'vm';
        controller = ViewAdsWidgetController;
        scope = {};
        templateUrl = '/app/widgets/adsWidget/templates/viewAdsWidgetTemplate.html';
    }

    angular
        .module('app.widgets')
        .directive('jmViewAdsWidget',ViewAdsWidget.instance)

}