var app;
(function (app) {
    var ads;
    (function (ads) {
        'use strict';
        var AdsController = (function () {
            function AdsController(adService) {
                this.adService = adService;
                this.title = 'Ads ';
            }
            AdsController.$inject = ['app.services.AdService'];
            return AdsController;
        }());
        angular
            .module('app.ads')
            .controller('app.ads.AdsController', AdsController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
//# sourceMappingURL=adsController.js.map