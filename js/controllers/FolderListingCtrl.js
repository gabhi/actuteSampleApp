var myApp = angular.module('starter.services', []);
myApp.service('dataService', function($http) {
    delete $http.defaults.headers.common['X-Requested-With'];
    this.getData = function(url, dataType, method, data, headers) {
        if (method === "GET") return $http({
            url: url,
            dataType: dataType,
            method: method,
            params: data,
            headers: headers
        });
        else
            return $http({
                url: url,
                dataType: dataType,
                method: method,
                data: data,
                headers: headers
            });
    }
});
angular.module('starter.controllers').controller('fileCtrl',
    function($scope, $http, $stateParams, $location, $rootScope, mySettings, dataService) {
        var fileId = "";
        var data = {
            'AuthId': $rootScope.AuthId,
            'fileType': "*"
        };
        if ($stateParams.fileId) {
            fileId = $stateParams.fileId;
            data = {
                'AuthId': $rootScope.AuthId
            };
        }
        $scope.showMyReport = function(fileName, bookmark) {
            var viewer = new actuate.Viewer("viewer1");
            viewer.setReportName(fileName);
            if (bookmark) {
                viewer.setReportletBookmark(bookmark);
            }
            viewer.submit();
            viewer.setReportletBookmark("");
        }


        dataService.getData(mySettings.getFileDetails + fileId, 'json', 'GET', data, null).then(function(dataResponse) {
            $scope.fileDetails = dataResponse.data.File;
            $scope.fileName = dataResponse.data.File.Name.split('/').pop();
        });


    }
);
angular.module('starter.controllers').controller('visualsCtrl',
    function($scope, $http, $stateParams, $location, $rootScope, mySettings, dataService) {

    }
);
angular.module('starter.controllers').controller('bookmarksCtrl',
    function($scope, $http, $stateParams, $location, $rootScope, mySettings, dataService) {
        var fileId = "";
        var data = {
            'AuthId': $rootScope.AuthId,
            'fileType': "*"
        };
        if ($stateParams.fileId) {
            fileId = $stateParams.fileId;
            data = {
                'AuthId': $rootScope.AuthId
            };
        }


        $scope.showMyReport = function(fileName, bookmark) {

            if (bookmark) {
                $scope.viewer.setReportletBookmark(bookmark);
            }
            $scope.viewer.submit();
            $scope.viewer.setReportletBookmark("");
        }


        dataService.getData(mySettings.getFileDetails + fileId, 'json', 'GET', data, null).then(function(dataResponse) {
            $scope.fileDetails = dataResponse.data.File;
            $scope.fileName = dataResponse.data.File.Name.split('/').pop();

            $scope.viewer = new actuate.Viewer("viewer1");
            $scope.viewer.setReportName($scope.fileDetails.Name);

            $scope.viewer.submit();

        });


        dataService.getData(mySettings.visuals + fileId + "/bookmarks", 'json', 'GET', data, null).then(function(dataResponse) {
            debugger;
            if (dataResponse && dataResponse.data.BookmarkList && dataResponse.data.BookmarkList.BookMark) {

                $scope.bookmarks = dataResponse.data.BookmarkList.BookMark;
            }

        });





    }
);

angular.module('starter.controllers').controller('showreportCtrl',
    function($scope, $http, $stateParams, $location, $rootScope, mySettings, dataService) {
        var fileId = "";
        var data = {
            'AuthId': $rootScope.AuthId,
            'fileType': "*"
        };

        $scope.me = $stateParams;
        if ($stateParams.fileId) {
            fileId = $stateParams.fileId;
            data = {
                'AuthId': $rootScope.AuthId
            };
        }


        dataService.getData(mySettings.getFileDetails + fileId, 'json', 'GET', data, null).then(function(dataResponse) {
            $scope.fileDetails = dataResponse.data.File;
            $scope.fileName = dataResponse.data.File.Name.split('/').pop();

            var viewer = new actuate.Viewer("viewer1");
            viewer.setReportName($scope.fileDetails.Name);

            viewer.submit();

        });






    }
);

angular.module('starter.controllers').controller('fileFolderListCtrl',
    function($scope, $http, $stateParams, $location, $rootScope, mySettings,
        dataService
    ) {
        var folderId = "";
        var data = {
            'AuthId': $rootScope.AuthId
        };

        if ($stateParams.folderId) {
            folderId = $stateParams.folderId;

            data = {
                'AuthId': $rootScope.AuthId,
                'folderId': folderId,
                'fileType': "*"

            };
        }
        dataService.getData(mySettings.getFolderListing, 'json', 'GET', data, null).then(function(dataResponse) {

            $scope.my = dataResponse;
            $scope.folders = dataResponse.data.ItemList.File;
        });
    }
);
angular.module('starter.controllers').controller('PetIndexCtrl',
    function($scope, $http, $stateParams,
        $location, $rootScope, dataService, mySettings) {
        $scope.username = "administrator";
        $scope.password = "";
        $scope.login = function() {
            var data = {
                'username': $scope.username,
                'password': $scope.password
            };

            dataService.getData(mySettings.loginUrl, 'json', 'POST', data, null).then(function(dataResponse) {
                console.log(dataResponse.data);

                $scope.response = dataResponse;


                if (dataResponse.data.AuthId) {
                    $rootScope.userData = dataResponse.data.User;
                    $rootScope.AuthId = dataResponse.data.AuthId;

                    actuate.load("viewer");
                    var requestOptions = new actuate.RequestOptions();
                    requestOptions.setRepositoryType(mySettings.repositoryType);

                    actuate.initialize(mySettings.jsapiUrl, requestOptions, $scope.username,
                        $scope.password, null, null);
                    $location.path('/tab/folderListing');
                }
            });

        }
    })