/* http://www.html5rocks.com/en/tutorials/frameworks/angular-websockets/ */
/* http://briantford.com/blog/angular-socket-io */
/* The following is appropriated from Brian Fords' github and blog. */ 
chatApp.factory('socket',['$rootScope', function ($rootScope) {

  var socket = io.connect('ws://localhost:8080');

  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
}]);
