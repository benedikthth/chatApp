chatApp.controller('roomListController', ['$scope', 'socket', function($scope, socket){
  //request rooms!

  socket.emit('rooms');
  //get roomList.
  socket.on('roomlist', function(data){
    //why???
    for (var i = 0; i < Object.keys(data).length; i++) {
      //oh god so ugly
      data[Object.keys(data)[i]].name = Object.keys(data)[i];
    }
    //console.log(data);
    $scope.roomList = data;
  });
  $scope.join = function(rm){
    socket.emit('joinroom', {room: rm, pass:null});
  };

}]);
