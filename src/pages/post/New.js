/**
 * Created by LzxHahaha on 2016/6/5.
 */

import {Grid, Row, Well, Form, FormGroup, Col, FormControl, ControlLabel, Button, Label} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import MarkdownPreview from '../../components/MarkdownPreview';

import {isAdmin} from '../../logic/auth';
import {publish} from '../../logic/post';

export default class New extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: window.localStorage.newPostTitle || '',
      category: window.localStorage.newPostTag || '',
      content: window.localStorage.newPostContent || ''
    };
  }

  componentWillMount() {
    if (!isAdmin()) {
      browserHistory.push('/user/login?returnUrl=/post/new');
    }
  }

  onTitleChange(title) {
    this.setState({title});
    window.localStorage.newPostTitle = title;
  }

  onCategoryChange(category) {
    this.setState({category});
    window.localStorage.newPostTag = category;
  }

  onContentChange(content) {
    this.setState({content});
    window.localStorage.newPostContent = content;
  }

  async publish() {
    try {
      this.setState({error: ''});
      const {title, content, category} = this.state;

      await publish(title, content, category);
      window.localStorage.removeItem('newPostTitle');
      window.localStorage.removeItem('newPostTag');
      window.localStorage.removeItem('newPostContent');
      browserHistory.push('/post');
    }
    catch (err) {
      console.log(err);
    }
  }

  render() {
    const {title, content, category, error} = this.state;

    return (
      <div>
        <NavBar />

        <Grid>
          <Col md={6} id="editor">
            <Well>
              <h3>编辑</h3>
              <hr/>
              <Form horizontal>
                <FormGroup controlId="formHorizontalTitle">
                  <Col componentClass={ControlLabel} sm={2}>
                    标题
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="标题"
                                 value={title}
                                 onChange={event=>this.onTitleChange(event.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalCategory">
                  <Col componentClass={ControlLabel} sm={2}>
                    类别
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text"
                                 value={category}
                                 onChange={event=>this.onCategoryChange(event.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalContent">
                  <Col componentClass={ControlLabel} sm={2}>
                    内容
                  </Col>
                  <Col sm={10}>
                    <FormControl componentClass="textarea"
                                 value={content}
                                 rows={30}
                                 onChange={event=>this.onContentChange(event.target.value)}
                    />
                  </Col>
                </FormGroup>

                {
                  error && (
                    <FormGroup>
                      <Col sm={10} smOffset={2}>
                        <Label bsStyle="danger">{error}</Label>
                      </Col>
                    </FormGroup>
                  )
                }


                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button onClick={()=>this.publish()}>
                      发布
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </Well>
          </Col>

          <Col md={6}>
            <Well>
              <h3>预览</h3>
              <hr />
              <MarkdownPreview source={`# ${this.state.title}\n${this.state.content}`} />
            </Well>
          </Col>
        </Grid>
      </div>
    );
  }
}