// A simple controller that fetches a list of data from a service

var myApp = angular.module('starter.services', []);

myApp.service('dataService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function(url, dataType, method, data, headers) {
        // $http() returns a $promise that we can add handlers with .then()
        return $http({
            url: url,
            dataType: dataType,
            method: method,
            data: data,
            headers: headers
        });
    }
    this.gData = function(url, dataType, method, data, headers) {
        // $http() returns a $promise that we can add handlers with .then()
        return $http({
            url: url,
            dataType: dataType,
            method: method,
            params: data,
            headers: headers
        });
    }
});



angular.module('starter.controllers').controller('fileFolderListCtrl',
    //'$routeParams',
    //'$upload',
    //'FileFolderListingService',
    //'FileDetailsListingService',
    //'GetReportPageService',
    function($scope, $http, $stateParams, $location, $rootScope, mySettings,
        dataService
        //, $routeParams
        /*,
     $upload,
        FileFolderListingService,
        FileDetailsListingService,
        GetReportPageService
        */
    ) {

        console.log($stateParams.folderName);

        var folderName = "/";
        if ($stateParams.folderName) {
            folderName = $stateParams.folderName;
        }
        var headers = {
            "Content-Type": "application/json; charset=utf-8"
        };
        console.log("auith " + folderName);
        var data = {
            'AuthId': $rootScope.AuthId,
            'fileName': folderName,
            'fileType': "*"

        };




        dataService.gData(mySettings.getFolderListing, 'json', 'GET', data, headers).then(function(dataResponse) {

            $scope.my = dataResponse;
            $scope.folders = dataResponse.data.ItemList.File;
        });




    }
);
angular.module('starter.controllers').controller('PetIndexCtrl',
    function($scope, $http, $stateParams,
        $location, $rootScope, dataService, mySettings) {
        var headers = {
            "Content-Type": "application/json; charset=utf-8"
        };
        $scope.username = "administrator";
        $scope.password = "";
        $scope.login = function() {
            var data = {
                'username': $scope.username,
                'password': $scope.password
            };

            dataService.getData(mySettings.loginUrl, 'json', 'POST', data, headers).then(function(dataResponse) {
                console.log(dataResponse.data);

                $scope.response = dataResponse;


                if (dataResponse.data.AuthId) {
                    $rootScope.userData = dataResponse.data.User;
                    $rootScope.AuthId = dataResponse.data.AuthId;
                    $location.path('/tab/folderListing');
                }
            });

        }
    })