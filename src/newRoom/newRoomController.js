chatApp.controller('newRoomController', ['$location', '$scope', 'socket', function($location ,$scope, socket){
  $scope.newRoom={
    room : '',
    topic : ''
  };
  $scope.create = function(){
    var joinObj = {
      room : $scope.newRoom.room,
      topic : $scope.newRoom.topic,
      pass : undefined
    };

    socket.emit('joinroom' , joinObj ,function(available){
      if(available){
        //redirect to correct room. 
        $location.url('/room/'+joinObj.room);
      }
    });
  };
}]);
