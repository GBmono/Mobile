appControllers.controller('gbmonoProfileCtrl', function ($scope, $stateParams, $timeout, $state, $http, localStorage) {
    $scope.Logout = function () {
        localStorage.removeAll();
        $scope.navigateTo('app.login');
    };

    $scope.token = localStorage.get(window.globalVariable.BEARER_TOKEN_KEY);
    
    $scope.vm = {
        products: [],
        imgRoot: window.globalVariable.imagePath,
        paging: {
            pageIndex: 1,
            pageSize: 12
        },
        isAllDataLoaded: false
    };

    

    $scope.getFavoriteProducts = function (pageIndex, pageSize) {
        $scope.attachToken();
        $http.get(window.globalVariable.gbmono_api_site_prefix.userfavorite_api_url + '/Products/' + pageIndex + '/' + pageSize, {
            headers: {
                "Authorization": 'Bearer ' + $scope.token
            }
        })
        .success(function (data) {
            $scope.vm.products = $scope.vm.products.concat(data);
            $scope.vm.paging.pageIndex++;
            if (data.length < $scope.vm.paging.pageSize) {
                $scope.vm.isAllDataLoaded = true;
            }
        });
    };

    $scope.attachToken = function () {
        //$http.defaults.headers.common.Authorization = 'Bearer ' + $scope.token;
    };

    // navigateTo is for navigate to other page 
    // by using targetPage to be the destination page 
    // and sending objectData to the destination page.
    // Parameter :  
    // targetPage = destination page.
    // objectData = object that will sent to destination page.
    $scope.navigateTo = function (targetPage, productId) {
        $state.go(targetPage, {
            productId: productId
        });
    };// End navigateTo.

    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        if (!$scope.token || $scope.token === '') {
            $scope.navigateTo('app.login');
        } else {
            $scope.getFavoriteProducts($scope.vm.paging.pageIndex, $scope.vm.paging.pageSize);
        }
        
    };//End initialForm.
    
    //$scope.initialForm();
});