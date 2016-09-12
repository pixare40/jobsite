module app.widgets {

    interface IViewAdsWidgetController {
    }

    class ViewAdsWidgetController {

        alerts: Array<app.models.IAlertModal>;
        adDetails: app.models.IAdDetailsModel;
        adStatus: number;
        applicantsNotification: string;
        timelapse: number;
        successfulAdApplication: models.AdApplicationModel;

        static $inject = ['app.services.AdService', '$routeParams', 'app.services.CurrentUser','$location','app.services.ReviewService'];
        constructor(private adService: app.services.AdService, private $routeParams: app.ads.IAdRouteParams,
            private currentUser: app.services.CurrentUser, private $location: ng.ILocationService, private reviewService: app.services.ReviewService) {
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
                        this.adDetails = data;
                        this.timelapse = this.dateDiffInDays(this.adDetails.AdDetails.DateCreated);

                        if (this.adDetails.AdDetails.AdClosed) {
                            this.getSuccesfulAdApplication();
                        }

                        if (this.currentUser.currentUserId !== data.AdDetails.AccountId) {
                            this.$location.path("/ad/" + data.AdDetails.AdId);
                            return;
                        }
                        if (this.adDetails.AdApplicantDetails.length < 1) {
                            this.applicantsNotification = "Nobody has applied to this ad yet";
                        }
                        else {
                            this.getReviews();
                        }
                    })
                    .error((data) => {
                        this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Fetching Ad"));
                    });
            }
        }

        hire(index: number): void {
            var profileModel = this.adDetails.AdApplicantDetails[index];
            var hireModel = new app.models.HireModel(this.adDetails.AdDetails.AdId, profileModel.UserName);
            this.adService.hireEmployee(hireModel).success((data) => {
                this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.SUCCESS, "Person hired succesfully"));
                this.renderAd();
            }).error(() => {
                this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error hiring person"));
            });
        }

        review(index: number): void {
            var profileModel = this.adDetails.AdApplicantDetails[index];
            var userId: string = profileModel.UserId;
            this.$location.path("/reviewUser/" + userId + "/" + this.adDetails.AdDetails.AdId);
        }

        getSuccesfulAdApplication(): void {
            this.adService.getSuccesfulAdApplication(this.adDetails.AdDetails.AdId).success((data) => {
                if (data) {
                    this.successfulAdApplication = data;
                }
            })
        }

        getReviews(): void {

        }

        showReviewButton(index: number): boolean {
            if (!this.successfulAdApplication) {
                return false;
            }
            var profileModel = this.adDetails.AdApplicantDetails[index];
            if (this.successfulAdApplication.AdApplicantId == profileModel.UserId) {
                return true;
            }
            else {
                return false;
            }
            
        }

        viewApplicant(userId): void {
            this.$location.path("/viewApplicant/" + userId);
        }

        getNumber(times: number): Array<number> {
            var newArray = new Array(times);
            return newArray;
        }

        addAlert(alert: app.models.AlertModel) {
            this.alerts.pop();
            this.alerts.push(alert);
        }

        closeAlert(index: number): void {
            this.alerts.pop();
        }

        closeAd() {
            this.adService.closeAd(this.adDetails.AdDetails.AdId).success(() => {
                this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.SUCCESS, "Ad Closed Succesfully"));
                this.renderAd();
            }).error(() => {
                this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Closing Ad, please try again later"));
            });
        }

        dateDiffInDays(dateCreated: Date): number {
            var currentDate = new Date();
            let mydate = dateCreated as any as string;
            var adDateCreation = new Date(mydate);
            var _MS_PER_DAY = 1000 * 60 * 60 * 24;
            // Discard the time and time-zone information.
            var utc1 = Date.UTC(adDateCreation.getFullYear(), adDateCreation.getMonth(), adDateCreation.getDate());
            var utc2 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            return Math.floor((utc2 - utc1) / _MS_PER_DAY);

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