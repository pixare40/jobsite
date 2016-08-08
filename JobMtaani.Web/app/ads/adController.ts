module app.ads {
    export interface IAdRouteParams extends ng.route.IRouteParamsService {
        adId: number;
    }

    interface IAdController {
    }

    class AdController implements IAdController {

        ad: app.domain.Ad;
        successMessage: string;
        errorMessage: string;

        static $inject = ['app.services.AdService', '$routeParams', 'app.services.CurrentUser', '$location']
        constructor(private adService: app.services.AdService, private $routeParams: IAdRouteParams,
            private currentUser: app.services.CurrentUser, private $location: ng.ILocationService) {
            this.renderAd();
        }

        renderAd(): void {
            this.adService.getAd(this.$routeParams.adId).success((data, status) => {
                if (this.currentUser.currentUserId == data.AccountId) {
                    this.$location.path("/viewAd/" + data.AdId);
                    return;
                }
                this.ad = data;
            }).error((data) => {
                this.errorMessage = "Error fetching Ad Data";
            });
        }

        applyForJob(): void {
            if (!this.currentUser.profile.isLoggedIn) {
                this.errorMessage = "Please Login First to Apply for this job";
            }
            else {
                this.adService.applyToAd(this.ad.AdId).success((data, status) => {
                    this.successMessage = "Succesfully Applied to Ad";
                }).error((data) => {
                    this.errorMessage = "An Error was encountered applying to the ad";
                });
            }
        }
    }

    angular
        .module('app.ads')
        .controller('app.ads.AdController', AdController);

}