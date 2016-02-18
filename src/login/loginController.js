chatApp.controller("loginController", ['user', '$location' ,'$scope', 'socket', function (user, $location ,$scope, socket){
  if(user.isLogged){
    //You are not permitted to log in after logging in, that makes no sense
    $location.url('/roomlist');
  }
  $scope.user = {
    name: ''
  };
  $scope.login = function(){
    //Do not permit empty string or strings with less than 3 chars as usernames
    if($scope.user.name === '' || $scope.user.name.length < 3 ){
      $scope.user.name = '';
      return;
    }
    socket.emit('adduser' , $scope.user.name, function(available){
      if(!available){
        //todo: Inform the user that the name was unavailable.
        $scope.user.name = '';
      } else {
        //todo: good job.
        user.username = $scope.user.name;
        user.isLogged = true;
        $location.url('/roomlist');
      }
    });
  };

}]);
