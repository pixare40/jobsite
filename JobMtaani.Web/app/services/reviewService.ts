module app.services {
    'use strict';

    export interface IReviewService {
    }

    export class ReviewService implements IReviewService {

        static $inject = ['$http','app.services.CurrentUser'];

        constructor(private $http: ng.IHttpService, private currentUser: app.services.CurrentUser) {
        }

        getReview(userId: string): ng.IHttpPromise<number> {
            return this.$http.get("/api/Review/GetReview?uid=" + userId, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }
        
    }

    angular
        .module('app.services')
        .service('app.services.ReviewService', ReviewService);
}