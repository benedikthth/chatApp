chatApp.controller('roomListController', ['$scope', 'socket', function($scope, socket){
  //request rooms!

  console.log('trl');
  socket.emit('rooms');
  //get roomList.
  socket.on('roomlist', function(data){
    $scope.roomList = data;
  });
  $scope.join = function(room){
    console.log('reeeee');
    console.log(room);
  };

}]);
