import React from 'react';
import {
  Icon, Select, Menu, Button, Dropdown,
} from 'antd';
import { connect } from 'react-redux';
import history from '../../config/history';
import handleOsIcons from '../../helpers/osIcon';
import { getProfiles } from '../../actions/userActions';
import { onProfileDelete, onProfileSelect, setTabProfileView } from '../../actions/profilesActions';


function VpnCard(props) {
  const {
    onProfileClick, profile, connected, onTabChange, onDelete,
  } = props;

  function handleButtonClick(e) {
    console.log('click left button', e);
  }


  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item value="activity">

        <Icon type="global" />
                Activity
        {' '}
        {' '}
      </Menu.Item>
      <Menu.Item value="services">

        <Icon type="profile" />
                Services
        {' '}
        {' '}
      </Menu.Item>
      <Menu.Item value="connect">

        <Icon type="api" />
                Connect
        {' '}
        {' '}
      </Menu.Item>
      <Menu.Item value="delete">

        <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
                Delete
        {' '}
        {' '}
      </Menu.Item>
      <Menu.Item value="setup">

        <Icon type="setting" />
                Setup
        {' '}
        {' '}
      </Menu.Item>
    </Menu>
  );


  function handleMenuClick(e) {
    switch (e.item.props.value) {
      case 'activity':
        onTabChange({ tab: '1', selectedProfileID: profile.id });
        history.push(`/${profile.id}/view/`);
        break;
      case 'services':
        onTabChange('2');
        history.push(`/${profile.id}/view/`);
        break;
      case 'connect':
        onTabChange('3');
        history.push(`/${profile.id}/view/`);
        break;
      case 'delete':
        onDelete(profile.id);
        console.log(profile.id);
        break;
      default:
        history.push(`/${profile.id}/view/`);
    }
  }
  function handleClick(e, id) {
    e.stopPropagation();
    onProfileClick(id);
  }

  return (
    <div className="profile_card_container" onClick={e => handleClick(e, profile.id)}>
      <div className="profile_card_section">
        <div>
          <Icon
            style={{ fontSize: 20 }}
            component={handleOsIcons(profile.os)}
          />
          <div>{profile.name}</div>
        </div>

      </div>
      <div className="profile_card_section">
        <div>Session</div>
        <div>{connected ? 'Connected' : 'Disconnected'}</div>
      </div>
      <div className="profile_card_section">
        <div>Billing</div>
        <div>{profile.subscription.name}</div>
      </div>
      <div className="profile_card_section">
        <div>{profile.server.name}</div>
        <div>
          {profile.server.load.mbits}
          {' '}
Mb/s
        </div>
      </div>
      <div className="profile_card_section">
        <div>Used</div>
        <div>{profile.online}</div>
      </div>
      <div onClick={e => e.stopPropagation()}>
        {/* <Select */}
        {/* style={{ width: 200, zIndex: 300 }} */}
        {/* placeholder="Actions" */}
        {/* onChange={handleChange} */}

        {/* > */}
        {/* <Option value="activity">Activity</Option> */}
        {/* <Option value="services">Services</Option> */}
        {/* <Option value="connect">Connect</Option> */}
        {/* <Option value="setup">Setup</Option> */}
        {/* <Option value="delete">Delete</Option> */}
        {/* </Select> */}
        <Dropdown overlay={menu} trigger={['click']}>
          <Button style={{ marginLeft: 8, width: 120 }}>
                  Actions
            {' '}
            <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    </div>

  );
}


const mapDispatchToProps = dispatch => ({
  onTabChange: (tab) => {
    dispatch(setTabProfileView(tab));
  },
  onDelete: (id) => {
    dispatch(onProfileDelete(id));
  },


});

export default connect(null, mapDispatchToProps)(VpnCard);
