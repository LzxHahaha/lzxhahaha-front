/**
 Created by LzxHahaha on 2016/6/1.
 */

import AvtImage from 'react-atv-img';
import {Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';

import styles from './About.css';

import {setTitle} from '../utils/helper';

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1
    };

    setTitle('关于');
  }

  handleSelect(activeTab) {
    this.setState({activeTab});
  }

  render() {
    return (
      <div>
        <NavBar />

        <div className={styles.header}>
          <AvtImage
            layers={[
              '/images/back.png',
              '/images/front.png'
            ]}
            staticFallback="/images/static.jpg"
            isStatic={false}
            className={'thisIsOptional'}
            style={{ width: 320, height: 190 }}
          />
        </div>

        <Grid>
          <Row>

            <Nav bsStyle="tabs" justified activeKey={this.state.activeTab} onSelect={(i)=>this.handleSelect(i)}>
              <NavItem eventKey={1}>关于我</NavItem>
              <NavItem eventKey={2}>关于本站</NavItem>
            </Nav>
          </Row>

          {
            this.state.activeTab === 1 ? (
              <Row>
                <Col xs={12} className="text-center">
                  <h2>是的这里是自我介绍</h2>
                  <small>当然了我是不会贴照片的</small>
                  <hr/>
                  邮箱：<a href="mailto://lzxglhf@live.com">lzxglhf@live.com</a><br/>
                  QQ：632859684
                  <hr/>
                  <Col>
                    <p>
                      来概括一下我自己<br/>
                      熟悉PS与AI的打开方式；<br/>
                      幼儿园绘画比赛拿过奖，真的；<br/>
                      辣鸡单身程序员，水平不如小学生；<br/>
                      精通三角形收缩与架起，会摁相机的快门；<br/>
                      <br/>
                      我不是咸鱼，我还有梦想；<br/>
                      虽然梦想是混吃等死但怎么也算有；<br/>
                      本来想在这里写我的故事的；<br/>
                      但是想想打字好累；<br/>
                      不打了；<br/>
                      <br/>
                      想听故事的可以小窗我<br/>
                      <small>我给你念故事会</small>
                    </p>
                  </Col>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col xs={12} className="text-center">
                  <h2>然后这里是网站介绍</h2>
                  <hr/>
                  <Col>
                    <p>
                      练手用的网站，目前是 React + Node.js<br/>
                      没事会写点奇怪的文章<br/>
                      想想代码写得太烂就不开源了<br/>
                      反正也没人看<br/>
                    </p>
                  </Col>
                  <hr/>
                  有意见请给我发邮件蟹蟹
                </Col>
              </Row>
            )
          }
        </Grid>
      </div>
    );
  }
}