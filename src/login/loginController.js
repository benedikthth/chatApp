chatApp.controller("loginController", ['user', '$location' ,'$scope', 'socket', function ($location ,$scope, socket){
  $scope.user = {
    name: ''
  };
  $scope.login = function(){
    if($scope.user.name == '' || $scope.user.name.length < 3 ){
      $scope.user.name = '';
      return;
    }
    socket.emit('adduser' , $scope.user.name, function(available){
      if(!available){
        $scope.user.name = '';
      } else {
        user.username = $scope.user.name;
        $location.url('/home/roomlist');
      }
    });
    /* //reeeeeeeeeeeee
    socket.emit('users');
    socket.on('userlist', function(userlist,fn){
      console.log(userlist);
      $location.url('/home/roomlist');
    });
    */
  };
}]);
