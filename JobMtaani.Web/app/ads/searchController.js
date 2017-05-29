var app;
(function (app) {
    var ads;
    (function (ads) {
        'use strict';
        var SearchController = (function () {
            function SearchController($scope, searchService) {
                this.$scope = $scope;
                this.searchService = searchService;
            }
            return SearchController;
        }());
        SearchController.$inject = ['$scope', 'app.services.SearchService'];
        angular
            .module("app.ads")
            .controller("app.ads.SearchController", SearchController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
//# sourceMappingURL=searchController.js.map