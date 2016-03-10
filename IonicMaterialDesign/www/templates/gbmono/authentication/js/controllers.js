// Controller of Notes List Page.
// It will call NoteDB Services to present data to html view.
appControllers.controller('gbmonoLoginCtrl', function ($scope, $stateParams, $timeout, $state, $http, localStorage, $mdToast) {
    
    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {

    };//End initialForm.

    $scope.user = {
        email: "",
        password: ""
    };

    //gbmono login
    $scope.login = function (model) {
        $http({
            url: window.globalVariable.gbmono_api_token_url,
            method: 'POST',
            data: "userName=" + model.email + "&password=" + model.password + "&grant_type=password",
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data, status, headers, config) {
            localStorage.set(window.globalVariable.BEARER_TOKEN_KEY, data.access_token);
            $scope.navigateTo('app.profile');
        }).error(function (data, status, headers, config) {
            console.log('请求错误');
			$mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 1500,
                position: 'top',
                locals: {
                    displayOption: {
                        title: data.error_description
                    }
                }
            });
        });
    };

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

    $scope.initialForm();
});// End of Notes List Page  Controller.

// Controller of Notes List Page.
// It will call NoteDB Services to present data to html view.
appControllers.controller('gbmonoSignUpCtrl', function ($scope, $stateParams, $timeout, $state, $http, localStorage, $mdToast) {

    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {

    };//End initialForm.

    $scope.user = {
        email: "",
        password: "",
        confirmPassword: ""
    };

    $scope.register = function (model) {
        $http({
            url: window.globalVariable.gbmono_api_site_prefix.account_api_url + '/Register',
            method: "POST",
            data: "userName=" + model.email + "&password=" + model.password + "&confirmPassword=" + model.confirmPassword,
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data, status, headers, config) {
            $http({
                url: window.globalVariable.gbmono_api_token_url,
                method: 'POST',
                data: "userName=" + model.email + "&password=" + model.password + "&grant_type=password",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }).success(function (data, status, headers, config) {
                localStorage.set(window.globalVariable.BEARER_TOKEN_KEY, data.access_token);
                $scope.navigateTo('app.profile');
            }).error(function (data, status, headers, config) {
                console.log('请求错误')
            });            
        }).error(function (data, status, headers, config) {
            console.log('请求错误');
			$mdToast.show({
                controller: 'toastController',
                templateUrl: 'toast.html',
                hideDelay: 1500,
                position: 'top',
                locals: {
                    displayOption: {
                        title: data.modelState.message.toString()
                    }
                }
            });
        });
    };


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

    $scope.initialForm();
});// End of Notes List Page  Controller.