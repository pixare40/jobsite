module app.ads {
    'use strict';

    interface ISearchController {
    }

    class SearchController implements ISearchController {

        static $inject = ['$scope','app.services.SearchService'];
        constructor(private $scope: ng.IScope, private searchService: app.services.SearchService) {
        }
    }

    angular
        .module("app.ads")
        .controller("app.ads.SearchController", SearchController);
}