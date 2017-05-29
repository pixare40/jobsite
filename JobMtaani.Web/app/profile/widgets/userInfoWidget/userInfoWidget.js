var app;
(function (app) {
    var profile;
    (function (profile) {
        var widgets;
        (function (widgets) {
            var UserInfoWidgetController = (function () {
                function UserInfoWidgetController(accountService, $routeParams) {
                    this.accountService = accountService;
                    this.$routeParams = $routeParams;
                    this.getUserInfo();
                }
                UserInfoWidgetController.prototype.getUserInfo = function () {
                    var _this = this;
                    this.accountService.getApplicantInfo(this.$routeParams.userID).success(function (data) {
                        _this.userInfo = data;
                    }).error(function () {
                        console.log("Error fetching user info");
                    });
                };
                return UserInfoWidgetController;
            }());
            UserInfoWidgetController.$inject = ["app.services.AccountService"];
            var UserInfoWidget = (function () {
                function UserInfoWidget() {
                    this.restrict = 'AE';
                    this.controller = UserInfoWidgetController;
                    this.controllerAs = 'vm';
                    this.scope = {};
                    this.templateUrl = 'userInfoWidgetTemplate.html';
                }
                UserInfoWidget.instance = function () {
                    return new UserInfoWidget;
                };
                return UserInfoWidget;
            }());
            widgets.UserInfoWidget = UserInfoWidget;
            angular.module('app.widgets')
                .directive('jmUserInfoWidget', UserInfoWidget.instance);
        })(widgets = profile.widgets || (profile.widgets = {}));
    })(profile = app.profile || (app.profile = {}));
})(app || (app = {}));
//# sourceMappingURL=userInfoWidget.js.map