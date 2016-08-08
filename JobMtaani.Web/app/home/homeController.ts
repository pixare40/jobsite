module app.home{
    interface IHomeController {
    }

    class HomeController implements IHomeController {
        isLoggedIn: boolean;
        username: string;

        static $inject = ['app.services.CurrentUser', 'app.services.AccountService','$scope', '$rootScope','$location']
        constructor(private currentUser: app.services.CurrentUser,
            private accountService: app.services.AccountService, private $scope: ng.IScope,
            private $rootScope: ng.IRootScopeService, private $location: ng.ILocationService) {
            this.isLoggedIn = false;

            this.$scope.$on(app.ValueObjects.NotificationsValueObject.USER_INFO_AVAILABLE, (event, data) => {
                this.onLogin();
            });

            this.$scope.$on('USER_LOGGED_OUT', (event, data) => {
                this.onLogout();
            });

            this.currentUser.checkLogin();
        }

        onLogin(): void {
            this.isLoggedIn = true;
            this.username = this.currentUser.getProfile().username;
        }

        onLogout(): void {
            this.isLoggedIn = false;
            this.username == "";
        }

        createJob(): void {
            if (!this.currentUser.profile.isLoggedIn) {
                this.$location.path('/login');
            }
            else {
                this.$location.path('/createad');
            }
        }

        logOut(): void {
            this.accountService.logout().success(() => {
                this.currentUser.setProfile("", "", false);
                this.$rootScope.$broadcast('USER_LOGGED_OUT', null);
                this.isLoggedIn = false;
            }).error(() => {
                console.error("Error Logging Out");
            });
        }

        login(): void {
            this.$location.path('/login');
        }

        register(): void {
            this.$location.path('/register');
        }

        applyForJobs(): void {
            if (!this.currentUser.profile.isLoggedIn) {
                this.$location.path('/login');
            }
            else {
                this.$location.path('/profile');
            }
        }
    }

    angular
        .module('app.home')
        .controller('app.home.HomeController', HomeController);
}