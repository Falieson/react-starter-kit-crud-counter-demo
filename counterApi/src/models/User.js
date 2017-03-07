/**
 * Node.js API Starter Kit (https://reactstarter.com/nodejs)
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import db from '../db';

class User {

  static findOne(...args) {
    return db.table('users').where(...args).first('id', 'email');
  }

  static findOneByLogin(provider: string, key: string) {
    return db.table('users')
      .leftJoin('user_logins', 'users.id', 'user_logins.user_id')
      .where({ 'user_logins.name': provider, 'user_logins.key': key })
      .first('id', 'email');
  }

  static any(...args) {
    return db.raw('SELECT EXISTS ?', db.table('users').where(...args).select(db.raw('1')))
      .then(x => x.rows[0].exists);
  }

  static create(user) {
    return db.table('users')
      .insert(user, ['id', 'email']).then(x => x[0]);
  }

  static setClaims(userId, provider, providerKey, claims) {
    return db.transaction(trx => Promise.all([
      trx.table('user_logins').insert({
        user_id: userId,
        name: provider,
        key: providerKey,
      }),
      ...claims.map(claim => trx.raw('SELECT EXISTS ?', trx.table('user_claims')
        .where({ user_id: userId, type: claim.type }))
        .then(x => x.rows[0].exists ? // eslint-disable-line no-confusing-arrow
          trx.table('user_claims')
            .where({ user_id: userId, type: claim.type })
            .update({ value: claim.value }) :
          trx.table('user_claims')
            .insert({ user_id: userId, type: claim.type, value: claim.value }))),
    ]));
  }
}

export default User;
