module app.services {
    'use strict';

    export interface IAdService {
        getAd(adId: number): ng.IHttpPromise<app.domain.Ad>;
        getAllAds(): ng.IHttpPromise<app.domain.IAd[]>;
        createAd(ad: app.domain.IAd): ng.IHttpPromise<app.domain.Ad>
    }

    export class AdService implements IAdService {

        categoryJobs: app.domain.Ad[];
        static $inject = ['$http', 'app.services.CurrentUser']
        constructor(private $http: ng.IHttpService, private currentUser: app.services.CurrentUser) {
        }

        getAd(adId: number): ng.IHttpPromise<app.domain.Ad> {
            return this.$http.post('/api/ad/GetAd/', adId);
        }

        getAllAds(): ng.IHttpPromise<app.domain.IAd[]>{
            return this.$http.get('/api/ad/GetAds');
        }

        createAd(ad: app.domain.IAd): ng.IHttpPromise<app.domain.Ad>{
            return this.$http.post('/api/ad/CreateAd', ad, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getAdsByCategory(categoryId): ng.IHttpPromise<app.domain.Ad[]> {
            return this.$http.post('/api/ad/GetByCategory', categoryId);
        } 
    }

    angular
        .module('app.services')
        .service('app.services.AdService', AdService);

}