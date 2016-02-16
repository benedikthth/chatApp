var chatApp = angular.module("chatApp", ['ngRoute']);

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
  otherwise({ redirectTo: '/home/login' });
}]);
