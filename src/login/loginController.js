chatApp.controller("loginController", ['$scope', 'socket', function ($scope, socket){
  $scope.user = {
    name: ''
  };
  $scope.login = function(){
    console.log('wank');
  };
}]);
