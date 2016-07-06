module app.profile.widgets{

    class DashboardWidgetController {

        static $inject = ['']
        constructor() {
        }
    }

    export class DashboardWidget implements ng.IDirective {
        static instance() {
            return new DashboardWidget;
        }

        restrict = 'AE';
        crntroller = DashboardWidgetController;
        controllerAs = 'vm';
        templateUrl = '/app/profile/widgets/dashboardWidgetTemplate.html'
    }

    angular.module('app.widgets')
        .directive('jmDashboardWidget', DashboardWidget.instance);

}