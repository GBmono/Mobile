appControllers.controller('gbmonoProfileCtrl', function ($scope, $stateParams, $timeout, $state, $http, localStorage, gbmonoProfileFactory, navigateService) {
    $scope.Logout = function () {
        localStorage.removeAll();
        $scope.navigateTo('noTabs.login');
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
        //$scope.attachToken();
        //$http.get(window.globalVariable.gbmono_api_site_prefix.userfavorite_api_url + '/Products/' + pageIndex + '/' + pageSize, {
        //    headers: {
        //        "Authorization": 'Bearer ' + $scope.token
        //    }
        //})
        //.success(function (data) {
        //    $scope.vm.products = $scope.vm.products.concat(data);
        //    $scope.vm.paging.pageIndex++;
        //    if (data.length < $scope.vm.paging.pageSize) {
        //        $scope.vm.isAllDataLoaded = true;
        //    }
        //})
		//.error(function (data, status, headers, config) {
		//	$scope.navigateTo('noTabs.login');
        //    console.log('请求错误')
        //});
        gbmonoProfileFactory.getFavoriteProducts(pageIndex, pageSize, $scope.token).then(function (data) {
            $scope.vm.products = $scope.vm.products.concat(data);
            $scope.vm.paging.pageIndex++;
            if (data.length < $scope.vm.paging.pageSize) {
                $scope.vm.isAllDataLoaded = true;
            }
        }, function (reason) {

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
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params,direction);
    };// End navigateTo.
    $scope.toProductDetail = function (targetPage, productId) {
        $scope.navigateTo(targetPage, {
            way: window.globalVariable.gbmono_product_detail_way.id,
            key: productId
        });
    };
    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        if (!$scope.token || $scope.token === '') {
            $scope.navigateTo('noTabs.login');
        } else {
            $scope.getFavoriteProducts($scope.vm.paging.pageIndex, $scope.vm.paging.pageSize);
        }
        
    };//End initialForm.
    
    //$scope.initialForm();
});