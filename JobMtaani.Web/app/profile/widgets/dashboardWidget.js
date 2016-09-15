var app;
(function (app) {
    var profile;
    (function (profile) {
        var widgets;
        (function (widgets) {
            var DashboardWidgetController = (function () {
                function DashboardWidgetController($scope, currentUser, adService, $location) {
                    var _this = this;
                    this.$scope = $scope;
                    this.currentUser = currentUser;
                    this.adService = adService;
                    this.$location = $location;
                    this.$scope.$on(app.ValueObjects.NotificationsValueObject.USER_INFO_AVAILABLE, function (event, data) {
                        _this.initialiseDashboard();
                    });
                    this.initialiseDashboard();
                }
                DashboardWidgetController.prototype.initialiseDashboard = function () {
                    var _this = this;
                    this.username = this.currentUser.getProfile().username;
                    this.adService.getLocalAds().success(function (data, status) {
                        _this.jobs = data;
                    }).error(function () {
                        console.log("Error fetching local jobs");
                    });
                };
                DashboardWidgetController.prototype.applyToJob = function (adId) {
                    this.$location.path("/ad/" + adId);
                };
                DashboardWidgetController.$inject = ['$scope', 'app.services.CurrentUser', 'app.services.AdService', '$location'];
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
//# sourceMappingURL=dashboardWidget.js.map