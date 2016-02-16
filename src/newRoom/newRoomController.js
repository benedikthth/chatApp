chatApp.controller('newRoomController', ['$location', '$scope', 'socket', function($location ,$scope, socket){
  $scope.newRoom={
    name : '',
    topic : '',
    pass: ''
  };
  $scope.create = function(newRm){
    var rm = {
      name :newRm.name,
      topic : newRm.topic,
    };
    var joinObj = {
      room : rm,
      pass : newRm.pass,
    };
    console.log(joinObj);
    socket.emit('joinroom' , joinObj ,function(available){
      if(available){
        console.log('tits work');
        //just a teporary redirect untill specific room pages are implemented
        $location.url('/home/roomlist');
      }
    });
  };
}]);
