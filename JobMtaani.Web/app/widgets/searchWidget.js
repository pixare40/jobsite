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
            function SearchWidgetController(adService) {
                this.adService = adService;
                this.jobType = null;
                this.jobLocation = null;
            }
            SearchWidgetController.prototype.searchForJob = function () {
                if (this.jobType !== null) {
                    var searchModel = new SearchModel(this.jobType, this.jobLocation);
                    this.adService.search(searchModel).success(function (data, status) {
                        if (data.length > 0) {
                        }
                    });
                }
            };
            SearchWidgetController.$inject = ['app.services.AdService'];
            return SearchWidgetController;
        }());
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