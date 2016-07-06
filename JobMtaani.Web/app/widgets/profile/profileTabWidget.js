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
                };
                this.$scope.$on(app.ValueObjects.NotificationsValueObject.PROFILE_CATEGORY_CHANGE, function (event, data) {
                    if (_this.directiveValueMap[data] != null) {
                        var newDirectiveKey = data;
                        if (_this.activeDirectiveKey != null) {
                            _this.$element.find('#' + _this.activeDirectiveKey).hide();
                        }
                        _this.$element.find('#' + data).show();
                        _this.activeDirectiveKey = data;
                    }
                });
                this.$element.find('#profile').show();
                this.activeDirectiveKey = 'profile';
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