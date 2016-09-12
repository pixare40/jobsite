module app.services {
    'use strict';

    export interface IReviewService {
    }

    export class ReviewService implements IReviewService {

        static $inject = ['$http','app.services.CurrentUser'];

        constructor(private $http: ng.IHttpService, private currentUser: app.services.CurrentUser) {
        }

        getReview(userId: string): ng.IHttpPromise<number> {
            return this.$http.get("/api/review/GetReview?uid=" + userId, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        getUserReviews(userId: string, page: number): ng.IHttpPromise<models.ReviewModel> {
            return this.$http.get("/api/review/GetReviews?uid=" + userId + "&page=" + page, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }

        saveReview(review: models.IReview): ng.IHttpPromise<models.Review> {
            return this.$http.post("/api/review/SaveReview", review, {
                headers: { 'Authorization': 'Bearer ' + this.currentUser.getProfile().token }
            });
        }
        
    }

    angular
        .module('app.services')
        .service('app.services.ReviewService', ReviewService);
}