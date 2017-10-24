var libraryApp = angular.module("libraryApp", ["ngRoute"]);

libraryApp.config(function($routeProvider){
  $routeProvider.when("/home", {
    templateUrl:"app/view/home.html",
    controller:"loginController"
  }).when("/student", {
    templateUrl:"/app/view/student.html",
    controller:"studentController"
  })
  .when("/admin", {
    templateUrl:"/app/view/admin.html",
    controller:"adminController"
  })
  .otherwise({
    redirectTo: "/index.html"
  })
});

libraryApp.controller("loginController", ["$scope", "$location", function($scope, $location){
  $scope.login=function(){
    var userName = $scope.userName;
    var password = $scope.password;

    if(userName!=null && password!=null){
        $location.path('/student').search({userName:userName, password:password});
    }
  };
}]);

libraryApp.controller("studentController", ["$scope", "$http", "$log", "$routeParams",
  function($scope, $http, $log, $routeParams){
	var studentDetails;
	$http({
        method: 'POST',
        url: '/LibraryManagementService/libraryManagement/home/student',
        data: {
            "userName": $routeParams.userName,
            "password": $routeParams.password
          }
      }).then(function(response){
        $log.log(response.data);
        studentDetails=response.data;
      }, function(error){
        $log.log(error);
      })
}]);

libraryApp.controller("adminController", ["$scope", function($scope){
//TBD
}]);
