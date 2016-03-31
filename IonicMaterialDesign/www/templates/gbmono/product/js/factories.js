appFactories.factory('gbmonoProductFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var url = {
        controller: window.globalVariable.gbmono_api_site_prefix.product_api_url,
        favoriteController: window.globalVariable.gbmono_api_site_prefix.userfavorite_api_url,
        actions: {
            loadProductBySearchCategories: '/categories/',
            loadProductBySearchShelf: '/shelf/',
            isFavorite: '/IsFavorited/',
            getProductByBarcode: '/barcodes/',
        }
    };

    function setHeaderToken(token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
    };
    var factory = {};

    factory.loadProductBySearchCategories = function (key, pageIndex, pageSize) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: url.controller + url.actions.loadProductBySearchCategories + key + '/' + pageIndex + '/' + pageSize,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    factory.loadProductBySearchShelf = function (key, pageIndex, pageSize) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: url.controller + url.actions.loadProductBySearchShelf + key + '/' + pageIndex + '/' + pageSize,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    factory.isFavorite = function (productId, token) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: url.favoriteController + url.actions.isFavorite + productId,
            headers: setHeaderToken(token)
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    factory.getProductById = function (productId) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: url.controller+'/'+productId,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    factory.getProductByBarcode = function (barcode) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: url.controller + url.actions.getProductByBarcode + barcode,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    factory.addFavorite = function (model,token) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: url.favoriteController,
            data: model,
            headers: setHeaderToken(token)
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    factory.removeFavorite = function (productId, token) {
        var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: url.favoriteController + '/' + productId,
            headers: setHeaderToken(token)
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    return factory;
}]);