chatApp.controller('roomController', ['$location', '$scope', 'socket', function($location ,$scope, socket){
  $scope.newRoom={
    name : '',
    topic : '',
    pass: ''
  };
  $scope.create = function(newRm){
    socket.emit('joinroom' , newRm ,function(available){
      if(available){
        //needed to implement the page for single room
        $location.Url('');
      }
    });
  };
}]);
