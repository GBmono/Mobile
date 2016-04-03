appControllers.controller('gbmonoRetailerShopCtrl', function ($scope, navigateService) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
});

appControllers.controller('gbmonoShopDetailCtrl', function ($scope, navigateService, $stateParams) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
});

appControllers.controller('gbmonoShopSearchedList', function ($scope, navigateService) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
});