/**
 * Created by LzxHahaha on 2016/5/31.
 */

import styles from './Index.css';

import {Grid, Row, Col, ButtonGroup, Button, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import Card from '../components/Card';

import {setTitle} from '../utils/helper';

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    setTitle('LZXHAHAHA', false);
  }

  componentWillMount() {
    window.onresize = ()=>this.render();
  }

  render() {
    return (
      <div className={styles.container}>
        <NavBar />

        <div className={styles.header}></div>

        <Grid>
          <Row className={styles.titleView}>
            <Col xs={12}>
              <Image responsive className="center-block" src="/images/title.png"/>
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <Card className={styles.rowItem}>
                <h3>博客</h3>
                <br/>
                <p>奇怪的文章集合</p>
                <br/>
                <ButtonGroup>
                  <LinkContainer to="/post">
                    <Button bsStyle="success">查看全部</Button>
                  </LinkContainer>
                  <Button href="http://139.129.131.68:3096/rss">订阅RSS</Button>
                </ButtonGroup>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className={styles.rowItem}>
                <h3>个人作品</h3>
                <br/>
                <p>照片和代码之类的balabala</p>
                <br/>
                <ButtonGroup>
                  <Button bsStyle="info" onClick={()=>window.open('https://github.com/LzxHahaha')}>我的Github</Button>
                  <Button bsStyle="primary" onClick={()=>window.open('https://500px.com/lzxglhf')}>我的500px</Button>
                </ButtonGroup>
              </Card>
            </Col>
            <Col xs={12} md={4}>
              <Card className={styles.rowItem}>
                <h3>关于</h3>
                <br/>
                <p>点进去能看见自我介绍什么的也说不定</p>
                <br/>
                <ButtonGroup>
                  <LinkContainer to="/about">
                    <Button bsStyle="warning">看一眼</Button>
                  </LinkContainer>
                </ButtonGroup>
              </Card>
            </Col>
          </Row>
        </Grid>

        <div className={styles.footer}>
          <hr/>
          <p>© LZXHAHAHA 2013-2016</p>
        </div>
      </div>
    );
  }
}
