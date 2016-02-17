chatApp.controller('newRoomController', ['$location', '$scope', 'socket', function($location ,$scope, socket){
  $scope.newRoom={
    room : '',
    topic : '',
    pass: ''
  };
  $scope.create = function(){
    var joinObj = {
      room : $scope.newRoom.room,
      topic : $scope.newRoom.topic,
      pass : $scope.newRoom.pass,
    };
    if(joinObj.pass === ''){
      joinObj.pass = undefined;
    }
    console.log(joinObj);
    socket.emit('joinroom' , joinObj ,function(available){
      if(available){
        //just a teporary redirect untill specific room pages are implemented
        $location.url('/room/'+joinObj.room);
      }
    });
  };
}]);
