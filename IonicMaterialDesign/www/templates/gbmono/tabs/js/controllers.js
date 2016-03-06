// Controller of Notes List Page.
// It will call NoteDB Services to present data to html view.
appControllers.controller('gbmonoTabsCtrl', function ($scope,$stateParams, $timeout, $state, $cordovaBarcodeScanner) {
	$scope.scanBarcode = function(imageData){
		if($scope.currentScanning===true){
			return;
		} else {
		    $scope.currentScanning = true;
		    $cordovaBarcodeScanner.scan().then(function (imageData) {
		        alert(imageData.text);
		        $scope.currentScanning = false;
		        var isJson = isNaN(parseInt(imageData.text));
		        if (isJson) {
		            var json = JSON.parse(imageData.text);
		            switch (json.type) {
		                case 1:
		                    $scope.navigateTo('app.productSearchResult', imageData.text);
		                    break;
		                case 2:
		                    break;
		            }
		        } else {
		            //$scope.navigateTo('app.productDetail', imageData);
		            var way = window.globalVariable.gbmono_product_detail_way.barcode;
		            $state.go('app.productDetail', {
		                way: way,
		                key: imageData.text
		            });
		            return;
		        }
				//$scope.currentScanning = false;
				//alert(imageData.text);				
				console.log("Barcode Format -> " + imageData.format);
				console.log("Cancelled -> " + imageData.cancelled);
			}, function(error) {
				$scope.currentScanning = false;
				console.log("An error happened -> " + error);
			});
		}
		
	};
    // initialForm is the first activity in the controller. 
    // It will initial all variable data and let the function works when page load.
    $scope.initialForm = function () {

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

    $scope.initialForm();
});// End of Notes List Page  Controller.