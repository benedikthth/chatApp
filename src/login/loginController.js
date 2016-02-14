chatApp.controller("loginController", ['$scope', 'socket', function ($scope, socket){
  $scope.login = function(){
    console.log($scope.user.id);
  };
}]);
