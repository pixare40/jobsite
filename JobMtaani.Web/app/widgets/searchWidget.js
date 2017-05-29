var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var SearchModel = (function () {
            function SearchModel(jobType, jobLocation) {
                this.jobType = jobType;
                this.jobLocation = jobLocation;
            }
            return SearchModel;
        }());
        widgets.SearchModel = SearchModel;
        var SearchWidgetController = (function () {
            function SearchWidgetController(adService, searchService) {
                var _this = this;
                this.adService = adService;
                this.searchService = searchService;
                this.jobType = null;
                this.jobLocation = null;
                if (this.searchService.locations) {
                    this.locations = this.searchService.locations;
                }
                else {
                    this.searchService.getLocations().success(function (data) {
                        _this.locations = data;
                        _this.searchService.locations = data;
                    });
                }
            }
            SearchWidgetController.prototype.searchForJob = function () {
                if (this.jobType) {
                    var searchModel = new SearchModel(this.jobType, this.jobLocation);
                    this.searchService.search(this.jobType, this.jobLocation);
                }
            };
            return SearchWidgetController;
        }());
        SearchWidgetController.$inject = ['app.services.AdService', 'app.services.SearchService'];
        var SearchWidget = (function () {
            function SearchWidget() {
                this.restrict = 'AE';
                this.scope = {};
                this.controller = SearchWidgetController;
                this.controllerAs = 'vm';
                this.templateUrl = '/app/widgets/searchWidgetTemplate.html';
            }
            SearchWidget.instance = function () {
                return new SearchWidget;
            };
            return SearchWidget;
        }());
        widgets.SearchWidget = SearchWidget;
        angular
            .module('app.widgets')
            .directive('jmSearchWidget', SearchWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
//# sourceMappingURL=searchWidget.js.map