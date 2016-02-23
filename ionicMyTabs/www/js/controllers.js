angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $cordovaBarcodeScanner) {
    $scope.scanBarcode = function () {
        $cordovaBarcodeScanner.scan().then(function (imageData) {
            alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function (error) {
            alert(error);
            console.log("An error happened -> " + error);
        });
    };
})

.controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('SearchCtrl', function ($scope, $ionicHistory) {
    $scope.myGoBack = function () {
        $ionicHistory.goBack();
    };
})

;


