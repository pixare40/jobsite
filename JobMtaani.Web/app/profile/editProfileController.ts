module app.profile {

    class EditProfileController {
        successMessage: string;
        errorMessage: string;
        userdata: app.domain.ProfileModel;
        isLoggedIn: boolean;

        static $inject = ['app.services.CurrentUser', 'app.services.AccountService', '$scope', '$location', '$rootScope']
        constructor(private currentUser: app.services.CurrentUser,
            private accountService: app.services.AccountService, private $scope: ng.IScope,
            private $location: ng.ILocationService, private $rootScope: ng.IRootScopeService) {

            this.initialiseProfile();
            this.$scope.$on(app.ValueObjects.NotificationsValueObject.USER_INFO_AVAILABLE, (event, data) => {
                this.$location.path("/profile");
            });
        }

        initialiseProfile(): void {
            if (!this.currentUser.getProfile().isLoggedIn) {
                this.$location.path("/login");
                return;
            }

            this.currentUser.getCurrentUserInfo().success((data) => {
                this.userdata = data;
            }).error(() => {
                this.errorMessage = "Error fetching your details, please check your internet connection";
            });
        }
        editProfile(): void {
            this.userdata.UserName = this.userdata.PhoneNumber;
            this.accountService.updateUserDetails(this.userdata).success(() => {
                this.errorMessage = null;
                this.successMessage = "Succesfully updated your details";
            }).error((response) => {
                this.errorMessage = "";
                this.isLoggedIn = false;

                // Validation errors
                if (response.ModelState) {
                    for (var key in response.ModelState) {
                        this.errorMessage += response.ModelState[key] + "\r\n";
                    }
                }
            })
        }
    }

    angular
        .module("app.profile")
        .controller("app.profile.EditProfileController", EditProfileController);

}