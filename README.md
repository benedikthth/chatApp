# ChatApp
## Instructions to Run:
1. $ git clone -> repository!
2. open your console in the folder where package.json, index.html, and bower.json are. and execute the following commands.
```bash
 $ npm install
 $ bower install
 $ gulp build
 $ gulp watch #Only for developement.
```

7. Run a http server from the folder that contains index.html. During developement we used [simplehttpserver](https://www.npmjs.com/package/simplehttpserver)
8. Access The project via http://localhost:8000

## Server Setup
Navigate to the server Folder and run the following
```bash
$ npm install
$ node chatserver.js
```
the socket server is now running and can be connected to via socket.io in your code. ( the connection is handled in our 'common/socketResource.js' file. Which we appropriated from [Brian Fords' tutorial/blog](http://briantford.com/blog/angular-socket-io) on working with Socket.Io in Angular )

### Following the above steps should result in a server running our soloution on your computer.
