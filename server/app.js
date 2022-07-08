require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
// const upload = require('./middlewares/middlewares');
const { User } = require('./db/models');
const Bcrypt = require('./utils/bcrypt');
const indexRouter = require('./routers/indexRouter');
const registerRouter = require('./routers/registerRouter');
const logoutRouter = require('./routers/logoutRouter');
const mapRouter = require('./routers/mapRouter');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

const PORT = process.env.PORT || 3001;

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

app.use(session(sessionConfig));

app.use('/adverts', indexRouter); // правим
app.use('/auth', registerRouter); // оставляем
// app.use('/login', loginRouter); // оставляем
app.use('/logout', logoutRouter);
app.use('/map', mapRouter); // правим

app.listen(PORT, () => {
  console.log('The Best Server in Elbrus', PORT);
});
