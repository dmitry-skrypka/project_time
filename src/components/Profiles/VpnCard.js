import React from 'react';
import {
  Icon,
  Select,
  Menu,
  Button,
  Dropdown,
  Typography,
  Progress,
  Badge,
  Tag,
  Tooltip, Divider,
} from 'antd';
import { connect } from 'react-redux';
import history from '../../config/history';
import handleOsIcons from '../../helpers/osIcon';
import { getProfiles } from '../../actions/userActions';
import {
  onProfileDelete,
  onProfileSelect,
  onSetupVpn,
  setTabProfileView,
} from '../../actions/profilesActions';
import ProfileCardTags from './ProfileCardTags';

const { Text } = Typography;
function VpnCard(props) {
  const {
    onProfileClick,
    profile,
    connected,
    onTabChange,
    onDelete,
    onSetup,
  } = props;

  function handleButtonClick(e) {
    console.log('click left button', e);
  }
  console.log(profile);
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item value="activity">
        <Icon type="global" />
        Activity
        {' '}
      </Menu.Item>
      <Menu.Item value="services">
        <Icon type="profile" />
        Services
        {' '}
      </Menu.Item>
      <Menu.Item value="connect">
        <Icon type="api" />
        Connect
        {' '}
      </Menu.Item>
      <Menu.Item value="delete">
        <Icon type="delete" theme="twoTone" twoToneColor="#eb2f96" />
        Delete
        {' '}
      </Menu.Item>
      <Menu.Item value="setup">
        <Icon type="setting" />
        Setup
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
        onTabChange({ tab: '2', selectedProfileID: profile.id });
        history.push(`/${profile.id}/view/`);
        break;
      case 'connect':
        onTabChange({ tab: '3', selectedProfileID: profile.id });
        history.push(`/${profile.id}/view/`);
        break;
      case 'delete':
        onDelete(profile.id);
        console.log(profile.id);
        break;
      case 'setup':
        onSetup(profile);
        history.push(`/${profile.id}/setup/`);
        break;
      default:
        history.push(`/${profile.id}/view/`);
    }
  }
  function handleClick(e, id) {
    e.stopPropagation();
    onProfileClick(id);
  }
  console.log(profile);
  return (
    <div
      role="button"
      onClick={e => handleClick(e, profile.id)}
      className="profile_card"
    >
      <div className="profile_card_container">
        <div className="profile_card_section">
          <div className="profile_card_section_name">

            <Icon
              style={{ fontSize: 35 }}
              component={handleOsIcons(profile.os)}
            />
            <div style={{ paddingLeft: 5 }}>{profile.name}</div>

          </div>
        </div>
        <div className="profile_card_section">
          <div>Session</div>
          <div>
            {profile.disable ? (
              <Tag color="#ef5350">Disabled</Tag>
            ) : (
              <Tag color={profile.connected ? 'green' : '#ababab'}>
                {profile.connected ? 'Connected' : 'Disconnected'}
              </Tag>
            )}
          </div>
        </div>
        <div className="profile_card_section">
          <div>Billing</div>
          <div>
            <Tag color="#42a5f5">{profile.subscription.name}</Tag>
          </div>
        </div>
        <div className="profile_card_section">
          <div>{profile.server.name}</div>
          <div style={{ width: 100 }}>
            <Progress
              width={50}
              type="line"
              percent={profile.server.load.mbits}
              format={percent => `${percent} Mb/s`}
            />
          </div>
        </div>
        <div className="profile_card_section">
          <div>Used</div>
          <div>
            <Tag color="#42a5f5">{profile.online}</Tag>
          </div>
        </div>
        <div onClick={e => e.stopPropagation()}>
          <Dropdown overlay={menu} trigger={['click']}>
            <Button style={{ marginLeft: 8, width: 120 }}>
              Actions
              {' '}
              <Icon type="down" />
            </Button>
          </Dropdown>
        </div>
      </div>
      {profile.tags.length > 0 ? (
        <div className="profile_card_section_tags">
          <ProfileCardTags tags={profile.tags} />
        </div>
      ) : null }

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
  onSetup: (profile) => {
    dispatch(onSetupVpn(profile));
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(VpnCard);
