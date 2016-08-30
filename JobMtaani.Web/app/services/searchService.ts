module app.services {
    'use strict';

    export interface ISearchService {
    }

    export class SearchService implements ISearchService {

        searchResults: app.domain.Ad[];
        static $inject = ['$http','$location','$rootScope'];

        constructor(private $http: ng.IHttpService, private $location: ng.ILocationService, private $rootScope: ng.IRootScopeService) {
        }

        search(searchTerm: string, location: number): void {
            this.searchResults = null;
            this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.SEARCHING, null);
            this.$http.get("/api/search/Search?term=" + searchTerm + "&location=" + location).then((response: ng.IHttpPromiseCallbackArg<app.domain.Ad[]>) => {
                this.searchResults = response.data;
                this.$rootScope.$broadcast(app.ValueObjects.NotificationsValueObject.SEARCH_END, null);
                this.$location.path("/search");
            }, ()=> {});
        }
    }

    angular
        .module('app.services')
        .service('app.services.SearchService', SearchService);
}