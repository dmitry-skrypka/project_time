import {
  Menu, Icon, Row, Col,
} from 'antd';

import React from 'react';

import './styles.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className="header-container">
        <Menu
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="horizontal"
          className="nav-menu"
        >
          <Menu.Item key="profiles">Profiles</Menu.Item>
          <Menu.Item key="servers" disabled>
            Servers
          </Menu.Item>
          <Menu.Item key="billing" disabled>
            Billing
          </Menu.Item>
          <Menu.Item key="subscriptions" disabled>
            Subscriptions
          </Menu.Item>
          <Menu.Item key="helpdesk" disabled>
            Helpdesk
          </Menu.Item>
          <SubMenu
            title={<span className="submenu-title-wrapper">My Account</span>}
          >
            <MenuItemGroup>
              <Menu.Item key="setting:1">
                <Icon type="star" theme="filled" />
                Settings
              </Menu.Item>
              <Menu.Item key="setting:2">QR-Code</Menu.Item>
              <Menu.Item key="setting:3">Log out</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default Header;
