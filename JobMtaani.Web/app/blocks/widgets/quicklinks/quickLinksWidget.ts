module app.blocks {

    class QuickLinksWidgetController {
    }

    export class QuickLinksWidget implements ng.IDirective {
        static instance() {
            return new QuickLinksWidget();
        }

        restrict = "AE";
        scope = {};
        controller = QuickLinksWidgetController;
        controllerAs = "vm";
        templateUrl="/app/blocks/widgets/quicklinks/quickLinksWidgetTemplate.html"
    }

    angular
        .module("app.blocks")
        .directive("jmQuickLinksWidget", QuickLinksWidget.instance);
}