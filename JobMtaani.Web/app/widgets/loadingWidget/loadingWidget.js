var app;
(function (app) {
    var widgets;
    (function (widgets) {
        var LoadingWidgetController = (function () {
            function LoadingWidgetController($scope, $uibModal) {
                var _this = this;
                this.$scope = $scope;
                this.$uibModal = $uibModal;
                this.$scope.$on(app.ValueObjects.NotificationsValueObject.SHOW_LOADING, function (event, data) {
                    _this.showLoadingSpinner();
                });
                this.$scope.$on(app.ValueObjects.NotificationsValueObject.HIDE_LOADING, function (event, data) {
                    _this.hideLoadingSpinner();
                });
            }
            LoadingWidgetController.prototype.showLoadingSpinner = function () {
                this.modalInstance = null;
                this.createModal();
            };
            LoadingWidgetController.prototype.hideLoadingSpinner = function () {
                if (this.modalInstance === null) {
                    return;
                }
                this.modalInstance.close();
            };
            LoadingWidgetController.prototype.createModal = function () {
                this.modalInstance = this.$uibModal.open({
                    animation: true,
                    windowClass: 'loading-spinner',
                    backdrop: 'static',
                    template: "<div class='uil-poi-css' style='transform:scale(0.6);'><div></div></div>",
                    size: 'sm'
                });
            };
            return LoadingWidgetController;
        }());
        LoadingWidgetController.$inject = ['$scope', '$uibModal'];
        var LoadingWidget = (function () {
            function LoadingWidget() {
                this.restrict = 'AE';
                this.controller = LoadingWidgetController;
            }
            LoadingWidget.instance = function () {
                return new LoadingWidget;
            };
            return LoadingWidget;
        }());
        widgets.LoadingWidget = LoadingWidget;
        angular
            .module('app.widgets')
            .directive('jmLoadingWidget', LoadingWidget.instance);
    })(widgets = app.widgets || (app.widgets = {}));
})(app || (app = {}));
//# sourceMappingURL=loadingWidget.js.map