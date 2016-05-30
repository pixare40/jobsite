module app.services {
    'use strict';

    export interface IAdService {
        getAdResource(): ng.resource.IResourceClass<IAdResource>;
        getAllAds(): app.domain.IAd[];
    }

    interface IAdResource
        extends ng.resource.IResource<app.domain.IAd> {
    }

    export class AdService implements IAdService {

        static $inject = ['$resource']
        constructor(private $resource: ng.resource.IResourceService) {
        }

        getAdResource(): ng.resource.IResourceClass<IAdResource> {
            return this.$resource('/api/ads/:adId');
        }

        getAllAds(): app.domain.IAd[] {
            return [
                {
                    adId: "1",
                    accountId: "1",
                    adApplicants: [],
                    categoryId: "House Helps",
                    adLocation: "Nairobi",
                    adClosed: false
                }
                ]
        }
    }

    angular
        .module('app.services')
        .service('app.services.AdService', AdService);

}