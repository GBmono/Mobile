// Controller of Notes List Page.
// It will call NoteDB Services to present data to html view.
<<<<<<< HEAD
appControllers.controller('homeCtrl', function ($scope,$stateParams, $timeout, NoteDB, $state) {
=======
appControllers.controller('homeCtrl', function ($scope, $timeout, $state, $http) {
>>>>>>> b8c18587fe8cbb4ba027120d142a68906b44f02d

    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {
<<<<<<< HEAD
      
=======
        // $scope.productList is the variable that store user product data.
        $scope.productList = [{
            img: 'img/demo/促销.png',
            title: '资深堂',
            p: '红研肌活精华露'
        }, {
            img: 'img/demo/促销.png',
            title: '资深堂',
            p: '红研肌活精华露'
        }, {
            img: 'img/demo/促销.png',
            title: '资深堂',
            p: '红研肌活精华露'
        }, {
            img: 'img/demo/促销.png',
            title: '资深堂',
            p: '红研肌活精华露'
        }];

        // Loading progress.
        $timeout(function () {
            if ($scope.isAndroid) {
                jQuery('#home-loading-progress').show();
            }
            else {
                jQuery('#home-loading-progress').fadeIn(700);
            }
        }, 400);
        $timeout(function () {
            jQuery('#home-loading-progress').hide();
            jQuery('#home-product-list').fadeIn();
        }, 4000);// End loading progress.
>>>>>>> b8c18587fe8cbb4ba027120d142a68906b44f02d

    };//End initialForm.

    // navigateTo is for navigate to other page 
    // by using targetPage to be the destination page 
    // and sending objectData to the destination page.
    // Parameter :  
    // targetPage = destination page.
    // objectData = object that will sent to destination page.
    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            noteDetail: objectData,
            actionDelete: (objectData == null ? false : true)
        });
    };// End navigateTo.

<<<<<<< HEAD
=======
    // loadMore is for loadMore product list.
    $scope.loadMore = function () {
        $timeout(function () {
            //get product list from json  at paht: www/app-data/product-list.json
            $http.get('app-data/product-list.json')
                .success(function (productList) {
                    // Success retrieve data.
                    // Store user data to $scope.productList.
                    //for (var product = 0; product < productList.length; product++) {
                    //    $scope.productList.push(productList[product]);
                    //}
                    for (var i = 0; i < 4; i++) {
                        $scope.productList.push({
                            img: 'img/demo/促销.png',
                            title: '资深堂',
                            p: '红研肌活精华露'
                        });
                    }
                    
                    // To stop loading progress.
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        }, 2000);
    };// End loadMore.

>>>>>>> b8c18587fe8cbb4ba027120d142a68906b44f02d
    $scope.initialForm();
});// End of Notes List Page  Controller.