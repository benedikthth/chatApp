chatApp.controller("loginController", ['$location' ,'$scope', 'socket', function ($location ,$scope, socket){
  $scope.user = {
    name: ''
  };
  $scope.login = function(){
    console.log($scope.user.name);
    socket.emit('adduser' , $scope.user.name );
    socket.emit('users');
    socket.on('userlist', function(userlist,fn){
    console.log(userlist);
    $location.url('/home/roomlist');
  });
  };
}]);
