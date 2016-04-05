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
    var notFound = [],
        i = 0,
        tryAgain = function () {
            var urls = angular.copy(notFound),
                size = notFound.length;
            i = 0;

            notFound = [];

            start(urls, size);
        };

    function start (urls, size) {
        $http.post('/screenshot', {
                    url: urls[i].url,
                    filename: urls[i].index
            })
            .then(function (result) {
                $scope.paths[urls[i].index] = result.data;
                i++;
                $scope.done++;

                if (i == size) {
                    tryAgain();
                } else if (i < size) {
                    start(urls, urls.length);
                }
            })
            .catch(function (error) {

                notFound.push(urls[i]);

                $scope.error[urls[i].index]
                    = error.status + ':' + error.statusText;

                i++;

                if (i == size) {
                    tryAgain();
                } else if (i < size) {
                    start(urls, urls.length);
                }
            });
    }

    function toArrayObj (urls) {
        var arr = [],
            size = urls.length,
            x;

        for (x = 0; x < size; x++) {
            arr.push({
                index: x,
                url: urls[x]
            });
        }

        return arr;
    }

    $scope.paths = {};
    $scope.error = {};
    $scope.done = 0;
    $scope.urls = toArrayObj(window.siteUrls ? siteUrls: ['www.google.com']);
    $scope.total = $scope.urls.length;

    $scope.submit = function () {
        $timeout(function () {
            start($scope.urls, $scope.urls.length);
        }, 1000);
    };
}]);