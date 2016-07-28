var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var ViewAdsWidgetController = (function () {
            function ViewAdsWidgetController(adService, $routeParams) {
                this.adService = adService;
                this.$routeParams = $routeParams;
                this.renderAd();
            }
            ViewAdsWidgetController.prototype.renderAd = function () {
                var _this = this;
                var adId = this.$routeParams.adId;
                if (this.$routeParams.adId == null) {
                    this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Fetching Ad"));
                }
                else {
                    this.adService.getAdDetails(adId)
                        .success(function (data, status) {
                        _this.adDetails = data;
                    })
                        .error(function (data) {
                        _this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Fetching Ad"));
                    });
                }
            };
            ViewAdsWidgetController.$inject = ['app.services.AdService', '$routeParams'];
            return ViewAdsWidgetController;
        }());
        var ViewAdsWidget = (function () {
            function ViewAdsWidget() {
                this.restrict = 'AE';
                this.controllerAs = 'vm';
                this.controller = ViewAdsWidgetController;
                this.scope = {};
                this.templateUrl = '/app/widgets/adsWidget/templates/viewAdsWidgetTemplate.html';
            }
            ViewAdsWidget.instance = function () {
                return new ViewAdsWidget;
            };
            return ViewAdsWidget;
        }());
        widgets.ViewAdsWidget = ViewAdsWidget;
        angular
            .module('app.widgets')
            .directive('jmViewAdsWidget', ViewAdsWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
//# sourceMappingURL=viewAdsWidget.js.map