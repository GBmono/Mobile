// Controller of Notes List Page.
// It will call NoteDB Services to present data to html view.
appControllers.controller('gbmonoTabsCtrl', function ($scope, $stateParams, $timeout, $state, $cordovaBarcodeScanner, $mdToast,localStorage) {
	$scope.scanBarcode = function(imageData){
		if($scope.currentScanning===true){
			return;
		} else {
		    $scope.currentScanning = true;
		    $cordovaBarcodeScanner.scan().then(function (imageData) {
		        try {
		            $scope.currentScanning = false;
		            var isJson = isNaN(parseInt(imageData.text));
		            if (isJson) {
		                var json = JSON.parse(imageData.text);
		                if (!json.gbmono) {
		                    throw "";
		                }
		                switch (json.way) {
		                    case 1://shelf
		                        var way = window.globalVariable.gbmono_product_search_way.shelf;
		                        $state.go('noTabs.productSearchResult', {
		                            way: way,
		                            key: json.id
		                        })
		                        break;
		                    case 2:
		                        break;
		                }
		            } else {
		                //$scope.navigateTo('app.productDetail', imageData);
		                var way = window.globalVariable.gbmono_product_detail_way.barcode;
		                $state.go('noTabs.productDetail', {
		                    way: way,
		                    key: imageData.text
		                });
		                return;
		            }
		            //$scope.currentScanning = false;
		            //alert(imageData.text);				
		            console.log("Barcode Format -> " + imageData.format);
		            console.log("Cancelled -> " + imageData.cancelled);
		        } catch (e) {
		            $scope.currentScanning = false;
		            console.log("An error happened -> " + error);
		            $mdToast.show({
		                controller: 'toastController',
		                templateUrl: 'toast.html',
		                hideDelay: 1500,
		                position: 'top',
		                locals: {
		                    displayOption: {
		                        title: "没有搜寻结果"
		                    }
		                }
		            });
		        }
		        
			}, function(error) {
				$scope.currentScanning = false;
				console.log("An error happened -> " + error);
				$mdToast.show({
				    controller: 'toastController',
				    templateUrl: 'toast.html',
				    hideDelay: 1500,
				    position: 'top',
				    locals: {
				        displayOption: {
				            title: "没有搜寻结果"
				        }
				    }
				});
			});
		}
		
	};


    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {

    };//End initialForm.
	
	$scope.checkLogin = function(){
		var token=localStorage.get(window.globalVariable.BEARER_TOKEN_KEY);
		var state='';
		if(!token||token===''){
			state='noTabs.login';
		}else{
			state='app.profile';
		}
		$scope.navigateTo(state);
	};

    // navigateTo is for navigate to other page 
    // by using targetPage to be the destination page 
    // and sending objectData to the destination page.
    // Parameter :  
    // targetPage = destination page.
    // objectData = object that will sent to destination page.
    $scope.navigateTo = function (targetPage, objectData) {
        $state.go(targetPage, {
            noteDetail: objectData
        });
    };// End navigateTo.

    $scope.initialForm();
});// End of Notes List Page  Controller.