/*
* @Author: GaNeShKuMaRm
* @Date:   2017-05-06 15:24:27
* @Last Modified by:   GaNeShKuMaRm
* @Last Modified time: 2017-05-06 21:51:58
*/

'use strict';

var app = angular.module("1on1", []);

app.controller("PopulateController", ['$scope', '$http', function ($scope, $http) {
    $scope.movie1 = "";
    $scope.movie2 = "";
    $scope.movie1Empty = false;
    $scope.movie2Empty = false;
    $scope.showMovie1 = false;
    $scope.showMovie2 = false;
    $scope.movie1NotFound = false;
    $scope.movie2NotFound = false;

    var baseURL = "http://www.omdbapi.com/?plot=short&t=";

    $scope.func = function() {
        console.log($scope.movie1);
    };

    $scope.change = function() {
        $scope.movie1Empty = false;
        $scope.movie2Empty = false;
    };

    $scope.populate = function() {
        if($scope.movie1 == "" || $scope.movie2 == "")
        {
            if($scope.movie1 == "")
            {
                $scope.movie1Empty = true;
            }
            if($scope.movie2 == "")
            {
                $scope.movie2Empty = true;
            }
        }
        else
        {
            $http.get(baseURL + $scope.movie1)
                .then(function(response) {
                    console.log(response.data);
                    if(response.data.Response == 'False')
                    {
                        $scope.showMovie1 = false;
                        $scope.movie1NotFound = true;
                    }
                    else
                    {
                        $scope.showMovie1 = true;
                        $scope.movie1NotFound = false;
                        $scope.movie1Result = response.data;
                    }
            });

            $http.get(baseURL + $scope.movie2)
                .then(function(response) {
                    console.log(response.data);
                    if(response.data.Response == 'False')
                    {
                        $scope.movie2NotFound = true;
                        $scope.showMovie2 = false;
                    }
                    else
                    {
                        $scope.showMovie2 = true;
                        $scope.movie2NotFound = false;
                        $scope.movie2Result = response.data;
                    }
            });
        }
    }
}]);