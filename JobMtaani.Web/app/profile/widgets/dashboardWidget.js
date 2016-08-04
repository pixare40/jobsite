var app;
(function (app) {
    var profile;
    (function (profile) {
        var widgets;
        (function (widgets) {
            var DashboardWidgetController = (function () {
                function DashboardWidgetController($scope, currentUser) {
                    var _this = this;
                    this.$scope = $scope;
                    this.currentUser = currentUser;
                    this.$scope.$on(app.ValueObjects.NotificationsValueObject.USER_LOGGED_IN, function (event, data) {
                        _this.initialiseDashboard();
                    });
                    this.initialiseDashboard();
                }
                DashboardWidgetController.prototype.initialiseDashboard = function () {
                    this.username = this.currentUser.getProfile().username;
                };
                DashboardWidgetController.$inject = ['$scope', 'app.services.CurrentUser'];
                return DashboardWidgetController;
            }());
            var DashboardWidget = (function () {
                function DashboardWidget() {
                    this.restrict = 'AE';
                    this.controller = DashboardWidgetController;
                    this.controllerAs = 'vm';
                    this.scope = {};
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
