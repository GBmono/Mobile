appControllers.controller('productListCtrl', function ($scope, $ionicSlideBoxDelegate,$timeout, $state, $http) {

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
appControllers.controller('productDetailCtrl', function ($scope, $mdToast, $mdBottomSheet, $timeout, $stateParams) {

    // This function is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
        // $scope.product is product detail
        // $stateParams.product is the object that pass from product list page.
        $scope.product = $stateParams.product;
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
});// End of product list controller.
