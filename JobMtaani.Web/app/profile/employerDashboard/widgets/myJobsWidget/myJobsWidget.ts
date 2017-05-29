module app.widgets {

    class MyJobsWidgetController {

        static $inject = ['app.services.CurrentUser', '$location'];
        constructor(private currentUser: app.services.CurrentUser, private $location: ng.ILocationService) {
            if (currentUser.currentUserId == null) {
                this.$location.path('/login');
                return;
            }
        }
    }
    export class MyJobsWidget implements ng.IDirective {
        static instance() {
            return new MyJobsWidget;
        }

        restrict = 'AE';
        controller = MyJobsWidgetController;
        scope = {};
        controllerAs = 'vm';
        templateUrl = 'myJobsWidgetTemplate.html'
    }

    angular.module('app.widgets')
        .directive('jmMyJobsWidget', MyJobsWidget.instance);
}