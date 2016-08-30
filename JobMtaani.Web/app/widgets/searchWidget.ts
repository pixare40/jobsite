module app.widgets {

    export class SearchModel {
        constructor(public jobType, public jobLocation) {
        }
    }

    interface ISearchWidgetController {
    }

    class SearchWidgetController implements ISearchWidgetController {
        jobType: string;
        jobLocation: number;
        locations: app.models.Location[];

        static $inject = ['app.services.AdService', 'app.services.SearchService']
        constructor(private adService: app.services.AdService, private searchService: app.services.SearchService) {
            this.jobType = null;
            this.jobLocation = null;
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

        searchForJob() {
            if (this.jobType !== null) {
                var searchModel = new SearchModel(this.jobType, this.jobLocation);
                this.searchService.search(this.jobType, this.jobLocation);
            }
        }
    }

    export class SearchWidget implements ng.IDirective {
        static instance() {
            return new SearchWidget;
        }

        restrict = 'AE';
        scope = {};
        controller = SearchWidgetController;
        controllerAs = 'vm';
        templateUrl = '/app/widgets/searchWidgetTemplate.html';
    }

    angular
        .module('app.widgets')
        .directive('jmSearchWidget', SearchWidget.instance);
}