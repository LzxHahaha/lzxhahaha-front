/**
 * Created by LzxHahaha on 2016/9/27.
 */

import {Grid, Row, Col, Table, Label} from 'react-bootstrap';

import styles from './Resume.css';

const INTERNSHIP = [
  {name: '杭州欧石南网络科技有限公司', time: '2015.11~2016.08', post: 'React Native研发实习生'},
  {name: '杭州起码科技有限公司（有赞）', time: '2016.10~2016.12', post: 'PHP实习生'}
];

const PROJECTS = [
  {name: '图像检索系统', time: '2016.12~2017.02', labels: ['React', 'Flask', 'OpenCV'], detail: '毕业设计，基于内容的图像平台，独立完成前端+后台+图像处理'},
  {name: '浙工大小黄丫项目', time: '2016.08~2016.09', labels: ['RN', 'Express.js', 'MySQL', 'Redis'], detail: '独立完成 App 的页面实现以及 SDK 接入，以及后台 API'},
  {name: '北京 VCONT 项目', time: '2016.08~2016.09', labels: ['RN'], detail: '独立完成 App 的页面以及接口联调'},
  {name: 'PHP简易框架实现', time: '2016.07~2016.08', labels: ['PHP'], detail: '实现了一个可以处理路由，匹配 Middleware 以及 Controller 的 PHP 框架'},
  {name: '个人网站搭设', time: '2016.06~2016.07', labels: ['React.js', 'Express.js', 'MongoDB'], detail: '独立实现了个人网站的前端页面以及后台接口'},
  {name: 'DOPE 项目', time: '2016.05~2016.07', labels: ['RN'], detail: '参与了 App 的页面实现并负责大部分的接口联调'},
  {name: '深圳金葫芦金融 App', time: '2016.02~2016.04', labels: ['RN'], detail: '独立完成 App 的页面实现以及接口联调'},
  {name: '浙工大教务管理 App', time: '2015.07~2015.08', labels: ['UWP'], detail: '爬取学校教务管理系统数据，并实现了一款 UWP 应用'},
];

const SCHOOL = [
  {name: '2016浙江省服务外包大赛', time: '二等奖', labels: ['RN', 'Express.js'], detail: '负责项目的 App 以及后台接口实现'},
  {name: '2016浙江省电子商务大赛', time: '一等奖', labels: ['RN', 'PHP'], detail: '负责项目的 App 以及后台接口实现'},
  {name: '2015中国大学生创业大赛', time: '三等奖', labels: ['PHP', 'MySQL'], detail: '负责项目的前端页面以及后台接口实现'},
  {name: '2015中国机器人大赛', time: '一等奖', labels: ['C++'], detail: '负责代码调试以及优化'},
  {name: '2015浙江省服务外包大赛', time: '一等奖', labels: ['C#', 'ASP.NET MVC'], detail: '负责项目的后台管理系统以及接口实现'},
  {name: '班级团支书', time: '2014.09~2015.09', labels: [], detail: ''},
];

export default class Resume extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAllProject: false,
      showAllSchoolExp: false
    };
  }

  componentWillMount() {
    const body = $('body');
    body.css('background-color', 'lightgray');
    body.css('padding-bottom', '40px');
  }

  renderExperienceContent = (el, index) => {
    return (
      <tr key={`${el.name}_${index}`}>
        <td>
          <Col xs={12}>
            <p className={styles.projectTitle}>
              <span className={styles.projectName}>
                {el.name}
              </span>
              <small className={styles.projectSubtitle}>{el.time}</small>
              <div className={styles.projectLabelView}>
                {
                  !!el.labels && el.labels.map((el, index) => (
                    <Label bsStyle="primary" className={styles.projectLabel}>{el}</Label>
                  ))
                }
              </div>
            </p>

            {
              !!el.detail && (
                <p className={styles.projectDetail}>{el.detail}</p>
              )
            }
          </Col>
        </td>
      </tr>
    );
  };

  renderProject() {
    const {showAllProject} = this.state;

    return (
      <tbody>
        {
          showAllProject ?
            PROJECTS.map(this.renderExperienceContent) :
            [0, 1, 2, 3].map((el) => this.renderExperienceContent(PROJECTS[el], el))
        }
        <tr>
          <td onClick={() => this.setState({showAllProject: !showAllProject})} style={{cursor: 'pointer'}}>
            {showAllProject ? '收起' : '查看全部'}
          </td>
        </tr>
      </tbody>
    );
  }

  renderSchool() {
    const {showAllSchoolExp} = this.state;

    return (
      <tbody>
      {
        showAllSchoolExp ?
          SCHOOL.map(this.renderExperienceContent) :
          [0, 1, 2].map((el) => this.renderExperienceContent(SCHOOL[el], el))
      }
      <tr>
        <td onClick={() => this.setState({showAllSchoolExp: !showAllSchoolExp})} style={{cursor: 'pointer'}}>
          {showAllSchoolExp ? '收起' : '查看全部'}
        </td>
      </tr>
      </tbody>
    );
  }

  render() {
    return (
      <div>
         <Grid>
           <Row>
             <Col md={8} mdOffset={2} className={styles.paper}>
               <h3>
                 梁祖玄<br/>
                 <small>求职意向：Unknown</small>
               </h3>

               <Row className={styles.info}>
                 <Col sm={4} xs={12}>
                   邮箱：<a href="mailto://lzxglhf@live.com">lzxglhf@live.com</a>
                 </Col>
                 <Col sm={4} xs={12}>
                   网站：<a href="http://www.lzxhahaha.com" target="_blank">lzxhahaha.com</a>
                 </Col>
                 <Col sm={4} xs={12}>
                   Github：<a href="https://github.com/LzxHahaha" target="_blank">LzxHahaha</a>
                 </Col>
               </Row>
               <Row/>

               <Item header="学历" id="diploma">
                 <Table hover>
                   <tbody>
                   <tr>
                     <td>2013~2017</td>
                     <td>浙江工业大学&nbsp;&nbsp;软件工程</td>
                     <td>本科</td>
                   </tr>
                   </tbody>
                 </Table>
               </Item>

               <Item header="专业技能" id="skill">
                 <Table hover>
                   <tbody>
                     <tr>
                       <td>●</td>
                       <td>熟悉 <b>Node.js/PHP</b> 等后台开发技术</td>
                     </tr>
                     <tr>
                       <td>●</td>
                       <td>熟悉 <b>React.js/React Native</b> 等 JavaScript 框架</td>
                     </tr>
                     <tr>
                       <td>●</td>
                       <td>熟悉 <b>Git/Linux</b> 的基础操作，熟悉 <b>HTTP</b> 协议</td>
                     </tr>
                     <tr>
                       <td>●</td>
                       <td>掌握 <b>MySQL/MongoDB/Redis</b> 等数据库的基本用法</td>
                     </tr>
                   </tbody>
                 </Table>
               </Item>

               <Item header="实习经历" id="internship">
                 <Table hover>
                   <tbody>
                   {
                     INTERNSHIP.map((el, index) => (
                       <tr key={`job${index}`}>
                         <td>{el.time}</td>
                         <td>{el.name}</td>
                         <td>{el.post}</td>
                       </tr>
                     ))
                   }
                   </tbody>
                 </Table>
               </Item>

               <Item header="项目经验" id="project">
                 <Table hover striped>
                   {this.renderProject()}
                 </Table>
               </Item>

               <Item header="校园经历" id="school">
                 <Table hover striped>
                   {this.renderSchool()}
                 </Table>
               </Item>
             </Col>
           </Row>
         </Grid>
      </div>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.itemHeader}>
          <div className={styles.itemIcon}/>
          <p className={styles.itemText}>{this.props.header}</p>
          <div className={styles.itemLine} />
        </div>
        <div className={styles.content}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
