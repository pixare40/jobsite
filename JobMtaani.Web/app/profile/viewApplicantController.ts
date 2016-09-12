module app.profile {

    export interface IApplicantRouteParams extends ng.route.IRouteParamsService {
        user: string;
    }

    interface IViewApplicantController {
    }

    class ViewApplicantController implements IViewApplicantController {

        applicantDetails: app.domain.ProfileModel;
        reviews: models.Review[];
        totalItems: number;
        currentPage: number;
        maxSize: number;

        static $inject = ["app.services.ReviewService", "app.services.AccountService", "$routeParams"]
        constructor(private reviewService: app.services.ReviewService, private accountService: app.services.AccountService, private $routeParams: IApplicantRouteParams) {
            this.currentPage = 1;
            this.maxSize = 6;

            this.initialiseData();
        }

        initialiseData(): void {
            this.accountService.getApplicantInfo(this.$routeParams.user).success((data) => {
                this.setUserDetails(data);
                this.pageChanged();
            })
        }

        setUserDetails(userDetails: domain.ProfileModel) {
            this.applicantDetails = userDetails;
        }

        showEmptyContainer(): boolean {
            if (!this.reviews || this.reviews.length < 1) {
                return true;
            }
            else {
                return false;
            }
        }

        pageChanged(): void {
            this.reviewService.getUserReviews(this.applicantDetails.UserId, this.currentPage).success((data) => {
                this.totalItems = data.TotalReviews;
                this.reviews = data.Reviews;
            })
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.ViewApplicantController', ViewApplicantController);

}