module app.services {

    interface INavigationService {
    }


    export class NavigationService implements INavigationService {

        static $inject = ['$rootScope', '$location']
        constructor(private $rootScope: ng.IRootScopeService, private $location: ng.ILocationService) {
            this.$rootScope.$on('GO_TO_ADS', this.goToAds);
        }

        goToAds(): void{
            this.$location.path('#Ads');
        }

    } 
}