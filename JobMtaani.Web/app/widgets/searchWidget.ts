module app.widgets {

    export class SearchModel {
        constructor(public jobType, public jobLocation) {
        }
    }

    interface ISearchWidgetController {
    }

    class SearchWidgetController implements ISearchWidgetController {
        jobType: string;
        jobLocation: string;

        static $inject = ['app.services.AdService']
        constructor(private adService: app.services.AdService) {
            this.jobType = null;
            this.jobLocation = null;
        }

        searchForJob() {
            if (this.jobType !== null) {
                var searchModel = new SearchModel(this.jobType, this.jobLocation);
                this.adService.search(searchModel).success((data, status) => {
                    if (data.length > 0) {
                    }
                });
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