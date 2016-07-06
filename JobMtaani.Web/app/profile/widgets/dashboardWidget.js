var app;
(function (app) {
    var profile;
    (function (profile) {
        var widgets;
        (function (widgets) {
            var DashboardWidgetController = (function () {
                function DashboardWidgetController() {
                }
                DashboardWidgetController.$inject = [''];
                return DashboardWidgetController;
            }());
            var DashboardWidget = (function () {
                function DashboardWidget() {
                    this.restrict = 'AE';
                    this.crntroller = DashboardWidgetController;
                    this.controllerAs = 'vm';
                    this.templateUrl = '/app/profile/widgets/dashboardWidgetTemplate.html';
                }
                DashboardWidget.instance = function () {
                    return new DashboardWidget;
                };
                return DashboardWidget;
            }());
            widgets.DashboardWidget = DashboardWidget;
            angular.module('app.widgets')
                .directive('jmDashboardWidget', DashboardWidget.instance);
        })(widgets = profile.widgets || (profile.widgets = {}));
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
