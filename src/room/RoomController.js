chatApp.controller('roomController', ['user', '$routeParams',
  '$location', '$scope', 'socket',
function(user, $routeParams, $location ,$scope, socket){
  if(!user.isLogged){
    $location.url('/login');
  }
  $scope.me = user.username;
  $scope.messageBox = document.getElementById('messageBox');
  $scope.$watch(function(){
    return $scope.messageBox.scrollHeight;
  }, function(){
    $scope.messageBox.scrollTop = $scope.messageBox.scrollHeight;
  });

  $scope.messages = {};
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
  /* conditionals <- */
  $scope.userIsOp = function(name) {
    //don't allow operations on undefined .
    if($scope.room.ops){
      return (Object.keys($scope.room.ops).indexOf(name) !== -1);
    }
  };
  $scope.canOp = function (name){
    //you cannot op an allready-op user.
    if($scope.userIsOp(name)){return false; }
    //you cannot op if you yourself are not op
    if(!$scope.userIsOp(user.username)){ return false; }
    //you cannot op yourself
    else if(name === user.username){ return false; }
    //you may op.
    return true;
  };
  $scope.canDeop = function(name){
    //if name is not op return false
    if(!$scope.userIsOp(name)){ return false; }
    //if user is not op return false.
    else if(!$scope.userIsOp(user.username)){ return false; }
    //cannot op or deop yourself.
    else if(name === user.username){ return false; }
    //user is op, and name is op.
    return true;
  };
  $scope.canKickOrBan = function(name){
    if(!$scope.userIsOp(user.username)){
      //user is not op. no permis.
      return false;
    }else if($scope.userIsOp(name)){
      //user cannot ban another op.
      return false;
    }
    //user can kick, ban or op 'name'
    return true;
  };
  /* actions*/
  $scope.sendMessage = function(){
    if($scope.message !== ''){
      socket.emit('sendmsg', {roomName: $scope.roomName, msg: $scope.message});
      $scope.message = '';
    }
  };
  $scope.leaveRoom = function(){
    $location.url('/roomlist');
  };
  /* op functions */
  /* op function Kick user*/
  $scope.kickUser = function(userName){
      var kickObj = {
        user : userName ,
        room : $scope.roomName
      };
      socket.emit('kick', kickObj , function(accepted){
        if(accepted){
          socket.emit('sendmsg', {roomName: $scope.roomName, msg: userName + ' has been kicked from from this room by ' + user.username});
        }
      });
  };
  /* op function to ban user*/
  $scope.banUser = function(userName){
    var banObj = {
      user: userName,
      room : $scope.roomName
    };
    socket.emit('ban', banObj, function(accepted){
      if(accepted){
        socket.emit('sendmsg' ,{roomName: $scope.roomName, msg: userName + ' has been banned from from this room by ' + user.username});
      }
    });
  };
  /* op function to unban user*/
  $scope.unbanUser = function(name){
    var unbanobj =    {
      user :name,
      room : $scope.roomName
    };
    socket.emit('unban', unbanobj , function(accepted){
      if(accepted){
        socket.emit('sendmsg', {roomName : $scope.roomName, msg : name + ' has been unbanned from from this room by ' + user.username});
      }
    });
  };
  /* op function to op user*/
  $scope.opUser = function(name){
      var opobj = {
        user: name,
        room : $scope.roomName
      };
      socket.emit('op', opobj , function(accepted){
          if(accepted){

          }
      });
  };
  $scope.deop = function(name){
    var deopobj = {
      user : name,
      room : $scope.roomName
    };
    socket.emit('deop' , deopobj , function(accepted){
      if(accepted){

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
  socket.on('kicked', function(room, kickedUser, kickerName){
    if(room === $scope.roomName && kickedUser === user.username){
      $location.url('/roomlist');
    }
  });
  socket.on('banned' , function(room , banName , opName){
    if(user.username == banName){
      alert('You Have been banned.');
      $location.url('/roomlist');
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
          //oops what...
          break;
      }
    }
  });
}]);
