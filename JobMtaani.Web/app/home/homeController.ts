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

            this.$scope.$on(app.ValueObjects.NotificationsValueObject.USER_NOT_LOGGED_IN, (event, data) => {
                this.onLogout();
            })

            this.$scope.$on('USER_LOGGED_OUT', (event, data) => {
                this.onLogout();
            });

            this.currentUser.checkLogin();

            if ((<any>window).JobMtaani.goToRoute) {
                var routeTo = (<any>window).JobMtaani.goToRoute
                this.$location.path(routeTo);
                (<any>window).JobMtaani.goToRoute = null;
            }

            this.calculateHeaderSize();
        }

        calculateHeaderSize(): void {
            var headerElement: HTMLElement = document.getElementById("home-jumbo");
            if (headerElement) {
                var windowHeight: number = window.innerHeight;
                windowHeight = windowHeight - 200;
                headerElement.style.height = windowHeight + "px";
            }
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

        showMoreAds(): void {
            this.$location.path("/browse");
        }
    }

    angular
        .module('app.home')
        .controller('app.home.HomeController', HomeController);
}