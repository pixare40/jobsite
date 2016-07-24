module app.widgets {

    class ProfileTabWidgetController {

        tabs: {};
        static $inject = ['$scope', '$element', '$location']
        constructor(private $scope: ng.IScope, private $element: ng.IAugmentedJQuery,
            private $location: ng.ILocationService) {
            this.tabs = [
                { title: 'Dashboard', content: '<div jm-dashboard-widget></div>' },
                { title: 'Profile', content: '<div jm-profile-widget></div>' },
                { title: 'Ads', content: '<div jm-ads-widget></div>' },
            ];
        }
    }

    export class ProfileTabWidget implements ng.IDirective {
        static instance() {
            return new ProfileTabWidget;
        }

        restrict = 'AE';
        controller = ProfileTabWidgetController;
        scope = {};
        controllerAs = 'vm';
        templateUrl = '/app/widgets/profile/profileTabWidgetTemplate.html'
    }

    angular
        .module('app.widgets')
        .directive('jmProfileTabWidget', ProfileTabWidget.instance);

}