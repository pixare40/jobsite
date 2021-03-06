﻿module app.ads {
    'use strict';

    interface IAdsController {
        title: string;
        ad: app.domain.Ad;
    }

    class AdsController implements IAdsController {
        title: string
        successString: string;
        errorString: string;
        generalMessage: string;
        ad: app.domain.Ad;
        adList: app.domain.Ad[];
        categories: app.domain.Category[];
        locations: app.models.Location[];

        static $inject = ['app.services.AdService', 'app.services.CategoryService','app.services.SearchService']
        constructor(private adService: app.services.AdService,
            private categoryService: app.services.CategoryService, private searchService: app.services.SearchService) {
            this.title = 'Ads ';
            this.categoryService.getAllCategories().success((data, status) => {
                this.categories = data;
            }).error((data) => {
                this.errorString = "Error Fetching Categories";
                });

            if (this.adService.categoryJobs !==null || this.adService.categoryJobs.length < 1) {
                this.adList = this.adService.categoryJobs;
            } else {
                this.adList = null;
            }

            this.setLocations();
            
        }

        setLocations(): void {
            if (this.searchService.locations) {
                this.locations = this.searchService.locations;
            }
            else {
                this.searchService.getLocations().success((data) => {
                    this.locations = data;
                    this.searchService.locations = data;
                });
            }
        }

        createAd(): void {
            this.adService.createAd(this.ad).success(
                (data, status) => {
                    this.successString = "Ad Created Succesfully";
                }).error(
                (data) => {
                    this.errorString = "Error creating ad, please fill all the fields required";
                });
        }

        isValidForm(): boolean {
            if (!this.ad) {
                return false;
            }
            if (this.ad.AdTitle && this.ad.AdDescription && this.ad.AdLocation && this.ad.ApproximateWage) {
                return true;
            }
            else {
                return false;
            }
        }
    }

    angular
        .module('app.ads')
        .controller('app.ads.AdsController', AdsController);

}