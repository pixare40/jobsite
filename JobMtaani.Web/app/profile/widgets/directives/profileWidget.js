var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var ProfileWidgetController = (function () {
            function ProfileWidgetController(currentUser, $scope, $location, $rootScope) {
                var _this = this;
                this.currentUser = currentUser;
                this.$scope = $scope;
                this.$location = $location;
                this.$rootScope = $rootScope;
                this.getUserInfo();
                this.title = 'User Profile';
                this.$scope.$on('USER_LOGGED_IN', function (event, data) {
                    _this.getUserInfo();
                });
                this.$scope.$on('USER_LOGGED_OUT', function (event, data) {
                    _this.$location.path('/home');
                });
            }
            ProfileWidgetController.prototype.getUserInfo = function () {
                var _this = this;
                if (this.gettingUserInfo) {
                    return;
                }
                this.gettingUserInfo = true;
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.SHOW_LOADING, null);
                this.currentUser.getCurrentUserInfo().success(function (data, status) {
                    _this.userdata = data;
                    _this.successString = "Succesfully Login";
                    _this.errorString = null;
                    _this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.HIDE_LOADING, null);
                    _this.gettingUserInfo = false;
                }).error(function (data) {
                    _this.errorString = "Error Fetching User Data";
                    _this.successString = null;
                    _this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.HIDE_LOADING, null);
                    _this.gettingUserInfo = false;
                });
            };
            ProfileWidgetController.$inject = ['app.services.CurrentUser', '$scope', '$location', '$rootScope'];
            return ProfileWidgetController;
        }());
        var ProfileWidget = (function () {
            function ProfileWidget() {
                this.restrict = 'AE';
                this.controller = ProfileWidgetController;
                this.scope = {};
                this.controllerAs = 'vm';
                this.templateUrl = '/app/profile/widgets/templates/profileWidgetTemplate.html';
            }
            ProfileWidget.instance = function () {
                return new ProfileWidget;
            };
            return ProfileWidget;
        }());
        widgets.ProfileWidget = ProfileWidget;
        angular.module('app.widgets')
            .directive('jmProfileWidget', ProfileWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
