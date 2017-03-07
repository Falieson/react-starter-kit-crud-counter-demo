/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { GraphQLList as List } from 'graphql';
import fetch from '../../core/fetch';
import CounterItemType from '../types/CounterItemType';

// local api server at localhost:5000/graphql
const url = 'api/counter';

let items = [];
let lastFetchTask;
let lastFetchTime = new Date(1970, 0, 1);

const counter = {
  type: new List(CounterItemType),
  resolve() {
    if (lastFetchTask) {
      return lastFetchTask;
    }

    if ((new Date() - lastFetchTime) > 1000 * 60 * 10 /* 10 mins */) {
      lastFetchTime = new Date();
      lastFetchTask = fetch(url)
        .then(response => response.json())
        .then((data) => {
          if (data.status === 'ok') {
            items = data.items;
          }

          return items;
        })
        .finally(() => {
          lastFetchTask = null;
        });

      if (items.length) {
        return items;
      }

      return lastFetchTask;
    }

    return items;
  },
};

export default counter;
