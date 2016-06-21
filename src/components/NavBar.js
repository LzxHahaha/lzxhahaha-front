/**
 * Created by LzxHahaha on 2016/5/31.
 */

import {LinkContainer} from 'react-router-bootstrap';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.buttons = [
      {text: '博客', url: '/post'},
      // {text: '作品', url: '/works'},
      {text: '关于', url: '/about'}
    ];
  }

  render() {
    return (
      <Navbar style={this.props.style} fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to={'/'}>
              <a>LZXHAHAHA</a>
            </LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {
              this.buttons.map((el, index) => {
                return (
                  <LinkContainer key={`navBtn${index}`} activeClassName="active" to={el.url}>
                    <NavItem eventKey={index}
                             href={el.url}
                    >
                      {el.text}
                    </NavItem>
                  </LinkContainer>
                );
              })
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

module.exports = NavBar;
