module app.profile.widgets{

    class DashboardWidgetController {

        username: string;

        static $inject = ['$scope','app.services.CurrentUser']
        constructor(private $scope: ng.IScope, private currentUser: app.services.CurrentUser) {
            this.$scope.$on(app.ValueObjects.NotificationsValueObject.USER_LOGGED_IN, (event, data) => {
                this.initialiseDashboard();
            });

            this.initialiseDashboard();
        }

        initialiseDashboard(): void {
            this.username = this.currentUser.getProfile().username;
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