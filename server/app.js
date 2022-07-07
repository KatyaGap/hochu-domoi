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
const mapRouter = require('./routers/mapRouter');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.env.PWD, 'public')));

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
// app.use('/logout', logoutRouter); // оставляем
app.use('/map', mapRouter); // правим

app.listen(process.env.PORT, () => {
  console.log('The Best Server in Elbrus', process.env.PORT);
});
