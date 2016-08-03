var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var ViewAdsWidgetController = (function () {
            function ViewAdsWidgetController(adService, $routeParams) {
                this.adService = adService;
                this.$routeParams = $routeParams;
                this.alerts = [];
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
                        _this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.SUCCESS, "Success"));
                        _this.adDetails = data;
                    })
                        .error(function (data) {
                        _this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Fetching Ad"));
                    });
                }
            };
            ViewAdsWidgetController.prototype.hire = function (index) {
                var profileModel = this.adDetails.AdApplicantDetails[index];
                var hireModel = new app.models.HireModel(this.adDetails.AdDetails.AdId, profileModel.UserName);
                this.adService.hireEmployee(hireModel).success(function () {
                    console.log("Successful hire");
                })
                    .error(function () {
                    console.log("Unsuccesful hire");
                });
            };
            ViewAdsWidgetController.prototype.closeAlert = function (index) {
                console.log(index);
            };
            ViewAdsWidgetController.$inject = ['app.services.AdService', '$routeParams'];
            return ViewAdsWidgetController;
        }());
        var ViewAdsWidget = (function () {
            function ViewAdsWidget() {
                this.restrict = 'AE';
                this.controllerAs = 'vm';
                this.controller = ViewAdsWidgetController;
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