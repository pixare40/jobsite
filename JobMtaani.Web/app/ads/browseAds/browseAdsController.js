var app;
(function (app) {
    var ads;
    (function (ads) {
        var BrowseAdsController = (function () {
            function BrowseAdsController(searchService, $location, currentUser, adService) {
                this.searchService = searchService;
                this.$location = $location;
                this.currentUser = currentUser;
                this.adService = adService;
                this.currentPage = 1;
                this.maxSize = 6;
                this.initialiseElements();
                this.getTotalAds();
                this.pageChanged();
            }
            BrowseAdsController.prototype.getTotalAds = function () {
                var _this = this;
                this.adService.getTotalAds().success(function (data) {
                    _this.totalItems = data;
                });
            };
            BrowseAdsController.prototype.initialiseElements = function () {
                this.loadingContainer = document.getElementsByClassName("loading-container")[0];
                this.searchResultsContainer = document.getElementsByClassName("search-results-container")[0];
                this.loadingContainer.classList.add("displayNone");
            };
            BrowseAdsController.prototype.hideResults = function () {
                this.loadingContainer = document.getElementsByClassName("loading-container")[0];
                this.searchResultsContainer = document.getElementsByClassName("search-results-container")[0];
                this.loadingContainer.classList.remove("displayNone");
                this.searchResultsContainer.classList.add("displayNone");
                this.ads = null;
            };
            BrowseAdsController.prototype.showResults = function () {
                this.loadingContainer = document.getElementsByClassName("loading-container")[0];
                this.searchResultsContainer = document.getElementsByClassName("search-results-container")[0];
                this.loadingContainer.classList.add("displayNone");
                this.searchResultsContainer.classList.remove("displayNone");
            };
            BrowseAdsController.prototype.pageChanged = function () {
                var _this = this;
                this.hideResults();
                this.searchService.browseAdsPaged(this.currentPage).success(function (data) {
                    _this.ads = data;
                    _this.showResults();
                });
            };
            BrowseAdsController.prototype.goToAd = function (index) {
                var _this = this;
                var selectedAd = this.ads[index];
                if (this.currentUser.getProfile().isLoggedIn) {
                    this.currentUser.getCurrentUserInfo().success(function (data) {
                        if (selectedAd.AccountId == data.UserId) {
                            _this.goToPersonalAd(selectedAd.AdId);
                            return;
                        }
                        else {
                            _this.goToViewAd(selectedAd.AdId);
                            return;
                        }
                    }).error(function () {
                        _this.goToViewAd(selectedAd.AdId);
                        return;
                    });
                }
                else {
                    this.goToViewAd(selectedAd.AdId);
                }
            };
            BrowseAdsController.prototype.goToViewAd = function (adId) {
                this.$location.path("/ad/" + adId);
            };
            BrowseAdsController.prototype.goToPersonalAd = function (adId) {
                this.$location.path("/viewAd/" + adId);
            };
            BrowseAdsController.$inject = ["app.services.SearchService", "$location", "app.services.CurrentUser", "app.services.AdService"];
            return BrowseAdsController;
        }());
        angular
            .module("app.ads")
            .controller("app.ads.BrowseAdsController", BrowseAdsController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
