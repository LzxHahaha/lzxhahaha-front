/**
 * Created by LzxHahaha on 2016/6/11.
 */

import {Image} from 'react-bootstrap';

export default class ResponsiveImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Image {...this.props} responsive />
    );
  }
}