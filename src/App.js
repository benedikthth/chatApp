var chatApp = angular.module("chatApp", ['ngRoute']);
console.log('this is neccecary');
chatApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/home', {
    templateUrl: 'src/home/home.html',
    controller: 'homeController'
  }).
  when( '/login', {
    templateUrl: 'src/login/login.html',
    controller: 'loginController'
  }).
  when('/roomlist', {
    templateUrl: 'src/roomList/roomList.html',
    controller: 'roomListController'
  }).
  when('/room/new', {
    templateUrl : 'src/newRoom/newRoom.html',
    controller: 'newRoomController'
  }).
  when('/room/:id', {
    templateUrl : 'src/room/room.html',
    controller : 'roomController'
  }).
  otherwise({ redirectTo: '/login' });
}]);
