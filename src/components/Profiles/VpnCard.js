import React from 'react';
import { Icon, Select } from 'antd';
import history from '../../config/history';
import handleOsIcons from '../../helpers/osIcon';

function VpnCard(props) {
  const Option = Select.Option;

  function handleChange(value) {
    console.log(`selected ${value}`);
    history.push('/create');
  }

  const { profile, connected } = props;
  return (
    <div className="profile_card_container">
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
      <div>
        <Select
          style={{ width: 200 }}
          placeholder="Actions"
          onChange={handleChange}
        >
          <Option value="activity">Activity</Option>
          <Option value="services">Services</Option>
          <Option value="connect">Connect</Option>
          <Option value="setup">Setup</Option>
          <Option value="delete">Delete</Option>
        </Select>
      </div>
    </div>

  );
}

export default VpnCard;
