var app;
(function (app) {
    var home;
    (function (home) {
        var HomeController = (function () {
            function HomeController() {
                this.title = 'Job Mtaani App';
            }
            return HomeController;
        }());
        angular
            .module('app.home')
            .controller('app.home.HomeController', HomeController);
    })(home = app.home || (app.home = {}));
})(app || (app = {}));
