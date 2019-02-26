import React from 'react';
import {
  Select, Card, Icon, Tabs,
} from 'antd';

import { connect } from 'react-redux';
import history from '../../config/history';
import VpnCard from './VpnCard';
import SockCard from './SockCard';
import { getProfiles } from '../../actions/userActions';

const { TabPane } = Tabs;

const ShieldSvg = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="shield-alt"
    className="svg-inline--fa fa-shield-alt fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width="1em"
    height="1em"
  >
    <path
      fill="currentColor"
      d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
    />
  </svg>
);
const Title = () => (
  <div className="create_block_create_new">
    <div style={{ padding: 10 }}>
      <ShieldIcon style={{ fontSize: '32px' }} />
    </div>
    <div className="create_block_content">
      Create new profile and connect pc, laptop, phone and router
      {' '}
      <span className="create_block_description">
        Unlimited number of profiles without charging
      </span>
    </div>
  </div>
);
const ShieldIcon = props => <Icon component={ShieldSvg} {...props} />;

function More() {
  const { Option } = Select;

  function handleChange(value) {
    console.log(value);
    switch (value) {
      case 'vpn':
        history.push('/create');
        break;
      case 'sock':
      case 'shadowsock':
        history.push('/create_proxy');
        break;
      default:
        history.push('/create_proxy');
    }
  }

  return (
    <div>
      <Select
        style={{ width: 200 }}
        placeholder="Create new profile"
        onChange={handleChange}
      >
        <Option value="vpn">Virtual Private Network</Option>
        <Option value="sock">SOKS5 proxy</Option>
        <Option value="shadowsock">Shadowsocks</Option>
      </Select>
    </div>
  );
}

class CreateBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { onGetPropfiles } = this.props;
    onGetPropfiles();
  }

  render() {
    const {
      profiles, proxies, shadowsocks,
    } = this.props.profiles;
    return (
      <Card
        style={{ width: '100%', margin: 10 }}
        title={<Title />}
        extra={<More />}
      >
        <Tabs>
          <TabPane tab="Virtual Private Networks" key="1">
            {profiles.length
              ? profiles.map(profile => <VpnCard key={profile.name} profile={profile} />)
              : ' You do not have a VPN profiles. Create a new VPN profile.'}
          </TabPane>
          <TabPane tab="Proxies" key="2">
            {proxies.length
              ? proxies.map(proxy => <SockCard profile={proxy} />)
              : ' You do not have a VPN profiles. Create a new VPN profile.'}
          </TabPane>
          <TabPane tab="Shadowsocks" key="3">
            {shadowsocks.length
              ? shadowsocks.map(profile => <SockCard profile={profile} />)
              : ' You do not have a VPN profiles. Create a new VPN profile.'}
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onGetPropfiles: () => {
    dispatch(getProfiles());
  },

});
const mapStateToProps = state => ({
  profiles: state.profiles,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateBlock);

CreateBlock.defaultProps = {
  profiles: {
    proxies: [
      {
        id: 2735,
        username: '01582_tewefrw',
        password: 'fJffNUd',
        port: 1080,
        protocol: 'SOCKS5',
        connected: false,
        name: 'Tewefrw',
        disable: false,
        subscription: {
          expires: '2019-03-23',
          name: 'Free trial',
        },
        proto: 'socks5',
        online: '0.0',
        tags: [],
        server: {
          country: 'Germany',
          name: 'DevDe',
          code: 'de',
          ip: '37.1.197.69',
          hostname: 'de.devtime.pw',
          load: {
            percent: 0,
            mbits: 0,
          },
        },
      },
      {
        id: 2736,
        username: '01583_fffddf',
        password: 'E4VxQqC',
        port: 0,
        protocol: 'Shadowsocks',
        connected: false,
        name: 'fffddf',
        disable: false,
        subscription: {
          expires: '2019-03-23',
          name: 'Free trial',
        },
        proto: 'shadowsocks',
        tags: [],
        server: {
          ip: '37.1.197.69',
          hostname: 'de.devtime.pw',
          name: 'DevDe',
          code: 'de',
          load: {
            percent: 0,
            mbits: 0,
          },
        },
      },
    ],
    profiles: [
      {
        id: 2734,
        username: '01581_My PC',
        os: 'win',
        password: 'B5wGfPn',
        port: 80,
        protocol: 'OpenVPN',
        connected: false,
        name: 'My PC',
        disable: false,
        client: 'ovpn',
        subscription: {
          expires: '2019-03-23',
          name: 'Free trial',
        },
        proto: 'ovpn',
        online: '0.0',
        tags: [],
        server: {
          country: 'USA',
          name: 'Chicago',
          code: 'us',
          ip: '37.1.210.145',
          hostname: 'us.timevpn.com',
          load: {
            percent: 0,
            mbits: 0,
          },
        },
      },
    ],
    shadowsocks: [],
  },

};
