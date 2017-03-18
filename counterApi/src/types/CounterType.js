/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  // GraphQLString as StringType,
  GraphQLInt as IntType,
  // GraphQLNonNull as NonNull,
} from 'graphql';

const CounterItemType = new ObjectType({
  name: 'CounterItem',
  fields: ()=> ({
    amount: {
      type: IntType,
      resolve: (counter) => counter.amount
    },
  }),
});

export default CounterItemType;
