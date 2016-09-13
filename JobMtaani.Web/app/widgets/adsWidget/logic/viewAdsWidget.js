var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var ViewAdsWidgetController = (function () {
            function ViewAdsWidgetController(adService, $routeParams, currentUser, $location, reviewService) {
                this.adService = adService;
                this.$routeParams = $routeParams;
                this.currentUser = currentUser;
                this.$location = $location;
                this.reviewService = reviewService;
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
                        _this.timelapse = _this.dateDiffInDays(_this.adDetails.AdDetails.DateCreated);
                        if (_this.adDetails.AdDetails.AdClosed) {
                            _this.getSuccesfulAdApplication();
                        }
                        if (_this.currentUser.currentUserId !== data.AdDetails.AccountId) {
                            _this.$location.path("/ad/" + data.AdDetails.AdId);
                            return;
                        }
                        if (_this.adDetails.AdApplicantDetails.length < 1) {
                            _this.applicantsNotification = "Nobody has applied to this ad yet";
                        }
                        else {
                            _this.getReviews();
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
            ViewAdsWidgetController.prototype.review = function (index) {
                var profileModel = this.adDetails.AdApplicantDetails[index];
                var userId = profileModel.UserId;
                this.$location.path("/reviewUser/" + userId + "/" + this.adDetails.AdDetails.AdId);
            };
            ViewAdsWidgetController.prototype.getSuccesfulAdApplication = function () {
                var _this = this;
                this.adService.getSuccesfulAdApplication(this.adDetails.AdDetails.AdId).success(function (data) {
                    if (data) {
                        _this.successfulAdApplication = data;
                    }
                });
            };
            ViewAdsWidgetController.prototype.getReviews = function () {
            };
            ViewAdsWidgetController.prototype.showReviewButton = function (index) {
                if (!this.successfulAdApplication) {
                    return false;
                }
                var profileModel = this.adDetails.AdApplicantDetails[index];
                if (this.successfulAdApplication.AdApplicantId == profileModel.UserId) {
                    return true;
                }
                else {
                    return false;
                }
            };
            ViewAdsWidgetController.prototype.viewApplicant = function (userId) {
                this.$location.path("/viewApplicant/" + userId);
            };
            ViewAdsWidgetController.prototype.getNumber = function (times) {
                var newArray = new Array(times);
                return newArray;
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
            ViewAdsWidgetController.prototype.dateDiffInDays = function (dateCreated) {
                var currentDate = new Date();
                var mydate = dateCreated;
                var adDateCreation = new Date(mydate);
                var _MS_PER_DAY = 1000 * 60 * 60 * 24;
                // Discard the time and time-zone information.
                var utc1 = Date.UTC(adDateCreation.getFullYear(), adDateCreation.getMonth(), adDateCreation.getDate());
                var utc2 = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
                return Math.floor((utc2 - utc1) / _MS_PER_DAY);
            };
            ViewAdsWidgetController.$inject = ['app.services.AdService', '$routeParams', 'app.services.CurrentUser', '$location', 'app.services.ReviewService'];
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
