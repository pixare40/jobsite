module app.profile {

    export interface IApplicantRouteParams extends ng.route.IRouteParamsService {
        userId: string;
    }

    interface IViewApplicantController {
    }

    class ViewApplicantController implements IViewApplicantController {

        applicantDetails: app.domain.ProfileModel;
        reviews: app.models.ReviewModel;

        static $inject = ["app.services.ReviewService", "app.services.AccountService", "$routeParams"]
        constructor(private reviewService: app.services.ReviewService, private accountService: app.services.AccountService, private $routeParams: IApplicantRouteParams) {
            this.initialiseData();
        }

        initialiseData(): void {
            this.accountService.getApplicantInfo(this.$routeParams.userId).success((data) => {

            })
        }
    }

    angular
        .module('app.profile')
        .controller('app.profile.ViewApplicantController', ViewApplicantController);

}