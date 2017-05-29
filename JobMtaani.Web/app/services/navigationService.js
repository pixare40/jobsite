var app;
(function (app) {
    var services;
    (function (services) {
        var NavigationService = (function () {
            function NavigationService($rootScope, $location) {
                this.$rootScope = $rootScope;
                this.$location = $location;
                this.$rootScope.$on('GO_TO_ADS', this.goToAds);
            }
            NavigationService.prototype.goToAds = function () {
                this.$location.path('#Ads');
            };
            return NavigationService;
        }());
        NavigationService.$inject = ['$rootScope', '$location'];
        services.NavigationService = NavigationService;
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=navigationService.js.map