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
  /* op functions */
  /* op function Kick user*/
  $scope.kickUser = function(userName){
      var kickObj = {
        user : userName ,
        room : $scope.roomName
      };
      socket.emit('kickuser', kickObj , function(accepted){
        if(accepted){
          socket.emit('sendmsg' ,{roomname: $scope.roomName, msg: $scope.kickName + ' has been kicked from from this room by ' + user});
          $scope.kickName = '';
        }
      });
  };
  /* op function to ban user*/
  $scope.banUser = function(userName){
    var banObj = {
      user: userName,
      room : $scope.roomName
    };
    socket.emit('banuser', banObj, function(accepted){
      if(accepted){
        socket.emit('sendmsg' ,{roomname: $scope.roomName, msg: $scope.banName + ' has been banned from from this room by ' + user});
        $scope.banName = '';
      }
    });
  };
  /* op function to unban user*/
  $scope.unbanUser = function(userName){
    var unbanobj =    {
      user :userName,
      room : $scope.roomName
    };
    socket.emit('unbanuser', unbanobj , function(accepted){
      if(accepted){
        socket.emit('sendmsg' ,{roomname: $scope.roomName, msg: $scope.unbanName + ' has been unbanned from from this room by ' + user});
        $scope.unbanName = '';
      }
    });
  };
  /* op function to op user*/
  $scope.opUser = function(userName){
      var opobj = {
        user: userName,
        room : $scope.roomName
      };
      socket.emit('op', opobj , function(accepted){
          if(accepted){
            ///
            /*TODO: send private message to the user that was oped*/
            ///
          }
      });
  };
  $scope.deop = function(userName){
    var deopobj = {
      name : userName,
      room : $scope.roomName
    };
    socket.emit('deop' , deopobj , function(accepted){
      if(accepted){
        //
        // TODO semd pirvate message to the user who was deoped
        //
      }
    });
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
