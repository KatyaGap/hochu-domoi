const express = require('express');
const events = require('events');

const router = express();
const emitter = new events.EventEmitter();

router.get('/', (req, res) => {
  emitter.once('newMessage', (message) => {
    res.json(message);
  });
});

router.post('/', (req, res) => {
  // console.log('==========>', res.locals.userId);
  const message = req.body;
  emitter.emit('newMessage', message);
  // console.log('====>', message);
  res.status(200);
});

module.exports = router;
