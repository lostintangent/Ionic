/// <reference path="lib/angular.d.ts" />
/// <reference path="lib/angular-ui-router.d.ts" />
/// <reference path="lib/AzureMobileServicesClient.d.ts" />
/// <reference path="lib/cordova.d.ts" />
/// <reference path="lib/cordova-ionic.d.ts" />
/// <reference path="lib/ionic.d.ts" />

interface IDataProvider {
  addItem(item: any): any;
  deleteItem(item: any): any;
  editItem(item: any): any;
  getItems(): any;
}

interface IAuthenticationProvider {
  attemptAutoLogin(): any;
  login(userId?: string, token?: string): any;
  logout(): void;
}

interface IBackEndProviderOptions {
    appName: string;
    appKey: string;
    tableName: string;
}

interface IBackEndProvider extends ng.IServiceProvider {
   configure(options: IBackEndProviderOptions): void;
}

interface ItemModel {
  important: boolean;
  name: string;
  userId: string;
}

interface ItemsScope extends ng.IRootScopeService {
  addItem(): void;
  createItem(name: string, important: boolean): void;
  deleteItem(item: ItemModel): void;
  editItem(item: ItemModel): void;
  editMode: boolean;
  important: boolean;
  items: [ItemModel];
  modal: Ionic.IModal;
  newName: string;
  refresh(fromRefresher?: boolean): Microsoft.WindowsAzure.asyncPromise;
  toggleEditMode(): void;
  labelCondition: any;
}