/**
* app Module
*
* Description
*/
angular.module('app', [])
.controller('AppCtrl',
            ['$scope',
             '$http',
             '$timeout',
             function($scope,
                      $http,
                      $timeout){
    $scope.urls = ['Start'];
    $scope.paths = {};
    $scope.error = {};

    if (window.siteUrls) {
        $scope.urls = siteUrls;
    }

    $scope.submit = function () {
        for (var i in $scope.urls) {
            (function (i) {
                $timeout(function() {
                    $http.post('/screenshot', {
                            url: $scope.urls[i],
                            filename: i
                        })
                        .then(function (result) {
                            $scope.paths[i] = result.data;
                        })
                        .catch(function (error) {
                            $scope.error[i] = error.status + ':' + error.statusText;
                        });
                }, 1000);
            })(i);
        }
    };
}]);