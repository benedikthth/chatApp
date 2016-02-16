var chatApp = angular.module("chatApp", ['ngRoute']);
console.log('this is neccecary');
chatApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/home', {
    templateUrl: 'src/home/home.html',
    controller: 'homeController'
  }).
  when( '/home/login', {
    templateUrl: 'src/login/login.html',
    controller: 'loginController'
  }).
  when('/home/roomlist', {
    templateUrl: 'src/roomList/roomList.html',
    controller: 'roomListController'
  }).
  when('/home/room/new', {
    templateUrl : 'src/newRoom/newRoom.html',
    controller: 'newRoomController'
  }).
  when('/home/room/:id', {
    templateUrl : 'src/room/room.html',
    controller : 'roomController'
  }).
  otherwise({ redirectTo: '/home/login' });
}]);
