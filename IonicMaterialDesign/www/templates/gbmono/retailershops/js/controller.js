appControllers.controller('gbmonoRetailerShopCtrl', function ($scope, navigateService) {



    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
});

appControllers.controller('gbmonoShopMapCtrl', function ($scope, navigateService, $stateParams, $compile) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };

    function initialize() {
        var myLatlng = new google.maps.LatLng(35.8338756, 139.9474764);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);
        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        $scope.map = map;
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    initialize();
});

appControllers.controller('gbmonoShopSearchedListCtrl', function ($scope, navigateService) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };
});

appControllers.controller('gbmonoStateShopsCtrl', function ($scope, navigateService,$compile) {
    $scope.navigateTo = function (targetPage, params, direction) {
        navigateService.go(targetPage, params, direction);
    };




    function initializeMap(latitude, longitude) {
        //var myLatlng = new google.maps.LatLng(35.8338756, 139.9474764);
        var myLatlng = new google.maps.LatLng(latitude, longitude);
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);
        var infowindow = new google.maps.InfoWindow({
            content: compiled[0]
        });
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: 'Uluru (Ayers Rock)'
        });
        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });
        $scope.map = map;
    }
    google.maps.event.addDomListener(window, 'load', initializeMap);


    var latitude = undefined;
    var longitude = undefined;

    var onMapSuccess = function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        initializeMap(latitude, longitude);
    }

    function onMapError(error) {
        initializeMap(35.8338756, 139.9474764);
        console.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }


    function getMapLocation() {
        navigator.geolocation.getCurrentPosition
        (onMapSuccess, onMapError, { timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 });
    }



    $scope.initialForm = function () {
        getMapLocation();




    };// End initialForm.


    $scope.initialForm();


    
});