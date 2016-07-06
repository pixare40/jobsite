module app.widgets {

    class ProfileTabWidgetController {


        directiveValueMap: {} = {
            'dashboard': '<div jm-dashboard-widget></div>',
            'ads': '<div jm-ads-widget></div>',
            'profile': '<div jm-profile-widget></div>',
            'messages':'<div jm-messages-widget></div>'
        };
        static $inject = ['$scope', '$element', '$compile']
        constructor(private $scope: ng.IScope, private $element: ng.IAugmentedJQuery, private $compile: ng.ICompileService) {
            this.$scope.$on(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, (event, data: string) => {
                if (this.directiveValueMap[data] != null) {
                    var compiledDirective = this.$compile(this.directiveValueMap[data])(this.$scope);
                    this.$element.find('.widget-content')..append(compiledDirective);
                }
            });
        }
    }

    export class ProfileTabWidget implements ng.IDirective {
        static instance() {
            return new ProfileTabWidget;
        }

        restrict = 'AE';
        controller = ProfileTabWidgetController;
        controllerAs = 'vm';
        scope = {};
        templateUrl = '/app/widgets/profile/profileWidgetTemplate.html'
    }

    angular
        .module('app.widgets')
        .directive('jmProfileTabWidget', ProfileTabWidget.instance);

}