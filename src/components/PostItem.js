/**
 * Created by LzxHahaha on 2016/6/9.
 */

import * as React from 'react';
import { parse } from 'markdown';
import { ListGroupItem, Label } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { formatTime } from '../utils/helper';

export default class PostItem extends React.Component {
  constructor(props) {
    super(props);

    this.rawContent = this.props.data.content;

    this.state = {
      content: ''
    };
  }

  componentWillMount() {
    let html = parse(this.rawContent);
    const div = document.createElement('div');
    div.innerHTML = html;

    const content = div.innerText.length > 200 ? div.innerText.substring(0, 200) + '...' : div.innerText;
    this.setState({content});
  }

  render() {
    const {data} = this.props;
    
    return (
      <LinkContainer to={`/post/detail/${data.id}`}>
        <ListGroupItem>
          <blockquote>
            <b>{data.title}</b>
            <p><Label bsStyle="info"># {data.category}</Label></p>
          </blockquote>
          <p>{this.state.content}</p>
          <small>{formatTime(data.time)}</small>
        </ListGroupItem>
      </LinkContainer>
    );
  }
}