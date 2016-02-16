chatApp.controller('newRoomController', ['$location', '$scope', 'socket', function($location ,$scope, socket){
  $scope.newRoom={
    name : '',
    topic : '',
    pass: ''
  };
  $scope.create = function(newRm){
    var rm = {
      name :' ',
      topic :' ',
    };
    var joinObj = {
      room : rm,
      pass : '',
    };
    socket.emit('joinroom' , newRm ,function(available){
      if(available){
        //just a teporary redirect untill specific room pages are implemented
        $location.url('/home/roomlist');
      }
    });
  };
}]);
