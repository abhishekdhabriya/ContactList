import React, {Component} from "react";
import {Nav, Navbar, NavItem, Header as BootstrapHeader, Brand} from "react-bootstrap";

class Header extends Component {

  constructor() {
    super();

    // this.state = {
    //   authenticated: false
    // };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }

  login() {
    // do something with login
    console.log('login');

    // this.setState({
    //    authenticated:true
    // });
  }

  logout() {
    // do something with logout
    console.log('logout');

    // this.setState({
    //   authenticated:false
    // });
  }


  render() {
    return (

      <Navbar className="app-header">
        <Navbar.Header>
          <Navbar.Brand>
            <a className="app-brand" href="#">{this.props.title}</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem onClick={this.login}><span className="app-nav-item">Login</span></NavItem>
          <NavItem onClick={this.logout}><span className="app-nav-item">Logout</span></NavItem>
        </Nav>
      </Navbar>

    );
  }
}

export default Header;
