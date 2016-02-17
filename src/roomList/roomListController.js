chatApp.controller('roomListController', ['user', '$location' , '$scope', 'socket', function(user, $location ,$scope, socket){
  //request rooms!
  if( !user.isLogged ){
    $location.url('/login');
  }
  $scope.user = user.username;
  socket.emit('rooms');
  //get roomList.
  socket.on('roomlist', function(data){
    var keys = Object.keys(data);
    for (var i = 0; i < keys.length; i++) {
      data[keys[i]].name = keys[i];
    }
    $scope.roomList = data;
  });

  $scope.join = function(rm){
    $location.url('/room/'+rm);
  };

  $scope.createRoom = function(){
    $location.url('/room/new');
  };

}]);
