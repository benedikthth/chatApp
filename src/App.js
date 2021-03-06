var chatApp = angular.module("chatApp", ['ngRoute']);
chatApp.config(['$routeProvider', function ($routeProvider) { "use strict";
  $routeProvider
  .when( '/login', {
    templateUrl: 'src/login/login.html',
    controller: 'loginController'
  })
  .when('/roomlist', {
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
