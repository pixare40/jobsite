module app.services {
    'use strict';

    export interface IAdService {
        getAd(adId: number): ng.IHttpPromise<app.domain.Ad>;
        getAllAds(): ng.IHttpPromise<app.domain.IAd[]>;
        createAd(ad: app.domain.IAd): ng.IHttpPromise<app.domain.Ad>
    }

    export class AdService implements IAdService {

        categoryJobs: app.domain.Ad[];
        topAds: app.domain.Ad[];
        static $inject = ['$http', 'app.services.CurrentUser']
        constructor(private $http: ng.IHttpService, private currentUser: app.services.CurrentUser) {
        }

        getAd(adId: number): ng.IHttpPromise<app.domain.Ad> {
            return this.$http.post('/api/ad/GetAd/', adId);
        }

        getAllAds(): ng.IHttpPromise<app.domain.IAd[]>{
            return this.$http.get('/api/ad/GetAds', {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        createAd(ad: app.domain.IAd): ng.IHttpPromise<app.domain.Ad>{
            return this.$http.post('/api/ad/CreateAd', ad, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getPersonalAds(): ng.IHttpPromise<app.domain.Ad[]> {
            return this.$http.get('/api/ad/GetPersonalAds', {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getAdsByCategory(categoryId): ng.IHttpPromise<app.domain.Ad[]> {
            return this.$http.post('/api/ad/GetByCategory', categoryId);
        }

        applyToAd(adId: number): ng.IHttpPromise<app.domain.Ad> {
            return this.$http.post('/api/ad/Apply', adId, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getTopAds(): ng.IHttpPromise<app.domain.Ad[]> {
            return this.$http.get('/api/ad/GetTopAds');
        }

        search(searchModel: app.widgets.SearchModel): ng.IHttpPromise<app.domain.Ad[]> {
            return this.$http.post('/api/ad/Search', searchModel);
        }

        getAdDetails(adId: number): ng.IHttpPromise<app.models.IAdDetailsModel> {
            return this.$http.post('/api/ad/GetAdDetails', adId, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        hireEmployee(adApplication: app.models.IHireModel): ng.IHttpPromise<app.models.IAdApplicationModel> {
            return this.$http.post('/api/ad/HireEmployee', adApplication, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        closeAd(adId: number): ng.IHttpPromise<app.domain.Ad> {
            return this.$http.post('/api/ad/CloseAd', adId, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getNewsFeed(): ng.IHttpPromise<app.models.NewsFeedModel[]> {
            return this.$http.get('/api/ad/GetNewsFeed', {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getLocalAds(): ng.IHttpPromise<app.domain.Ad[]> {
            return this.$http.get('/api/ad/GetLocalJobs', {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        reopenAd(adId: number): ng.IHttpPromise<app.domain.Ad> {
            return this.$http.post("/api/ad/ReopenAd", adId, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getPageAds(pageNumber: number, forUser: boolean): ng.IHttpPromise<app.domain.Ad[]> {
            return this.$http.get("/api/ad/GetPageAds?pageNumber=" + pageNumber + "&userOwned=" + forUser, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getTotalUserAds(forUser: boolean): ng.IHttpPromise<number> {
            return this.$http.get("/api/ad/GetTotalUserAds?forUser=" + forUser, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getAdApplication(adApplicationId: number): ng.IHttpPromise<app.models.AdApplicationDetailsModel> {
            return this.$http.get("/api/ad/GetApplicationDetails?applicationId=" + adApplicationId, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getAdApplicationByAdId(adId): ng.IHttpPromise<app.models.AdApplicationModel> {
            return this.$http.get("/api/ad/GetAdApplication?adId=" + adId, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        withdrawAdApplication(applicationid: number): ng.IHttpPromise<app.models.AdApplicationModel> {
            return this.$http.get("/api/ad/WithdrawAdApplication?applicationId=" + applicationid, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }
    }

    angular
        .module('app.services')
        .service('app.services.AdService', AdService);

}