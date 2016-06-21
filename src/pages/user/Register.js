/**
 * Created by LzxHahaha on 2016/6/1.
 */

import {connect} from 'react-redux';
import {register} from '../../redux/modules/session';
import { browserHistory } from 'react-router';

import {Grid, Well, Form, FormGroup, Col, FormControl, ControlLabel, Button, Label} from 'react-bootstrap';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  async register() {
    try {
      this.setState({error: ''});
      const {username, password} = this.state;
      const returnUrl = (this.props.params && this.props.params.returnUrl) ? this.props.params.returnUrl : '';

      await this.props.register(username, password);
      if (returnUrl) {
        browserHistory.push(returnUrl);
      }
      else {
        browserHistory.push('/');
      }
    }
    catch (err) {
      this.setState({error: err.message});
    }
  }

  render() {
    const {username, password, error} = this.state;

    return (
      <div>
        <NavBar />

        <Grid>
          <Well>
            <Form horizontal>
              <FormGroup controlId="formHorizontalUsername">
                <Col componentClass={ControlLabel} sm={2}>
                  用户名
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="用户名"
                               value={username}
                               onChange={event=>this.setState({username: event.target.value})}
                  />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  密码
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="密码"
                               value={password}
                               onChange={event=>this.setState({password: event.target.value})}
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
                  <Button onClick={()=>this.register()}>
                    注册
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Well>
        </Grid>
      </div>
    );
  }
}

export default connect(state => ({}), dispatch => ({
  register: (username, password) => dispatch(register(username, password))
}))(Register);