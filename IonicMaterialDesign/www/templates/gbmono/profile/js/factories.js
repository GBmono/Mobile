appFactories.factory('gbmonoProfileFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var url = {
        controller: window.globalVariable.gbmono_api_site_prefix.userfavorite_api_url,
        actions: {
            getFavoriteProducts: "/products/"
        }
    };
    
    function setHeaderToken(token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };        
    };
    var factory = {};

    factory.getFavoriteProducts = function (pageIndex, pageSize, token) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: url.controller + url.actions.getFavoriteProducts + pageIndex + '/' + pageSize,
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