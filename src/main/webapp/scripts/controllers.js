'use strict';
app.controller('loadEmployeeDataController',
        ['$scope', '$http', function ($scope, $http, $window, $route) {
                $scope.URI = 'http://localhost:8084/EmployeeManagement/populateemployeelist';

                $scope.getAllEmployeeData = function () {

                    $http({
                        method: 'GET',
                        url: $scope.URI
                    }).success(function (data, status, headers, config) {
                        $scope.allEmployees = data;
                    }).error(function (data, status, headers, config) {
                        alert("Error!!!");
                    });
                };

                $scope.rowButton = function (employee) {
                    var obj = new Object();
                    obj.name = employee.name;
                    obj.role = employee.role;
                    obj.bio = employee.bio;
                    obj.skills = employee.skills;
                    obj.profileImage = employee.profileImage;
                    var jsonString = JSON.stringify(obj);

                    $http({
                        url: 'http://localhost:8084/EmployeeManagement/saveemployeelocally',
                        method: "POST",
                        data: jsonString,
                        headers: {'Content-Type': 'application/json'}
                    }).success(function (data, status, headers, config) {
                        alert(headers + ": Headers, " + status + ": Status," + data + ": Data");

                    }).error(function (data, status, headers, config) {
                        alert("Error!!");
                    });
                };

                $scope.loadLocalServerData = function () {
                    $http({
                        url: 'http://localhost:8084/EmployeeManagement/listofemployees',
                        method: "GET"
                    }).success(function (data, status, headers, config) {
                        $scope.allEmployeesFromLocalServer = data;
                        alert("SUCCESS!!!");

                    }).error(function (data, status, headers, config) {
                        alert("Error!!");
                    });
                };

                $scope.dataDeleteButton = function (employeeFromLocal) {
                    $http({
                        url: 'http://localhost:8084/EmployeeManagement/deleteemployee/' + employeeFromLocal.id,
                        method: "DELETE"
                    }).success(function (data, status, headers, config) {

                        var index = $scope.allEmployeesFromLocalServer.indexOf(employeeFromLocal);
                        $scope.allEmployeesFromLocalServer.splice(index, 1);
                        $scope.$emit('employeeFromLocalDeleted', employeeFromLocal);

                        alert("SUCCESS!!!" + "Deleted: " + employeeFromLocal.name);

                    }).error(function (data, status, headers, config) {
                        alert("Error!!");
                    });
                };

            }]);

