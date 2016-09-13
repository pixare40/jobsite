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
            SearchController.$inject = ['$scope', 'app.services.SearchService'];
            return SearchController;
        }());
        angular
            .module("app.ads")
            .controller("app.ads.SearchController", SearchController);
    })(ads = app.ads || (app.ads = {}));
})(app || (app = {}));
