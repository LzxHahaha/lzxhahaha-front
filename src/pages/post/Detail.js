/**
 * Created by LzxHahaha on 2016/5/31.
 */

import {Grid, Row, Col, Label, Pager, PageItem, ButtonGroup, Button, Modal} from 'react-bootstrap';
import {browserHistory} from 'react-router';

import MarkdownPreview from '../../components/MarkdownPreview';
import FontAwesome from 'react-fontawesome';
import QRCode from 'qrcode.react';

import styles from './Detail.css';

import Request from '../../utils/Request';
import {formatTime, setTitle} from '../../utils/helper';

import {getPostDetail} from '../../logic/post';

export default class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: {},
      wechatModalOpened: false,
      currentId: '',
      isLoading: true
    };

    setTitle('文章详情');
  }

  async componentWillMount() {
    try {
      let detail = await getPostDetail(this.props.params.id);
      this.setState({detail, currentId: this.props.params.id, isLoading: false});

      setTitle(detail.title);
    }
    catch (err) {
      console.log(err);
    }
  }

  async onPagerClick(id) {
    if (id) {
      browserHistory.push(`/post/detail/${id}`);
      this.setState({isLoading: true});
      let detail = await getPostDetail(id);
      this.setState({detail, currentId: id, isLoading: false});
      setTitle(detail.title);
      window.scrollTo(0, 0);
    }
    else {
      browserHistory.push('/post');
    }
  }

  onSharePress(type) {
    const {currentId, detail} = this.state;

    let url = `http://139.129.131.68/post/detail/${currentId}`;
    let shareUrl = `http://www.jiathis.com/send/?webid=${type}&url=${url}&title=${detail.title}&summary=from LZXHAHAHA`;

    switch (type) {
      case 'wechat':
        this.setState({wechatModalOpened: true});
        break;
      case 'cqq':
      case 'tsina':
        window.open(shareUrl);
        break;
      default:
        break;
    }
  }

  render() {
    const {detail, isLoading} = this.state;

    return (
      <div>
        <NavBar />

        <div className={styles.header}></div>

        <Grid>
          <div className={styles.titleView}>
            <h1 className={styles.titleText}>
              {detail.title}
            </h1>
            <Label bsStyle="info">{detail.category}</Label>
            <small className={styles.titleText}>{'    ' + formatTime(detail.time)}</small>
          </div>

          <Row>
            <Col xs={12}>
              <div className={styles.contentView}>
                {
                  !isLoading ? (
                    <MarkdownPreview source={detail.content || ''}/>
                  ) : (
                    <h4 className="text-center">正在加载...</h4>
                  )
                }
              </div>
            </Col>
          </Row>

          {
            !isLoading && (
              <Row className={styles.shareView}>
                <Col xs={12}>
                  <ButtonGroup>
                    <Button bsStyle="info" onClick={()=>this.onSharePress('wechat')}>
                      <FontAwesome name="wechat"/>
                      &nbsp;分享到微信
                    </Button>
                    <Button bsStyle="info" onClick={()=>this.onSharePress('cqq')}>
                      <FontAwesome name="qq"/>
                      &nbsp;分享到QQ
                    </Button>
                    <Button bsStyle="info" onClick={()=>this.onSharePress('tsina')}>
                      <FontAwesome name="weibo"/>
                      &nbsp;分享到微博
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            )
          }

          {
            !isLoading && (
              <Pager>
                <PageItem previous
                          onClick={()=>this.onPagerClick(detail.prev)}
                >
                  {detail.prev ? '← 上一篇' : '返回列表'}
                </PageItem>
                <PageItem next
                          onClick={()=>this.onPagerClick(detail.next)}
                >
                  {detail.next ? '下一篇 →' : '返回列表'}
                </PageItem>
              </Pager>
            )
          }
        </Grid>

        <Modal show={this.state.wechatModalOpened} onHide={()=>this.setState({wechatModalOpened: false})}>
          <Modal.Header closeButton>
            <Modal.Title>扫码分享到微信</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <QRCode value={`http://139.129.131.68/post/detail/${this.state.currentId}`} size={256}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}