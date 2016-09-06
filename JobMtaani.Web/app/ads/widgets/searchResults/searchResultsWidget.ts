module app.ads {

    interface ISearchResultsWidgetController {
    }

    class SearchResultsWidgetController implements ISearchResultsWidgetController {

        loadingContainer: ng.IAugmentedJQuery;
        searchResultsContainer: ng.IAugmentedJQuery;
        noSearchResultsContainer: ng.IAugmentedJQuery;

        searchResults: app.domain.Ad[];
        searching: boolean;

        static $inject = ["$scope", "$element", "app.services.SearchService"];
        constructor(private $scope: ng.IScope, private $element: ng.IAugmentedJQuery, private searchService: app.services.SearchService) {
            this.initialiseElements();
            this.initialiseNotificationListeners();
            this.renderData();
            this.searching = false;
        }

        initialiseElements(): void {
            this.loadingContainer = this.$element.find(".loading-container");
            this.searchResultsContainer = this.$element.find(".search-results-container");
            this.noSearchResultsContainer = this.$element.find(".no-search-results");
            this.loadingContainer.hide();
        }

        initialiseNotificationListeners(): void {
            this.$scope.$on(app.ValueObjects.NotificationsValueObject.SEARCHING, () => {
                this.searching = true;
                this.hideResults();
            });

            this.$scope.$on(app.ValueObjects.NotificationsValueObject.SEARCH_END, () => {
                this.searching = false;
                this.showResults();
            });
        }

        renderData(): void {
            this.searchResults = this.searchService.searchResults;
        }

        showResults(): void {
            this.loadingContainer.hide();
            this.searchResultsContainer.show();
            this.renderData();
            this.showEmptySearchMessage();
        }

        hideResults(): void {
            this.loadingContainer.show();
            this.searchResultsContainer.hide();
            this.noSearchResultsContainer.hide();
            this.searchResults = null;
        }

        showEmptySearchMessage(): void {
            if (this.searchResults && this.searchResults.length > 0) {
                this.noSearchResultsContainer.hide();
            }
            else {
                this.noSearchResultsContainer.show();
            }
        }
    }

    export class SearchResultsWidget implements ng.IDirective {
        static instance() {
            return new SearchResultsWidget;
        }

        restrict = 'AE';
        controller = SearchResultsWidgetController;
        controllerAs = 'vm';
        scope = {};
        templateUrl = '/app/ads/widgets/searchResults/searchResultsWidgetTemplate.html';
    }

    angular
        .module("app.ads")
        .directive("jmSearchResultsWidget", SearchResultsWidget.instance);
}