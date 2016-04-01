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
    function start (urls, size) {
        var notFound = {},
            notFoundSize = 0,
            done = 0,
            tryAgain = function () {
                start(notFound, notFoundSize);
            };

        for (var i in urls) {
            (function (i) {
                $timeout(function() {
                    $http.post('/screenshot', {
                            url: urls[i],
                            filename: i
                        })
                        .then(function (result) {
                            $scope.paths[i] = result.data;

                            done++;

                            $scope.done++;

                            if (done == size) {
                                tryAgain();
                            }
                        })
                        .catch(function (error) {
                            done++;

                            $scope.done++;

                            notFound[i] = urls[i];
                            notFoundSize++;

                            $scope.error[i] = error.status + ':' + error.statusText;

                            if (done == size) {
                                tryAgain();
                            }
                        });
                }, 1000);
            })(i);
        }
    }

    $scope.urls = window.siteUrls ? siteUrls: ['www.google.com'];
    $scope.paths = {};
    $scope.error = {};
    $scope.total = $scope.urls.length;
    $scope.done = 0;

    $scope.submit = function () {
        start($scope.urls, $scope.urls.length);
    };
}]);