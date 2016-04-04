appControllers.controller('gbmonoRetailerShopCtrl', function ($scope, navigateService) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
});

appControllers.controller('gbmonoShopMapCtrl', function ($scope, navigateService, $stateParams) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
});

appControllers.controller('gbmonoShopSearchedListCtrl', function ($scope, navigateService) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
});

appControllers.controller('gbmonoStateShopsCtrl', function ($scope, navigateService) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
});