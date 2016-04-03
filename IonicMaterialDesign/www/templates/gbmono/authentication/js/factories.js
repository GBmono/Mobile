appFactories.factory('gbmonoAuthFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var url = {
        controller: window.globalVariable.gbmono_api_site_prefix.account_api_url,
        actions: {
            login: window.globalVariable.gbmono_api_token_url,
            register: '/register'
        }
    };

    function setHeaderToken(token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
    };
    var factory = {};

    factory.login = function (model) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: url.actions.login,
            data: "userName=" + model.email + "&password=" + model.password + "&grant_type=password",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    factory.register = function (model) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: url.controller + url.actions.register,
            data: "userName=" + model.email + "&password=" + model.password + "&confirmPassword=" + model.confirmPassword,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    return factory;
}]);