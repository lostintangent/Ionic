/// <reference path="App.d.ts" />

module InventoryBackends {
    class AzureClient implements IDataProvider, IAuthenticationProvider {
        private _client: Microsoft.WindowsAzure.MobileServiceClient;
        private _table: Microsoft.WindowsAzure.MobileServiceTable;

        constructor(appName: string, appKey: string, tableName: string, private $q: ng.IQService) {
            this._client = new WindowsAzure.MobileServiceClient(
                "https://" + appName + ".azure-mobile.net/",
                appKey);

            this._table = this._client.getTable(tableName);
        }

        addItem(item: any): any {
            return this._table.insert(item);
        }

        deleteItem(item: any): any {
            return this._table.del(item);
        }

        editItem(item: any): any {
            return this._table.update(item);
        }

        getItems(): any {
            return this._table.read();
        }

        attemptAutoLogin(): any {
            if (localStorage.getItem("token")) {
                return this.login(localStorage.getItem("userId"), localStorage.getItem("token"));
            }

            var defer = this.$q.defer();
            defer.resolve(null);
            return defer.promise;
        }

        login(userId?: string, token?: string): any {
            if (userId && token) {
                this._client.currentUser = {
                    userId: userId,
                    mobileServiceAuthenticationToken: token,
                    getIdentities: () => { },
                    accessTokens: null,
                    level: null
                };

                var defer = this.$q.defer();
                defer.resolve(this._client.currentUser);
                return defer.promise;
            }

            return this._client.login("microsoftaccount").then((user) => {
                localStorage.setItem("userId", user.userId);
                localStorage.setItem("token", user.mobileServiceAuthenticationToken);
                return user;
            });
        }

        logout() {
            this._client.logout();

            // Clear the stored token information
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
        }
    }

    class AzureAngularProvider implements IBackEndProvider {
        private _appName: string;
        private _appKey: string;
        private _tableName: string;

        configure(options: IBackEndProviderOptions) {
            this._appName = options.appName;
            this._appKey = options.appKey;
            this._tableName = options.tableName;
        }

        $get($q: ng.IQService) {
            return new AzureClient(this._appName, this._appKey, this._tableName, $q);
        }
    }

    angular.module("Inventory.Backends", [])
        .provider("backEnd", AzureAngularProvider);
}                                                        