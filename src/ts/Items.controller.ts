/// <reference path="App.d.ts" />

module InventoryControllers {
    class ItemsController {
        private data: any[] = [];
        private editMode: boolean = false;
        private modal: Ionic.IModal;

        constructor(private $scope: ItemsScope, private backEnd: IDataProvider, $ionicModal: Ionic.IModal, $ionicLoading: Ionic.ILoading, private $q: ng.IQService) {
            $ionicModal
                .fromTemplateUrl("Add.html", { scope: $scope, focusFirstInput: true })
                .then((modal) => { this.modal = modal; });

            $scope.$on("loggedIn", () => {
                $ionicLoading.show({ template: "Loading items..." });

                this.refresh()
                    .then(() => { $ionicLoading.hide(); });
            });
        }

        addItem() {
            this.$scope.newName = "";
            this.$scope.important = false;

            this.modal.show();
        }

        createItem(name: string, important: boolean) {
            this.backEnd.addItem({ name: name, important: important })
                .then(() => {
                    this.modal.hide();
                    this.refresh();
                });
        }

        deleteItem(item: ItemModel) {
            this.backEnd.deleteItem(item)
                .then(this.refresh.bind(this))
                .then((items) => {
                    // If the list is now empty,
                    // then exit edit mode
                    if (items.length === 0) {
                        this.toggleEditMode();
                        this.$scope.$digest();
                    }
                });
        }

        refresh(fromRefresher: boolean = false) {
            return this.backEnd.getItems().then((items: any) => {
                this.data = items;

                if (fromRefresher) {
                    this.$scope.$broadcast("scroll.refreshComplete");
                }

                // Return a dummy promise that consumers
                // can use to syncronize with the data
                var defer = this.$q.defer();
                defer.resolve(items);
                return defer.promise;
            });
        }

        toggleEditMode() {
            this.editMode = !this.editMode;
        }
    }

    angular.module("Inventory.Controllers.Items", ["ionic", "Inventory.Backends"])
        .controller("ItemsController", ItemsController);
}