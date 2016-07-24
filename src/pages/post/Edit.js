/**
 * Created by LzxHahaha on 2016/6/10.
 */

import {Grid, Well, Form, FormGroup, Col, FormControl, ControlLabel, Button, Label} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import MarkdownPreview from '../../components/MarkdownPreview';

import {isAdmin} from '../../logic/auth';
import {getPostDetail, edit} from '../../logic/post';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      content: '',
      category: ''
    };
  }

  async componentWillMount() {
    if (!isAdmin()) {
      browserHistory.push(`/user/login?returnUrl=/post/edit/${this.props.params.id}`);
    }

    try {
      let detail = await getPostDetail(this.props.params.id);
      this.setState({...detail});
    }
    catch (err) {
      console.log(err.stack);
    }
  }

  onDrop(files) {
    this.setState({headerImage: files[0].preview});
  }

  async publish() {
    try {
      this.setState({error: ''});
      const {title, content, category} = this.state;

      await edit(this.props.params.id, title, content, category);
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
          <Col md={6}>
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
                                 onChange={event=>this.setState({title: event.target.value})}
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
                                 onChange={event=>this.setState({category: event.target.value})}
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
                                 rows={20}
                                 onChange={event=>this.setState({content: event.target.value})}
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
                      更新
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
              <MarkdownPreview source={`# ${this.state.title}\n---\n${this.state.content}`} />
            </Well>
          </Col>
        </Grid>
      </div>
    );
  }
}