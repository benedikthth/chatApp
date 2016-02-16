chatApp.controller('roomController', ['$location', '$scope', 'socket', function($location ,$scope, socket){
  $scope.newRoom={
    name : '',
    topic : '',
    pass: ''
  };
  $scope.create = function(newRm){
    var joinObj = {
      var room = {
        name :'',
        topic
      }
    }
    socket.emit('joinroom' , newRm ,function(available){
      if(available){
        //just a teporary redirect untill specific room pages are implemented
        $location.url('/home/roomlist');
      }
    });
  };
}]);
