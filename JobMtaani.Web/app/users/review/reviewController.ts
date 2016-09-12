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

        static $inject = ["app.services.ReviewService", "app.services.AccountService", "$routeParams", "app.services.AdService"]
        constructor(private reviewService: app.services.ReviewService, private accountService: app.services.AccountService, private $routeParams: IReviewRouteParams, private adService: app.services.AdService) {
            this.initialise();
        }

        initialise(): void {
            this.getAd();
            this.getUser();
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
            })
        }

        isValidForm(): boolean {
            if (!this.review) {
                return false;
            }
            else if (!this.review.ReviewText || !this.review.ReviewTitle || !this.review.Rating) {
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