var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var MyJobsWidgetController = (function () {
            function MyJobsWidgetController(currentUser, $location) {
                this.currentUser = currentUser;
                this.$location = $location;
                if (currentUser.currentUserId == null) {
                    this.$location.path('/login');
                    return;
                }
            }
            return MyJobsWidgetController;
        }());
        MyJobsWidgetController.$inject = ['app.services.CurrentUser', '$location'];
        var MyJobsWidget = (function () {
            function MyJobsWidget() {
                this.restrict = 'AE';
                this.controller = MyJobsWidgetController;
                this.scope = {};
                this.controllerAs = 'vm';
                this.templateUrl = 'myJobsWidgetTemplate.html';
            }
            MyJobsWidget.instance = function () {
                return new MyJobsWidget;
            };
            return MyJobsWidget;
        }());
        widgets.MyJobsWidget = MyJobsWidget;
        angular.module('app.widgets')
            .directive('jmMyJobsWidget', MyJobsWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
//# sourceMappingURL=myJobsWidget.js.map