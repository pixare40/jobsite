var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var ProfileTabWidgetController = (function () {
            function ProfileTabWidgetController($scope, $element, $compile) {
                var _this = this;
                this.$scope = $scope;
                this.$element = $element;
                this.$compile = $compile;
                this.directiveValueMap = {
                    'dashboard': '<div jm-dashboard-widget></div>',
                    'ads': '<div jm-ads-widget></div>',
                    'profile': '<div jm-profile-widget></div>',
                    'messages': '<div jm-messages-widget></div>'
                };
                this.$scope.$on(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, function (event, data) {
                    if (_this.directiveValueMap[data] != null) {
                        var compiledDirective = _this.$compile(_this.directiveValueMap[data])(_this.$scope);
                        _this.$element.find('.widget-content')..append(compiledDirective);
                    }
                });
            }
            ProfileTabWidgetController.$inject = ['$scope', '$element', '$compile'];
            return ProfileTabWidgetController;
        }());
        var ProfileTabWidget = (function () {
            function ProfileTabWidget() {
                this.restrict = 'AE';
                this.controller = ProfileTabWidgetController;
                this.controllerAs = 'vm';
                this.scope = {};
                this.templateUrl = '/app/widgets/profile/profileWidgetTemplate.html';
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
