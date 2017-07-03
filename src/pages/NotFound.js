/**
 * Created by LzxHahaha on 2017/7/4.
 */

import React from 'react';

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <NavBar />
        <h1 style={{ textAlign: 'center' }}>404 NotFound.</h1>
      </div>
    );
  }
}
