var app;
(function (app) {
    var services;
    (function (services) {
        'use strict';
        var SearchService = (function () {
            function SearchService($http, $location, $rootScope) {
                this.$http = $http;
                this.$location = $location;
                this.$rootScope = $rootScope;
            }
            SearchService.prototype.search = function (searchTerm, location) {
                var _this = this;
                this.searchResults = null;
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.SEARCHING, null);
                this.$http.get("/api/search/Search?term=" + searchTerm + "&location=" + location).then(function (response) {
                    _this.searchResults = response.data;
                    _this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.SEARCH_END, null);
                    _this.$location.path("/search");
                }, function () { });
            };
            SearchService.prototype.getLocations = function () {
                return this.$http.get("/api/search/GetLocations");
            };
            SearchService.prototype.browseAdsPaged = function (pageNumber) {
                return this.$http.get("/api/search/BrowseAds?page=" + pageNumber);
            };
            SearchService.$inject = ['$http', '$location', '$rootScope'];
            return SearchService;
        }());
        services.SearchService = SearchService;
        angular
            .module('app.services')
            .service('app.services.SearchService', SearchService);
    })(services = app.services || (app.services = {}));
})(app || (app = {}));
//# sourceMappingURL=searchService.js.map