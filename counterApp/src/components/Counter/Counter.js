/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Counter.css';

class Counter extends React.Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
  };

  render() {
    return (
      <div>
        <h1>React/GraphQl Counter</h1>
        <p>
          Count is: {this.props.value}
        </p>
      </div>
    );
  }
}

export default withStyles(s)(Counter);
