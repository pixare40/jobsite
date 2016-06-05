module app.services {
    'use strict';

    export interface IAdService {
        getAd(adId: number): ng.IHttpPromise<app.domain.Ad>;
        getAllAds(): ng.IHttpPromise<app.domain.IAd[]>;
        createAd(ad: app.domain.IAd): ng.IHttpPromise<app.domain.Ad>
    }

    export class AdService implements IAdService {

        static $inject = ['$http', 'app.services.CurrentUser']
        constructor(private $http: ng.IHttpService, private currentUser: app.services.CurrentUser) {
        }

        getAd(adId: number): ng.IHttpPromise<app.domain.Ad> {
            return this.$http.get('/api/ads/GetAd/' + adId);
        }

        getAllAds(): ng.IHttpPromise<app.domain.IAd[]>{
            return this.$http.get('/api/ads/GetAd/');
        }

        createAd(ad: app.domain.IAd): ng.IHttpPromise<app.domain.Ad>{
            return this.$http.post('/api/ad/CreateAd', ad, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }
    }

    angular
        .module('app.services')
        .service('app.services.AdService', AdService);

}