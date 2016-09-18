module app.ads {

    class BrowseAdsController {

        ads: app.domain.Ad[];

        totalItems: number;
        currentPage: number;
        maxSize: number;
        loadingContainer: Element;
        searchResultsContainer: Element;

        static $inject = ["app.services.SearchService", "$location", "app.services.CurrentUser", "app.services.AdService"]
        constructor(private searchService: services.SearchService, private $location: ng.ILocationService,
            private currentUser: services.CurrentUser, private adService: services.AdService) {
            this.currentPage = 1;
            this.maxSize = 6;

            this.initialiseElements();
            this.getTotalAds();
            this.pageChanged();
        }

        getTotalAds(): void{
            this.adService.getTotalAds().success((data) => {
                this.totalItems = data;
            })
        }

        initialiseElements(): void {
            this.loadingContainer = document.getElementsByClassName("loading-container")[0];
            this.searchResultsContainer = document.getElementsByClassName("search-results-container")[0];
            this.loadingContainer.classList.add("displayNone");        }

        hideResults(): void {
            this.loadingContainer = document.getElementsByClassName("loading-container")[0];
            this.searchResultsContainer = document.getElementsByClassName("search-results-container")[0];
            this.loadingContainer.classList.remove("displayNone");
            this.searchResultsContainer.classList.add("displayNone"); 
            this.ads = null;
        }

        showResults(): void {
            this.loadingContainer = document.getElementsByClassName("loading-container")[0];
            this.searchResultsContainer = document.getElementsByClassName("search-results-container")[0];
            this.loadingContainer.classList.add("displayNone");
            this.searchResultsContainer.classList.remove("displayNone");  
        }

        pageChanged(): void {
            this.hideResults();
            this.searchService.browseAdsPaged(this.currentPage).success((data) => {
                this.ads = data;
                this.showResults();
            })
        }

        goToAd(index: number): void {
            var selectedAd: app.domain.Ad = this.ads[index];
            if (this.currentUser.getProfile().isLoggedIn) {
                this.currentUser.getCurrentUserInfo().success((data) => {
                    if (selectedAd.AccountId == data.UserId) {
                        this.goToPersonalAd(selectedAd.AdId);
                        return;
                    }
                    else {
                        this.goToViewAd(selectedAd.AdId);
                        return;
                    }
                }).error(() => {
                    this.goToViewAd(selectedAd.AdId);
                    return;
                });
            }
            else {
                this.goToViewAd(selectedAd.AdId);
            }
        }

        goToViewAd(adId: number): void {
            this.$location.path("/ad/" + adId);
        }

        goToPersonalAd(adId: number) {
            this.$location.path("/viewAd/" + adId);
        }
    }

    angular
        .module("app.ads")
        .controller("app.ads.BrowseAdsController", BrowseAdsController);

}