module app.ads {

    export interface IAdApplicationRouteParams extends ng.route.IRouteParamsService {
        applicationId: number;
    }

    class AdApplicationController {

        adApplication: app.models.AdApplicationDetailsModel;
        successString: string;
        errorString: string;
        generalMessage: string;
        applicationWithdrawn;

        static $inject = ["app.services.AdService", "$routeParams", "app.services.CurrentUser", "$location"];
        constructor(private adService: app.services.AdService, private $routeParams: app.ads.IAdApplicationRouteParams,
            private currentUser: app.services.CurrentUser, private $location: ng.ILocationService) {
            this.initialiseView();
        }

        initialiseView() {
            if (!this.currentUser.getProfile().isLoggedIn) {
                this.$location.path("/login");
                return;
            }

            this.getApplicationData();
        }

        getApplicationData(): void {
            var applicationId = this.$routeParams.applicationId;
            this.adService.getAdApplication(applicationId).success((data) => {
                this.adApplication = data;
            }).error(() => {
                this.errorString = null;
                this.errorString = "Error fetching application, check your connection";
            });
        }

        withdrawApplication(): void {
            var applicationId = this.$routeParams.applicationId;
            this.adService.withdrawAdApplication(applicationId).success((data) => {
                this.successString = "Succesfully withdrew your application";
                this.getApplicationData();
            }).error(() => {
                this.errorString = null;
                this.errorString = "Error withdrawing application, please check your connection";
            });
        }
    }

    angular
        .module("app.ads")
        .controller("app.ads.AdApplicationController", AdApplicationController);

}