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
                        //this.alerts.push();
                        _this.adDetails = data;
                        if (_this.adDetails.AdApplicantDetails.length < 1) {
                            _this.applicantsNotification = "Nobody has applied to this ad yet";
                        }
                    })
                        .error(function (data) {
                        _this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Fetching Ad"));
                    });
                }
            };
            ViewAdsWidgetController.prototype.hire = function (index) {
                var _this = this;
                var profileModel = this.adDetails.AdApplicantDetails[index];
                var hireModel = new app.models.HireModel(this.adDetails.AdDetails.AdId, profileModel.UserName);
                this.adService.hireEmployee(hireModel).success(function (data) {
                    _this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.SUCCESS, "Person hired succesfully"));
                }).error(function () {
                    _this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error hiring person"));
                });
            };
            ViewAdsWidgetController.prototype.addAlert = function (alert) {
                this.alerts.pop();
                this.alerts.push(alert);
            };
            ViewAdsWidgetController.prototype.closeAlert = function (index) {
                this.alerts.pop();
            };
            ViewAdsWidgetController.prototype.closeAd = function () {
                this.adService.closeAd(this.adDetails.AdDetails.AdId);
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
