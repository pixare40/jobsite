module app.widgets {

    class ProfileTabWidgetController {
        activeDirectiveKey: string;

        directiveValueMap: {} = {
            'dashboard': '<div jm-dashboard-widget></div>',
            'ads': '<div jm-ads-widget></div>',
            'profile': '<div jm-profile-widget></div>',
        };
        static $inject = ['$scope', '$element', '$location']
        constructor(private $scope: ng.IScope, private $element: ng.IAugmentedJQuery,
            private $location: ng.ILocationService) {
            this.$scope.$on(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, (event, data: string) => {
                if (this.directiveValueMap[data] != null) {
                    var newDirectiveKey = data;
                    if (this.activeDirectiveKey != null) {
                        this.$element.find('#' + this.activeDirectiveKey).hide();
                    }
                    this.$element.find('#' + data).show();
                    this.activeDirectiveKey = data;
                }

            });

            this.$element.find('#profile').show();
            this.activeDirectiveKey = 'profile';
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