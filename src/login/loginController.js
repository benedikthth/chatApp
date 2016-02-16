chatApp.controller("loginController", ['$location' ,'$scope', 'socket', function ($location ,$scope, socket){
  $scope.user = {
    name: ''
  };
  $scope.login = function(){
    socket.emit('adduser' , $scope.user.name, function(available){
      if(!available){
        $scope.user.name = '';
      } else {
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
