module app.widgets {

    interface IViewAdsWidgetController {
    }

    class ViewAdsWidgetController {

        alerts: Array<app.models.IAlertModal>;
        adDetails: app.models.IAdDetailsModel;
        adClosed: boolean;

        static $inject = ['app.services.AdService', '$routeParams'];
        constructor(private adService: app.services.AdService, private $routeParams: app.ads.IAdRouteParams) {
            this.alerts = [];
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
                        this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.SUCCESS, "Success"));
                        this.adDetails = data;
                    })
                    .error((data) => {
                        this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Fetching Ad"));
                    });
            }
        }

        hire(index: number): void {
            var profileModel = this.adDetails.AdApplicantDetails[index];
            var hireModel = new app.models.HireModel(this.adDetails.AdDetails.AdId, profileModel.UserName);
            this.adService.hireEmployee(hireModel).success(() => {
                console.log("Successful hire");
            }).error(() => {
                    console.log("Unsuccesful hire");
            });
        }

        closeAlert(index: number): void {
            this.alerts.pop();
        }

        closeAd() {
            this.adService.closeAd(this.adDetails.AdDetails.AdId);
        }
    }

    export class ViewAdsWidget implements ng.IDirective {
        static instance(): ng.IDirective{
            return new ViewAdsWidget;
        }

        restrict = 'AE';
        controllerAs = 'vm';
        controller = ViewAdsWidgetController;
        templateUrl = '/app/widgets/adsWidget/templates/viewAdsWidgetTemplate.html';
    }

    angular
        .module('app.widgets')
        .directive('jmViewAdsWidget',ViewAdsWidget.instance)

}