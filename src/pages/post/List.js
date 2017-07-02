/**
 * Created by LzxHahaha on 2016/5/31.
 */

import { Grid, Row, Col, Image, ListGroup, Label } from 'react-bootstrap';
import { browserHistory } from 'react-router'

import styles from './List.css';

import Item from '../../components/PostItem';
import Card from '../../components/Card';

import Request from '../../utils/Request';
import { setTitle } from '../../utils/helper';

import { getPostList } from '../../logic/post';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      categorySet: [],
      tag: '',
      loading: true
    };
    setTitle('博客');
  }

  async componentWillMount() {
    try {
      let data = await getPostList();
      let categorySet = new Set();
      data.forEach(el => {
        categorySet.add(el.category);
      });

      let tag = this.props.location.query.tag || '';
      if (tag) {
        data = data.filter(el => el.category === tag);
      }

      this.setState({ data, categorySet, tag });
    } catch (err) {
      alert('网络错误');
    } finally {
      this.setState({ loading: false });
    }

  }

  async onTagClick(tagText) {
    const { tag } = this.state;

    if (tag === tagText) {
      return;
    }

    // 改变地址栏
    browserHistory.push(tagText ? `/post?tag=${tagText}` : '/post');
    let data = await getPostList(tagText);

    this.setState({ tag: tagText, data });
  }

  renderTags() {
    const { categorySet, tag } = this.state;

    if (!categorySet) {
      return [];
    }

    let doms = [];
    categorySet.forEach((el, index) => doms.push(
      <Label key={`label${index}`}
             bsStyle={el === tag ? 'success' : 'info'}
             className={styles.tag}
             onClick={() => this.onTagClick(el)}
      >
        # {el}
      </Label>
    ));
    return doms;
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className={styles.header} />

        <Grid>
          <Row className={styles.centerRow}>
            <Image src="http://o8ehwy0fk.bkt.clouddn.com/mie.png?imageView2/0/w/200" width="150" height="150" circle />
            <h1 className={styles.title}>山的那边海的那边</h1>
          </Row>

          <Row>
            <Col mdPush={8} md={4}>
              <Card>
                <h4>
                  所有标签
                  {
                    this.state.tag ? (
                      <Label bsStyle="info" className={styles.tag} onClick={() => this.onTagClick('')}>查看全部</Label>
                    ) : null
                  }
                </h4>
                <hr />
                <Row className={styles.tags}>
                  {this.renderTags()}
                </Row>
              </Card>
            </Col>
            <Col mdPull={4} md={8}>
              {
                this.state.data.length > 0
                  ? (
                    <ListGroup className={styles.list}>this.state.data.map((el, index) => (
                      <Item data={el} key={`post${el.id}`} />
                      ))
                    </ListGroup>
                  ) : (
                    <Card>
                      <p className={styles.listHolder}>
                        { this.state.loading ? '正在加载...' : '暂无数据' }
                      </p>
                    </Card>
                  )
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}