module app.services {
    'use strict';

    export interface IAdService {
        getAd(adId: number): ng.IHttpPromise<app.domain.Ad>;
        getAllAds(): ng.IHttpPromise<app.domain.IAd[]>;
        createAd(ad: app.domain.IAd): ng.IHttpPromise<app.domain.Ad>
    }

    export class AdService implements IAdService {

        static $inject = ['$http']
        constructor(private $http: ng.IHttpService) {
        }

        getAd(adId: number): ng.IHttpPromise<app.domain.Ad> {
            return this.$http.get('/api/ads/GetAd/' + adId);
        }

        getAllAds(): ng.IHttpPromise<app.domain.IAd[]>{
            return this.$http.get('/api/ads/GetAd/');
        }

        createAd(ad: app.domain.IAd): ng.IHttpPromise<app.domain.Ad>{
            return this.$http.post('/api/ads/CreateAd', ad);
        }
    }

    angular
        .module('app.services')
        .service('app.services.AdService', AdService);

}