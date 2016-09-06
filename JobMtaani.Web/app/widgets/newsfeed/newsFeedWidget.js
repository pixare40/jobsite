var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var NewsFeedWidgetController = (function () {
            function NewsFeedWidgetController(adService, $location) {
                this.adService = adService;
                this.$location = $location;
                this.alerts = [];
                this.getNewsFeedItems();
            }
            NewsFeedWidgetController.prototype.getNewsFeedItems = function () {
                var _this = this;
                this.adService.getNewsFeed().success(function (data, status) {
                    if (data.length < 1) {
                        _this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.INFO, "No news items to show"));
                        return;
                    }
                    _this.alerts.push(new app.models.AlertModel(app.ValueObjects.AlertTypesValueObject.INFO, "Success Fetching Newsfeed"));
                    _this.newsFeedItems = data;
                }).error(function (data, status) {
                    console.log("Error Fetching News Feed");
                });
            };
            NewsFeedWidgetController.prototype.viewApplication = function (adApplicationId) {
                this.$location.path("/adApplication/" + adApplicationId);
            };
            NewsFeedWidgetController.$inject = ["app.services.AdService", "$location"];
            return NewsFeedWidgetController;
        }());
        var NewsFeedWidget = (function () {
            function NewsFeedWidget() {
                this.restrict = 'AE';
                this.controllerAs = 'vm';
                this.controller = NewsFeedWidgetController;
                this.scope = {};
                this.templateUrl = '/app/widgets/newsfeed/newsFeedWidgetTemplate.html';
            }
            NewsFeedWidget.instance = function () {
                return new NewsFeedWidget();
            };
            return NewsFeedWidget;
        }());
        widgets.NewsFeedWidget = NewsFeedWidget;
        angular
            .module("app.widgets")
            .directive("jmNewsFeedWidget", NewsFeedWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
