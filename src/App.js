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
    templateUrl: 'src/rooms/roomList.html',
    controller: 'roomListController'
  }).
  otherwise({ redirectTo: '/home/login' });
}]);
