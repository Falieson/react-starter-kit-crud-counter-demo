/* TODO @flow */

import db from '../db';

class Counter {

  static findOne(...args) {
    return db.table('counters').where(...args).first('id');
  }

  static any(...args) {
    return db.raw('SELECT EXISTS ?', db.table('counters').where(...args).select(db.raw('1')))
      .then(x => x.rows[0].exists);
  }

  static create(counter) {
    return db.table('counters')
      .insert(counter, ['id', 'value']).then(x => x[0]);
  }

  static setValue(counterId, value) {
    return db.table('counters')
      .where('id', counterId)
      .update(value, ['id', 'value']).then(x => x[0]);
  }
}

export default Counter;
