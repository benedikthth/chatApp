chatApp.controller('roomController', ['user', '$routeParams',
  '$location', '$scope', 'socket',
function(user, $routeParams, $location ,$scope, socket){
  if(!user.isLogged){
    $location.url('/login');
  }
  $scope.room = {};
  socket.emit('joinroom', { room: $routeParams.id, pass:'' }, function(success, reason){
    if(!success){
      alert('unable to join room because : ' + reason);
      $location.url('/roomlist');
    } else {
      console.log('you are connected to el '+ $routeParams.id);
      $scope.roomName = $routeParams.id;
      user.room = $routeParams.id;
    }
  });
  /* socket ons */
  socket.on('updateusers', function(roomName, userList, ops) {
    if(roomName === $scope.roomName){
      //message is meant for this rooms....?
      $scope.room.userList = userList;
      $scope.room.ops = ops;
    }
  });
  socket.on('updatechat', function(room, messageHistory){
    if($scope.roomName === room){
      //message is not meant for this room.
      $scope.messages = messageHistory;
      return;
    }
  });
  socket.on('updatetopic', function(room, topic, username){
    if($scope.roomName === room){
      //message is meant for this room.
      $scope.topic = topic;
      console.log(username);
    }
  });

  socket.on('servermessage', function(type, room, username){
    if(room === $scope.roomName){
      switch(type){
        case 'part':
          //todo: Inform Users that {{username}} has left.
          break;
        case 'join':
          //todo: inform users that {{username}} has joined
          break;
        default:
          console.log('wat');
          break;
      }
    }
  });
  //automatically emit a 'part' when url changes from room/xxx
  $scope.$on('$routeChangeSuccess', function(event, next, current) {
      socket.emit('partroom', $scope.roomName);
  });
}]);
