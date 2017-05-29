var app;
(function (app) {
    var ads;
    (function (ads) {
        var SearchResultsWidgetController = (function () {
            function SearchResultsWidgetController($scope, $element, searchService) {
                this.$scope = $scope;
                this.$element = $element;
                this.searchService = searchService;
                this.initialiseElements();
                this.initialiseNotificationListeners();
                this.renderData();
                this.searching = false;
            }
            SearchResultsWidgetController.prototype.initialiseElements = function () {
                this.loadingContainer = this.$element.find(".loading-container");
                this.searchResultsContainer = this.$element.find(".search-results-container");
                this.noSearchResultsContainer = this.$element.find(".no-search-results");
                this.loadingContainer.hide();
            };
            SearchResultsWidgetController.prototype.initialiseNotificationListeners = function () {
                var _this = this;
                this.$scope.$on(app.ValueObjects.NotificationsValueObject.SEARCHING, function () {
                    _this.searching = true;
                    _this.hideResults();
                });
                this.$scope.$on(app.ValueObjects.NotificationsValueObject.SEARCH_END, function () {
                    _this.searching = false;
                    _this.showResults();
                });
            };
            SearchResultsWidgetController.prototype.renderData = function () {
                this.searchResults = this.searchService.searchResults;
                this.showEmptySearchMessage();
            };
            SearchResultsWidgetController.prototype.showResults = function () {
                this.loadingContainer.hide();
                this.searchResultsContainer.show();
                this.renderData();
            };
            SearchResultsWidgetController.prototype.hideResults = function () {
                this.loadingContainer.show();
                this.searchResultsContainer.hide();
                this.noSearchResultsContainer.hide();
                this.searchResults = null;
            };
            SearchResultsWidgetController.prototype.showEmptySearchMessage = function () {
                if (this.searchResults && this.searchResults.length > 0) {
                    this.noSearchResultsContainer.hide();
                }
                else {
                    this.noSearchResultsContainer.show();
                }
            };
            return SearchResultsWidgetController;
        }());
        SearchResultsWidgetController.$inject = ["$scope", "$element", "app.services.SearchService"];
        var SearchResultsWidget = (function () {
            function SearchResultsWidget() {
                this.restrict = 'AE';
                this.controller = SearchResultsWidgetController;
                this.controllerAs = 'vm';
                this.scope = {};
                this.templateUrl = '/app/ads/widgets/searchResults/searchResultsWidgetTemplate.html';
            }
            SearchResultsWidget.instance = function () {
                return new SearchResultsWidget;
            };
            return SearchResultsWidget;
        }());
        ads.SearchResultsWidget = SearchResultsWidget;
        angular
            .module("app.ads")
            .directive("jmSearchResultsWidget", SearchResultsWidget.instance);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
//# sourceMappingURL=searchResultsWidget.js.map