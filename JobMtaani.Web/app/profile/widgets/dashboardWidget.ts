module app.profile.widgets{

    class DashboardWidgetController {

        jobs: app.domain.Ad[];
        username: string;

        static $inject = ['$scope', 'app.services.CurrentUser', 'app.services.AdService','$location']
        constructor(private $scope: ng.IScope, private currentUser: app.services.CurrentUser,
            private adService: app.services.AdService, private $location: ng.ILocationService) {
            this.$scope.$on(app.ValueObjects.NotificationsValueObject.USER_INFO_AVAILABLE, (event, data) => {
                this.initialiseDashboard();
            });

            this.initialiseDashboard();
        }

        initialiseDashboard(): void {
            this.username = this.currentUser.getProfile().username;
            this.adService.getLocalAds().success((data, status) => {
                this.jobs = data;
            }).error(() => {
                console.log("Error fetching local jobs");
            });
        }

        applyToJob(adId: number) {
            this.$location.path("/ad/" + adId);
        }
    }

    export class DashboardWidget implements ng.IDirective {
        static instance() {
            return new DashboardWidget;
        }

        restrict = 'AE';
        controller = DashboardWidgetController;
        controllerAs = 'vm';
        scope = {};
        templateUrl = '/app/profile/widgets/dashboardWidgetTemplate.html'
    }

    angular.module('app.widgets')
        .directive('jmDashboardWidget', DashboardWidget.instance);

}