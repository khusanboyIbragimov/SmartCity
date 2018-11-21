var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
var AWS = require('aws-sdk');
app.io = module.exports.io = require('socket.io')()


var cors = require('cors');
app.use(cors());
const session = require('express-session');
const passport = require('passport');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join('../backend/frontend/build'))); //this is the only thing that's different - 'client/build'

app.use(session({
  secret: "\x02\xf3\xf7r\t\x9f\xee\xbbu\xb1\xe1\x90\xfe'\xab\xa6L6\xdd\x8d[\xcc0\xfe",
  resave: false,
  saveUninitialized: true
}));

app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res) => {
  res.sendFile(path.join('../backend/frontend/build/index.html'));
  res.sendFile(index);
});


app.get("/isloggedin", function(req, res) {
  if (req.session.passport.user) {
    res.status(200).send('loggedIn');
  } else {
    res.status(401).send('User not logged in');
  }
});


app.use('/', indexRouter);
app.use('/users', usersRouter);

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

app.use('/s3', require('react-s3-uploader/s3router')({
  bucket: "gulapp2",
  region: "us-east-2",
  headers: {'Access-Control-Allow-Origin': '*'},
  ACL: 'public-read'
}))


// app.io.on('connection', (socket) => {
  // console.log("connected");
  //   socket.on("SEND_MESSAGE", data => {
  //     app.app.io.emit("RECEIVE_MESSAGE", data);
  //   })


  // socket.on('disconnect', function(msg) {
  //   console.log("disconnected: ", msg)
  //   socket.broadcast.emit('user:left', msg);
  // })

// })
const SocketManager = require('./SocketManager');
app.io.on('connection', SocketManager);



// ---------
/*


app.io.on('connection', (socket) => {
  const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED,
		LOGOUT, COMMUNITY_CHAT, MESSAGE_RECEIVED, MESSAGE_SENT,
		TYPING, PRIVATE_MESSAGE, ALL_CONNECTED_USERS  } = require('../frontend/src/components/Central/Giychat/Events')

const { createUser, createMessage, createChat } = require('../frontend/src/components/Central/Giychat/Factories')

let connectedUsers = { }

let communityChat = createChat()

// module.exports = function(socket){

	console.log("Socket Id:" + socket.id);

	let sendMessageToChatFromUser;
	let sendTypingFromUser;

	//Verify Username
	socket.on(VERIFY_USER, (nickname, callback)=>{
		if(isUser(connectedUsers, nickname)){
			callback({ isUser:true, user:null })
		}else{
			callback({ isUser:false, user:createUser({name:nickname, socketId:socket.id})})
		}
	})

	//User Connects with username
	socket.on(USER_CONNECTED, (user)=>{
		user.socketId = socket.id
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user

		sendMessageToChatFromUser = sendMessageToChat(user.name)
		sendTypingFromUser = sendTypingToChat(user.name)

		app.io.emit(ALL_CONNECTED_USERS, connectedUsers)
		app.io.emit(USER_CONNECTED, connectedUsers)
		console.log("-----------" ,connectedUsers);

	})

	//User disconnects
	socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUsers = removeUser(connectedUsers, socket.user.name)

			app.io.emit(USER_DISCONNECTED, connectedUsers)
			console.log("Disconnect", connectedUsers);
		}
	})


	//User logsout
	socket.on(LOGOUT, ()=>{
		connectedUsers = removeUser(connectedUsers, socket.user.name)
		app.io.emit(USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);

	})

	//Get Community Chat
	socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(communityChat)
	})

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

	socket.on(PRIVATE_MESSAGE, ({receiver, sender})=>{
		if (receiver in connectedUsers) {
			const newChat = createChat({ name:`${receiver} & ${sender}`, user:[receiver, sender] })
			const receiverSocket = connectedUsers[receiver].socketId
			socket.to(receiverSocket).emit(PRIVATE_MESSAGE, newChat)
			socket.emit(PRIVATE_MESSAGE, newChat)
		}
	})

// }

// Returns a function that will take a chat id and a boolean isTyping
// and then emit a broadcast to the chat id that the sender is typing
function sendTypingToChat(user){
	return (chatId, isTyping)=>{
		app.io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}


// Returns a function that will take a chat id and message
// and then emit a broadcast to the chat id.
function sendMessageToChat(sender){
	return (chatId, message)=>{
		app.io.emit(`${MESSAGE_RECEIVED}-${chatId}`, createMessage({message, sender}))
	}
}

// Adds user to list passed in.
function addUser(userList, user){
	let newList = Object.assign({}, userList)
	newList[user.name] = user
	return newList
}

// Removes user from the list passed in.
function removeUser(userList, username){
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}

// Checks if the user is in list passed in.
function isUser(userList, username){
  	return username in userList
}

})


*/
// -----------



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
