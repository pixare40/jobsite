module app.profile.widgets {

    class UserInfoWidgetController {

        userInfo: app.domain.ProfileModel;

        static $inject = ["app.services.AccountService"]
        constructor(private accountService: app.services.AccountService, private $routeParams: app.models.IEmployerRouteParams) {
            this.getUserInfo();
        }

        getUserInfo(): void {
            this.accountService.getApplicantInfo(this.$routeParams.userID).success((data) => {
                this.userInfo = data;
            }).error(() => {
                console.log("Error fetching user info");
            });
        }

    }

    export class UserInfoWidget implements ng.IDirective {
        static instance() {
            return new UserInfoWidget;
        }

        restrict = 'AE';
        controller = UserInfoWidgetController;
        controllerAs = 'vm';
        scope = {};
        templateUrl = 'userInfoWidgetTemplate.html'
    }

    angular.module('app.widgets')
        .directive('jmUserInfoWidget', UserInfoWidget.instance);

}