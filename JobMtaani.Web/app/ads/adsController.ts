module app.ads {
    'use strict';

    interface IAdsController {
        title: string;
        ad: app.domain.Ad;
    }

    class AdsController implements IAdsController {
        title: string
        message: string;
        ad: app.domain.Ad;
        adList: app.domain.Ad[];
        categories: app.domain.Category[];

        static $inject = ['app.services.AdService', 'app.services.CategoryService']
        constructor(private adService: app.services.AdService,
            private categoryService: app.services.CategoryService) {
            this.title = 'Ads ';
            this.categoryService.getAllCategories().success((data, status) => {
                this.categories = data;
            }).error((data) => {
                this.message = "Error Fetching Categories";
                });

            if (this.adService.categoryJobs !==null || this.adService.categoryJobs.length < 1) {
                this.adList = this.adService.categoryJobs;
            } else {
                this.adList = null;
            }
        }

        createAd(): void {
            this.adService.createAd(this.ad).success(
                (data, status) => {
                    this.message = "Ad Created Succesfully";
                }).error(
                (data)=>{
                    this.message = "Error";
                });
        }
    }

    angular
        .module('app.ads')
        .controller('app.ads.AdsController', AdsController);

}