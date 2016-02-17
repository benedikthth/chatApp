chatApp.controller('roomController', ['user', '$routeParams',
  '$location', '$scope', 'socket',
function(user, $routeParams, $location ,$scope, socket){
  if(!user.isLogged){
    $location.url('/login');
  }

  $scope.messageBox = document.getElementById('messageBox');
  $scope.$watch(function(){
    return $scope.messageBox.scrollHeight;
  }, function(){
    $scope.messageBox.scrollTop = $scope.messageBox.scrollHeight;
  });

  $scope.messages = {};
  $scope.newMessage = '';
  $scope.room = {};
  //Request to join room
  socket.emit('joinroom', { room: $routeParams.id, pass:'' }, function(success, reason){
    if(!success){
      alert('unable to join room because : ' + reason);
      $location.url('/roomlist');
    } else {
      //success!
      $scope.roomName = $routeParams.id;
      //now that we're in. set a listener on location change.
      //automatically emit a 'part' when url changes from room/xxx
      $scope.$on('$routeChangeSuccess', function(event, next, current) {
        socket.emit('partroom', $scope.roomName);
      });
    }
  });
  /* Element.
  */
  $scope.sendMessage = function(){
    if($scope.message !== ''){
      socket.emit('sendmsg', {roomName: $scope.roomName, msg: $scope.message});
      $scope.message = '';
    }
  };

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
    }
  });
  socket.on('updatetopic', function(room, topic, username){
    if($scope.roomName === room){
      //message is meant for this room.
      $scope.topic = topic;
    }
  });


  /* */

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

}]);
