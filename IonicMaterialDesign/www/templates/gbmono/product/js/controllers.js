appControllers.controller('productListCtrl', function ($scope, $ionicSlideBoxDelegate, $timeout, $state, $http, navigateService, gbmonoProductFactory) {
    // This function is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.imgRoot = window.globalVariable.imagePath;
    $scope.enanbleScroll = true;

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
    $scope.toProductDetail = function (targetPage, productId) {
        //$ionicViewSwitcher.nextDirection('forward');
        //var way = window.globalVariable.gbmono_product_detail_way.id;
        //$state.go(targetPage, {
        //    way: way,
        //    key: productId
        //});
        $scope.navigateTo(targetPage, {
            way: window.globalVariable.gbmono_product_detail_way.id,
            key: productId
        }, 'forward');
    };// End navigateTo.

    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };

    //// loadMore is for loadMore product list.
    //$scope.loadMore = function () {
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
    //};// End loadMore.
    $scope.pageSize = 10;
    $scope.pageIndex = 1;
    $scope.loadMore = function () {
        $scope.loadProductBySearch("c", "17", $scope.pageIndex, $scope.pageSize);
    };

    //loadMore product list.
    $scope.loadProductBySearch = function (w, k, pageIndex, pageSize) {
        //$http({
        //    url: window.globalVariable.gbmono_api_site_prefix.product_api_url + '/Categories/' + k + "/" + pageIndex + "/" + pageSize,
        //    method: 'GET',
        //    headers: {
        //        'Access-Control-Allow-Origin': '*'
        //    }
        //}).success(function (data) {
        //    for (var product = 0; product < data.length; product++) {
        //        $scope.productList.push(data[product]);
        //    }
        //    if (data.length < $scope.pageSize) {
        //        $scope.enanbleScroll = false;
        //    } else {
        //        $scope.pageIndex = pageIndex + 1;
        //    }
        //}).error(function (data) {

        //}).finally(function () {
        //    $scope.$broadcast('scroll.infiniteScrollComplete');
        //});

        gbmonoProductFactory.loadProductBySearchCategories(k, pageIndex, pageSize).then(function (data) {
            for (var product = 0; product < data.length; product++) {
                $scope.productList.push(data[product]);
            }
            if (data.length < $scope.pageSize) {
                $scope.enanbleScroll = false;
            } else {
                $scope.pageIndex = pageIndex + 1;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }, function (reason) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };


    $scope.initialForm();

});// End of product list controller.

// Controller of product Detail Page.
appControllers.controller('productDetailCtrl', function ($scope, $mdToast, $mdBottomSheet, $http, $timeout, $stateParams, localStorage, $state, gbmonoProductFactory, gbmonoFavoriteFactory) {
    $scope.imgRoot = window.globalVariable.imagePath;
    $scope.product = null;
    $scope.token = localStorage.get(window.globalVariable.BEARER_TOKEN_KEY);
    $scope.isFavourite = false;


    var w = $stateParams.way;
    var k = $stateParams.key;
    var url;

    switch (w) {
        case window.globalVariable.gbmono_product_detail_way.id:
            url = window.globalVariable.gbmono_api_site_prefix.product_api_url + "/" + k;
            break;
        case window.globalVariable.gbmono_product_detail_way.barcode:
            url = window.globalVariable.gbmono_api_site_prefix.product_api_url + "/BarCodes/" + k;
            break;
    }


    $scope.initialForm = function () {
        $scope.getProduct();
    };

    $scope.getIsFavorite = function () {
        if ($scope.token) {
            //var url = window.globalVariable.gbmono_api_site_prefix.userfavorite_api_url + '/IsFavorited/' + $scope.product.productId;
            //$http.get(url, {
            //    headers: {
            //        "Authorization": 'Bearer ' + $scope.token
            //    }
            //}).success(function (status) {
            //    if (status) {
            //        $scope.isFavourite = true;
            //    }
            //}).error(function (error) {
            //    // ignore the 401 error
            //});
            gbmonoFavoriteFactory.isFavorite($scope.product.productId, $scope.token).then(function (status) {
                if (status) {
                    $scope.isFavourite = true;
                }
            }, function (reason) {

            });
        }
    }

    $scope.getProduct = function () {
        $scope.hidePage();
        //$http({
        //    url: url,
        //    method: 'GET',
        //    headers: {
        //        'Access-Control-Allow-Origin': '*'
        //    }
        //}).success(function (data) {
        //    if (data == null) {
        //        $mdToast.show({
        //            controller: 'toastController',
        //            templateUrl: 'toast.html',
        //            hideDelay: 1500,
        //            position: 'top',
        //            locals: {
        //                displayOption: {
        //                    title: "没有搜索结果"
        //                }
        //            }
        //        });
        //        jQuery('#product-detail-loading-progress').hide();
        //    } else {
        //        $scope.product = data;
        //        getIsFavorite();
        //        $scope.showPage();
        //    }
            
        //})
        //.error(function () {
        //    $mdToast.show({
        //        controller: 'toastController',
        //        templateUrl: 'toast.html',
        //        hideDelay: 1500,
        //        position: 'top',
        //        locals: {
        //            displayOption: {
        //                title: "没有搜索结果"
        //            }
        //        }
        //    });
        //    jQuery('#product-detail-loading-progress').hide();
        //})
        switch (w) {
            case window.globalVariable.gbmono_product_detail_way.id:
                gbmonoProductFactory.getProductById(k).then(function (data) {
                    $scope.renderProduct(data);
                }, function (reason) {
                    $scope.showMsgBox('没有搜索结果');
                    jQuery('#product-detail-loading-progress').hide();
                });
                break;
            case window.globalVariable.gbmono_product_detail_way.barcode:
                gbmonoProductFactory.getProductByBarcode(k).then(function (data) {
                    $scope.renderProduct(data);
                }, function (reason) {
                    $scope.showMsgBox('没有搜索结果');
                    jQuery('#product-detail-loading-progress').hide();
                });
                break;
        }
    };

    $scope.renderProduct = function (data) {
        if (data == null) {
            $scope.showMsgBox('没有搜索结果');
            jQuery('#product-detail-loading-progress').hide();
        } else {
            $scope.product = data;
            $scope.getIsFavorite();
            $scope.showPage();
        }
    };

    $scope.showMsgBox = function (Message) {
        $mdToast.show({
            controller: 'toastController',
            templateUrl: 'toast.html',
            hideDelay: 1500,
            position: 'top',
            locals: {
                displayOption: {
                    title: Message
                }
            }
        });
        
    }

    $scope.hidePage = function () {
        if ($scope.isAndroid) {
            jQuery('#product-detail-loading-progress').show();
        }
        else {
            jQuery('#product-detail-loading-progress').fadeIn();
        }
    }

    $scope.showPage = function () {
        jQuery('#product-detail-loading-progress').hide();
        jQuery('#gbmono-product-detail').fadeIn();
    }




    // addToCart 
    var addFavorite = function () {
        //var url = window.globalVariable.gbmono_api_site_prefix.userfavorite_api_url;
        var favorite = { productId: $scope.product.productId };
        //$http.post(url, favorite, {
        //    headers: {
        //        "Authorization": 'Bearer ' + $scope.token
        //    }
        //}).success(function (data) {
        //    $scope.isFavourite = true;
        //    $mdToast.show({
        //        controller: 'toastController',
        //        templateUrl: 'toast.html',
        //        hideDelay: 800,
        //        position: 'top',
        //        locals: {
        //            displayOption: {
        //                title: "成功加入收藏夹"
        //            }
        //        }
        //    });
        //}).error(function (XMLHttpRequest, textStatus, errorThrown) {
        //    if (textStatus == 401) {
        //        $state.go('noTabs.login');
        //    }
        //}).finally(function () {

        //});

        gbmonoFavoriteFactory.addFavorite(favorite, $scope.token).then(function (data) {
            $scope.isFavourite = true;
            $scope.showMsgBox('成功加入收藏夹');
        }, function (reason) {
            
        });
    };

    // removeToCart
    var removeFavorite = function () {
        //var url = window.globalVariable.gbmono_api_site_prefix.userfavorite_api_url + "/" + $scope.product.productId;
        //$http.delete(url, {
        //    headers: {
        //        "Authorization": 'Bearer ' + $scope.token
        //    }
        //}).success(function (data) {
        //    $scope.isFavourite = false;
        //    $mdToast.show({
        //        controller: 'toastController',
        //        templateUrl: 'toast.html',
        //        hideDelay: 800,
        //        position: 'top',
        //        locals: {
        //            displayOption: {
        //                title: "商品从收藏夹移除"
        //            }
        //        }
        //    });
        //}).error(function (XMLHttpRequest, textStatus, errorThrown) {
        //    if (textStatus == 401) {
        //        $state.go('noTabs.login');
        //    }
        //}).finally(function () {

        //});
        gbmonoFavoriteFactory.removeFavorite($scope.product.productId, $scope.token).then(function (data) {
            $scope.isFavourite = false;
            $scope.showMsgBox('商品从收藏夹移除');
        }, function (reason) {

        });
    };

    $scope.toggleFavorite = function () {
        if ($scope.isFavourite) {
            // remove
            removeFavorite();
        }
        else {
            // add
            addFavorite();
        }
    }


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


appControllers.controller('productSearchCtrl', function ($scope, $ionicSlideBoxDelegate, $timeout, $state, $http, $ionicHistory, navigateService) {
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
    $scope.toProductSearch = function (targetPage, key) {
        //var way = window.globalVariable.gbmono_product_search_way.category;
        $scope.navigateTo(targetPage, {
            way: window.globalVariable.gbmono_product_search_way.category,
            key: key
        });
    };// End navigateTo.
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
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


appControllers.controller('productSearchResultCtrl', function ($scope, $ionicSlideBoxDelegate, $timeout, $state, $http, $ionicHistory, $stateParams, navigateService, gbmonoProductFactory) {
    $scope.imgRoot = window.globalVariable.imagePath;
    $scope.searchWay = $stateParams.way;
    $scope.searchKey = $stateParams.key;
    $scope.pageSize = 10;
    $scope.pageIndex = 1;
    $scope.productList = [];
    $scope.enanbleScroll = true;

    $scope.initialForm = function () {

    };// End initialForm.


    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };// End navigateTo.

    $scope.toProductDetail = function (targetPage, productId) {
        $scope.navigateTo(targetPage, {
            way: window.globalVariable.gbmono_product_detail_way.id,
            key: productId
        });
    };

    $scope.loadMore = function () {
        $scope.loadProductBySearch($scope.searchWay, $scope.searchKey, $scope.pageIndex, $scope.pageSize);
    };

    //loadMore product list.
    $scope.loadProductBySearch = function (w, k, pageIndex, pageSize) {
        var url;
        switch (w) {
            case window.globalVariable.gbmono_product_search_way.category:
                //url = window.globalVariable.gbmono_api_site_prefix.product_api_url + '/Categories/' + k + "/" + pageIndex + "/" + pageZize;
                gbmonoProductFactory.loadProductBySearchCategories(k, pageIndex, pageSize).then(function (data) {
                    $scope.renderProduct(data);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }, function (reason) {

                });
                break;
            case window.globalVariable.gbmono_product_search_way.shelf:
                //url = window.globalVariable.gbmono_api_site_prefix.temp_api_url + '/Shelf/' + k + "/" + pageIndex + "/" + pageZize;
                gbmonoProductFactory.loadProductBySearchShelf(k, pageIndex, pageSize).then(function (data) {
                    $scope.renderProduct(data);
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                }, function (reason) {

                });
                break;
        }

        //$http({
        //    url: url,
        //    method: 'GET',
        //    headers: {
        //        'Access-Control-Allow-Origin': '*'
        //    }
        //}).success(function (data) {
        //    for (var product = 0; product < data.length; product++) {
        //        $scope.productList.push(data[product]);
        //    }
        //    if (data.length < $scope.pageSize) {
        //        $scope.enanbleScroll = false;
        //    } else {
        //        $scope.pageIndex = pageIndex + 1;
        //    }
        //}).error(function (data) {

        //}).finally(function () {
        //    $scope.$broadcast('scroll.infiniteScrollComplete');
        //});

        
    };

    $scope.renderProduct = function (data) {
        for (var product = 0; product < data.length; product++) {
            $scope.productList.push(data[product]);
        }
        if (data.length < $scope.pageSize) {
            $scope.enanbleScroll = false;
        } else {
            $scope.pageIndex = pageIndex + 1;
        }
    };

    $scope.goBack = function () {
        $ionicHistory.goBack();
    };

    $scope.initialForm();

});// End of product search result controller.



