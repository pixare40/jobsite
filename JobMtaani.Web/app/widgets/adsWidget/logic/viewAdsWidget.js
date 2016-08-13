var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var ViewAdsWidgetController = (function () {
            function ViewAdsWidgetController(adService, $routeParams, currentUser, $location) {
                this.adService = adService;
                this.$routeParams = $routeParams;
                this.currentUser = currentUser;
                this.$location = $location;
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
                        _this.adDetails = data;
                        if (_this.currentUser.currentUserId !== data.AdDetails.AccountId) {
                            _this.$location.path("/ad/" + data.AdDetails.AdId);
                            return;
                        }
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
                    _this.renderAd();
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
                var _this = this;
                this.adService.closeAd(this.adDetails.AdDetails.AdId).success(function () {
                    _this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.SUCCESS, "Ad Closed Succesfully"));
                    _this.renderAd();
                }).error(function () {
                    _this.addAlert(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.ERROR, "Error Closing Ad, please try again later"));
                });
            };
            ViewAdsWidgetController.$inject = ['app.services.AdService', '$routeParams', 'app.services.CurrentUser', '$location'];
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
