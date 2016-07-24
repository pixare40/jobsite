module app.widgets {

    class LoadingWidgetController {


        modalInstance: ng.ui.bootstrap.IModalServiceInstance;

        static $inject = ['$scope', '$uibModal']
        constructor(private $scope: ng.IScope, private $uibModal: ng.ui.bootstrap.IModalService) {
            this.$scope.$on(app.ValueObjects.NotificationsValueObject.SHOW_LOADING, (event, data) => {
                this.showLoadingSpinner()
            });

            this.$scope.$on(app.ValueObjects.NotificationsValueObject.HIDE_LOADING, (event, data) => {
                this.hideLoadingSpinner()
            });
        }

        showLoadingSpinner() {
            this.modalInstance = null;
            this.createModal();
        }

        hideLoadingSpinner() {
            if (this.modalInstance === null) {
                return;
            }

            this.modalInstance.close();
        }

        createModal(): void {
            this.modalInstance = this.$uibModal.open({
                animation: true,
                windowClass: 'loading-spinner',
                backdrop: 'static',
                template: "<div class='uil-poi-css' style='transform:scale(0.6);'><div></div></div>",
                size: 'sm'
            });
        }
    }

    export class LoadingWidget implements ng.IDirective {
        static instance() {
            return new LoadingWidget;
        }

        restrict = 'AE';
        controller = LoadingWidgetController;
    }

    angular
        .module('app.widgets')
        .directive('jmLoadingWidget', LoadingWidget.instance);
}