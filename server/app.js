require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { User } = require('./db/models');
const Bcrypt = require('./utils/bcrypt');
const advertsRouter = require('./routers/advertsRouter');
const registerRouter = require('./routers/registerRouter');
const mapRouter = require('./routers/mapRouter');
const lkRouter = require('./routers/lkRouter');
const checkSession = require('./middlewares/checkSession');
const messageRouter = require('./routers/messageRouter');

const app = express();

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

const PORT = process.env.PORT || 3002;

const sessionConfig = {
  name: 'pet',
  secret: process.env.SECRET || 'thisisnotsecure',
  store: new FileStore(),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: true,
  saveUninitialized: false,
};
const sessionParser = session(sessionConfig);
app.use(sessionParser); //  подключил session parser

app.use(checkSession);

app.use('/adverts', advertsRouter); // правим
app.use('/auth', registerRouter); // оставляем

app.use('/map', mapRouter); // правим
app.use('/lk', lkRouter); // роутер для личного кабинета
app.use('/message', messageRouter);

// app.listen(PORT, () => {
//   console.log('The Best Server in Elbrus', PORT);
// });

console.log('Hello World');

module.exports = {
  app,
  sessionParser,
};
