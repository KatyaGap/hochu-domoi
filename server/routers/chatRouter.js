// const express = require('express');
// const events = require('events');
// const { Room, User, Message } = require('../db/models');

// const router = express();
// const emitter = new events.EventEmitter();

// router.get('/', async (req, res) => {

// });

// router.post('/', async (req, res) => {
//   // console.log('==========>', res.locals.userId);
//   const { message, room_id, message_id } = req.body;
//   console.log('!!!!!!!!!!!!!', message);
//   const newMessage = await Message.create({ message, room_id, message_id });

//   // console.log('====>', message);
//   res.status(200);
// });

// module.exports = router;
