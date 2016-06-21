/**
 * Created by LzxHahaha on 2016/5/31.
 */

import {Grid, Row, Col, Image, ListGroup, Label} from 'react-bootstrap';
import {browserHistory} from 'react-router'

import styles from './List.css';

import Item from '../../components/PostItem';
import Card from '../../components/Card';

import Request from '../../utils/Request';
import {setTitle} from '../../utils/helper';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      categorySet: null,
      tag: ''
    };
    setTitle('博客');
  }

  async componentWillMount() {
    let data = await Request.get(Request.URL.postList);
    let categorySet = new Set();
    data.forEach(el=>{
      categorySet.add(el.category);
    });

    let tag = this.props.location.query.tag || '';
    if (tag) {
      data = data.filter(el=>el.category===tag);
    }

    this.setState({data, categorySet, tag});
  }

  async onTagClick(tagText) {
    const {tag} = this.state;

    if (tag === tagText) {
      return;
    }

    // 改变地址栏
    browserHistory.push(tagText ? `/post?tag=${tagText}` : '/post');
    let data = await Request.get(`${Request.URL.postList}?tag=${tagText}`);

    this.setState({tag: tagText, data});
  }

  renderTags() {
    const {categorySet, tag} = this.state;

    if (!categorySet) {
      return [];
    }

    let doms = [];
    categorySet.forEach((el, index)=>doms.push(
      <Label key={`label${index}`}
             bsStyle={el===tag?'success':'info'}
             className={styles.tag}
             onClick={()=>this.onTagClick(el)}
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
        <div className={styles.header}></div>

        <Grid>
          <Row className={styles.centerRow}>
            <Image src="/images/mie.png?v=20160607" width="150" height="150" circle />
            <h1 className={styles.title}>山的那边海的那边</h1>
          </Row>

          <Row>
            <Col mdPush={8} md={4}>
              <Card>
                <h4>
                  所有标签
                  {
                    this.state.tag ? (
                      <Label bsStyle="info" className={styles.tag} onClick={()=>this.onTagClick('')}>查看全部</Label>
                    ) : null
                  }
                </h4>
                <hr/>
                <Row>
                  {this.renderTags()}
                </Row>
              </Card>
            </Col>
            <Col mdPull={4} md={8}>
              <ListGroup className={styles.list}>
                {
                  this.state.data.length > 0
                    ? this.state.data.map((el, index) => (
                        <Item data={el} key={`post${el.id}`}/>
                      ))
                    : (<Card>正在加载...</Card>)
                }
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}