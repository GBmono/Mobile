appControllers.controller('productListCtrl', function ($scope, $ionicSlideBoxDelegate, $timeout, $state, $http) { 
    // This function is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.productList is the variable that store user product data.
        $scope.productList = [];

        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#product-list-loading-progress').show();
            }
            else {
                jQuery('#gbmono-product-list').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#product-list-loading-progress').hide();
            jQuery('#gbmono-product-list').fadeIn();
        }, 2000);// End loading progress.
    };// End initialForm.


    // navigateTo is for navigate to other page.
    // by using targetPage to be the destination page
    // and send object to the destination page.
    // Parameter :  
    // targetPage = destination page.
    // objectData = object data that sent to destination page.
    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            product: objectData
        });
    };// End navigateTo.

    // loadMore is for loadMore product list.
    $scope.loadMore = function () {
        $timeout(function () {
            //get product list from json  at paht: www/app-data/product-list.json
            $http.get('app-data/product-list.json')
                .success(function (productList) {
                    // Success retrieve data.
                    // Store user data to $scope.productList.
                    for (var product = 0; product < productList.length; product++) {
                        $scope.productList.push(productList[product]);
                    }
                    // To stop loading progress.
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        }, 2000);
    };// End loadMore.

    $scope.initialForm();

});// End of product list controller.

// Controller of product Detail Page.
appControllers.controller('productDetailCtrl', function ($scope, $mdToast, $mdBottomSheet, $http, $timeout, $stateParams) {
    $scope.imgRoot = window.globalVariable.imagePath;
   
    // This function is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.product is product detail
        // $stateParams.product is the object that pass from product list page.
        $scope.product=null;
        $scope.productId = $stateParams.productId;
        
        $scope.getProduct($scope.productId);
        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#product-detail-loading-progress').show();
            }
            else {
                jQuery('#product-detail-loading-progress').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#product-detail-loading-progress').hide();
            jQuery('#gbmono-product-detail').fadeIn();
        }, 1000);// End loading progress.
    };// End initialForm.

    $scope.getProduct = function (id) {
        $http({
            url: window.globalVariable.gbmono_api_site_prefix.product_api_url + '/' + id,
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (data) {
            $scope.product = data;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };

    // addToCart for show Item Added ! toast.
    $scope.addToCart = function () {
        $mdToast.show({
            controller: 'toastController',
            templateUrl: 'toast.html',
            hideDelay: 800,
            position: 'top',
            locals: {
                displayOption: {
                    title: "Item Added !"
                }
            }
        });
    }; // End addToCart.

    // sharedProduct fro show shared social bottom sheet by calling sharedSocialBottomSheetCtrl controller.
    $scope.sharedProduct = function ($event, product) {
        $mdBottomSheet.show({
            templateUrl: 'bottom-sheet-shared.html',
            controller: 'sharedSocialBottomSheetCtrl',
            targetEvent: $event,
            locals: {
                product: product
            }
        });
    };// End sharedProduct.

    $scope.initialForm();
});// End of product detail controller.


appControllers.controller('productSearchCtrl', function ($scope, $ionicSlideBoxDelegate, $timeout, $state, $http, $ionicHistory) {
    // This function is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.productList is the variable that store user product data.
        $scope.categories = [];

        $scope.loadCategories();

        //// Loading progress.
        //$timeout(function () {
        //    if ($scope.isAndroid) {
        //        jQuery('#product-list-loading-progress').show();
        //    }
        //    else {
        //        jQuery('#gbmono-product-search').fadeIn(700);
        //    }
        //}, 400);
        //$timeout(function () {
        //    jQuery('#product-list-loading-progress').hide();
        //    jQuery('#gbmono-product-search').fadeIn();
        //}, 2000);// End loading progress.
    };// End initialForm.
    // navigateTo is for navigate to other page.
    // by using targetPage to be the destination page
    // and send object to the destination page.
    // Parameter :  
    // targetPage = destination page.
    // objectData = object data that sent to destination page.
    $scope.navigateTo = function (targetPage, way, key) {
        $state.go(targetPage, {
            way: way,
            key: key
        });
    };// End navigateTo.

    $scope.goBack = function () {
        $ionicHistory.goBack();
    };

    $scope.loadCategories = function () {
        $http.get('app-data/categories.json')
            .success(function (categories) {
                $scope.categories = categories;
            });
    };// End loadMore.


    $scope.initialForm();

});// End of product search controller.



appControllers.controller('productSearchResultCtrl', function ($scope, $ionicSlideBoxDelegate, $timeout, $state, $http, $ionicHistory, $stateParams) {

    $scope.imgRoot = window.globalVariable.imagePath;

    // This function is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        var w = $stateParams.way;
        var k = $stateParams.key;
        // $scope.productList is the variable that store user product data.
        $scope.productList = [];
        $scope.allProductList = [];
        $scope.loadProductBySearch(w, k);
    };// End initialForm.


    $scope.navigateTo = function (targetPage, productId) {
        $state.go(targetPage, {
            productId: productId
        });
    };// End navigateTo.

    //$scope.loadMore = function () {
    //    debugger;

    //    $timeout(function () {
    //        //get product list from json  at paht: www/app-data/product-list.json
    //        $http.get('app-data/product-list.json')
    //            .success(function (productList) {
    //                // Success retrieve data.
    //                // Store user data to $scope.productList.
    //                for (var product = 0; product < productList.length; product++) {
    //                    $scope.productList.push(productList[product]);
    //                }
    //                // To stop loading progress.
    //                $scope.$broadcast('scroll.infiniteScrollComplete');
    //            });
    //    }, 2000);
    //};

    $scope.loadMore = function () {
        $timeout(function () {
            var pushProduct = $scope.allProductList.slice($scope.productList.length, $scope.productList.length +7);
            for (var product = 0; product < pushProduct.length; product++) {
                $scope.productList.push(pushProduct[product]);
            }            
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }, 2000);
    };

    // loadMore is for loadMore product list.
    $scope.loadProductBySearch = function (w, k) {
        $http({
            url: window.globalVariable.gbmono_api_site_prefix.product_api_url + '/Categories/' + k,
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).success(function (data) {
            $scope.allProductList = data;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };


    $scope.goBack = function () {
        $ionicHistory.goBack();
    };

    $scope.initialForm();

});// End of product search result controller.



