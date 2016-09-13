module app.users {
    export interface IReviewRouteParams extends ng.route.IRouteParamsService {
        user: string;
        adId: number;
    }

    interface IReviewController {
    }

    class ReviewController implements IReviewController {

        review: models.Review;
        jobApplied: domain.Ad;
        user: domain.ProfileModel;
        successString: string;
        rate: number;
        max: number;
        isReadonly: boolean;
        ratingStates: models.RatingState[];

        static $inject = ["app.services.ReviewService", "app.services.AccountService", "$routeParams", "app.services.AdService","$location"]
        constructor(private reviewService: app.services.ReviewService, private accountService: app.services.AccountService,
            private $routeParams: IReviewRouteParams, private adService: app.services.AdService, private $location: ng.ILocationService) {
            this.initialise();
        }

        initialise(): void {
            this.rate = 3;
            this.max = 5;
            this.isReadonly = false;
            this.getAd();
            this.getUser();
        }

        initialiseRatingStates(): void {
            this.ratingStates.push(new models.RatingState("glyphicon-star", "glyphicon-star-empty"));
        }

        getAd(): void {
            this.adService.getAd(this.$routeParams.adId).success((data) => {
                this.jobApplied = data;
            });
        }

        getUser(): void {
            this.accountService.getApplicantInfo(this.$routeParams.user).success((data) => {
                this.user = data;
            });
        }

        saveReview(): void {
            this.review.ReviewFor = this.user.UserId;
            this.reviewService.saveReview(this.review).success(() => {
                this.successString = "Review Saved!"
                this.$location.path("/viewApplicant/" + this.review.ReviewFor);
            })
        }

        isValidForm(): boolean {
            if (!this.review) {
                return false;
            }
            else if (!this.review.ReviewText || !this.review.ReviewTitle) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    angular
        .module('app.users')
        .controller('app.users.ReviewController', ReviewController);
}