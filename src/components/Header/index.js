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
          <Menu.Item key="profiles" className="header-menu__item">
            <span className="header-menu__item-value">Profiles</span>
          </Menu.Item>
          <Menu.Item
            key="servers"
            className="header-menu__item"
          >
            <span className="header-menu__item-value">Servers</span>
          </Menu.Item>
          <Menu.Item
            key="billing"
            className="header-menu__item"
          >
            <span className="header-menu__item-value">Billing</span>
          </Menu.Item>
          <Menu.Item
            key="subscriptions"
            className="header-menu__item"
          >
            <span className="header-menu__item-value">Subscriptions</span>
          </Menu.Item>
          <Menu.Item
            key="helpdesk"
            className="header-menu__item"
          >
            <span className="header-menu__item-value">Helpdesk</span>
          </Menu.Item>
          <SubMenu
            className="my-account"
            title={(
              <span className="submenu-title-wrapper header-menu__item-value">
My account
                <Icon className="ma0 ml-5px" type="caret-down" />
              </span>
)}
          >
            <MenuItemGroup>
              <Menu.Item key="setting:1">
                <Icon type="star" theme="filled" />
Settings
              </Menu.Item>
              <Menu.Item key="setting:2">
                <Icon type="qrcode" />
QR-Code
              </Menu.Item>
              <Menu.Item key="setting:3">
                <Icon type="logout" />
Log out
              </Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default Header;
