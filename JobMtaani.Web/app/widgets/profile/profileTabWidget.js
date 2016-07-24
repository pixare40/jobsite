var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var ProfileTabWidgetController = (function () {
            function ProfileTabWidgetController($scope, $element, $location) {
                this.$scope = $scope;
                this.$element = $element;
                this.$location = $location;
                this.tabs = [
                    { title: 'Dashboard', content: '<div jm-dashboard-widget></div>' },
                    { title: 'Profile', content: '<div jm-profile-widget></div>' },
                    { title: 'Ads', content: '<div jm-ads-widget></div>' },
                ];
            }
            ProfileTabWidgetController.$inject = ['$scope', '$element', '$location'];
            return ProfileTabWidgetController;
        }());
        var ProfileTabWidget = (function () {
            function ProfileTabWidget() {
                this.restrict = 'AE';
                this.controller = ProfileTabWidgetController;
                this.scope = {};
                this.controllerAs = 'vm';
                this.templateUrl = '/app/widgets/profile/profileTabWidgetTemplate.html';
            }
            ProfileTabWidget.instance = function () {
                return new ProfileTabWidget;
            };
            return ProfileTabWidget;
        }());
        widgets.ProfileTabWidget = ProfileTabWidget;
        angular
            .module('app.widgets')
            .directive('jmProfileTabWidget', ProfileTabWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
//# sourceMappingURL=profileTabWidget.js.map