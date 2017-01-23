var app;
(function (app) {
    var blocks;
    (function (blocks) {
        var QuickLinksWidgetController = (function () {
            function QuickLinksWidgetController() {
            }
            return QuickLinksWidgetController;
        }());
        var QuickLinksWidget = (function () {
            function QuickLinksWidget() {
                this.restrict = "AE";
                this.scope = {};
                this.controller = QuickLinksWidgetController;
                this.controllerAs = "vm";
                this.templateUrl = "/app/blocks/widgets/quicklinks/quickLinksWidgetTemplate.html";
            }
            QuickLinksWidget.instance = function () {
                return new QuickLinksWidget();
            };
            return QuickLinksWidget;
        }());
        blocks.QuickLinksWidget = QuickLinksWidget;
        angular
            .module("app.blocks")
            .directive("jmQuickLinksWidget", QuickLinksWidget.instance);
    })(blocks = app.blocks || (app.blocks = {}));
})(app || (app = {}));
