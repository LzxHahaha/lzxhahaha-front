/**
 * Created by LzxHahaha on 2016/6/11.
 */

import ReactMarkdown from 'react-markdown';

import ResponsiveImage from './ResponsiveImage';

export default class MarkdownPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="markdownPreview">
        <ReactMarkdown {...this.props}
                       renderers={{
                         Image: ResponsiveImage
                       }}
        />
      </div>
    );
  }
}