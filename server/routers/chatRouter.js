const express = require('express');
const events = require('events');

const router = express();
const emitter = new events.EventEmitter();

router.get('/get-messages', (req, res) => {
  emitter.once('newMessage', (message) => {
    res.json(message);
  });
});

router.post('/new-messages', (req, res) => {
  // res.locals.userId = req.session.userId;
  const message = req.body;
  emitter.emit('newMessage', message);
  console.log('====>', message);
  res.status(200);
});

module.exports = router;
