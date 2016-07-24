/**
 * Created by LzxHahaha on 2016/6/9.
 */

import $ from 'jquery';
import markdown from 'markdown';
import {ListGroupItem, Label} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {formatTime} from '../utils/helper';

export default class PostItem extends React.Component {
  constructor(props) {
    super(props);

    this.rawContent = this.props.data.content;

    this.state = {
      content: ''
    };
  }

  componentWillMount() {
    let html = markdown.toHTML(this.rawContent);
    let content = '';

    ($.parseHTML(html) || []).forEach(el=>content += el.textContent);
    content = content.length > 200 ? content.substring(0, 200) + '...' : content;
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