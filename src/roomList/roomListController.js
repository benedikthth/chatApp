chatApp.controller('roomListController', ['$location' , '$scope', 'socket', function($location ,$scope, socket){
  //request rooms!
  socket.emit('rooms');
  //get roomList.
  socket.on('roomlist', function(data){
    //why???
    for (var i = 0; i < Object.keys(data).length; i++) {
      //oh god so ugly
      data[Object.keys(data)[i]].name = Object.keys(data)[i];
      //console.log(data[Object.keys(data)[i]].name);
    }
    $scope.roomList = data;
  });

  $scope.join = function(rm){
    socket.emit('joinroom', {room: rm.name, pass:null}, function(success, reason){
      if(!success){
        console.log('could not connect because :' + reason);
      } else {
        console.log('you are connected to el '+ rm.name);
      }
    });
  };

  $scope.createRoom = function(){
    $location.url('/home/room/new');
  };

}]);
