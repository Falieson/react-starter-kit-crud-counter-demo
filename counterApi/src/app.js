/**
 * Node.js API Starter Kit (https://reactstarter.com/nodejs)
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectRedis from 'connect-redis';
import flash from 'express-flash';
import expressGraphQL from 'express-graphql';
import PrettyError from 'pretty-error';
import redis from './redis';
import passport from './passport';
import schema from './schema';
import accountRoutes from './routes/account';

const app = express();

app.set('trust proxy', 'loopback');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  store: new (connectRedis(session))({ client: redis }),
  name: 'sid',
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(accountRoutes);

app.use('/graphql', expressGraphQL(req => ({
  schema,
  context: {
    user: req.user,
  },
  graphiql: process.env.NODE_ENV !== 'production',
  pretty: process.env.NODE_ENV !== 'production',
})));

app.get('/', (req, res) => {
  if (req.user) {
    res.send(`<p>Welcome, ${req.user.email}! (<a href="/logout">logout</a>)</p>`);
  } else {
    res.send('<p>Welcome, guest! (<a href="/login/facebook">login</a>)</p>');
  }
});

const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => {
  process.stderr.write(pe.render(err));
  next();
});

export default app;
