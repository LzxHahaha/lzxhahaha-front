/**
 * Created by LzxHahaha on 2016/6/9.
 */

import classnames from 'classnames';

import styles from './Card.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={classnames(styles.container, this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}