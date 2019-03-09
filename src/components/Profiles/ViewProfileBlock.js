import React from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Row,
  Tabs,
  Col,
  Button,
  Switch,
  Icon,
  Table,
  Tag,
  Typography,
} from 'antd';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import Tags from './Tags';

import {
  getProfileInfo,
  onDownload,
  onProfileDelete,
  onSetupVpn,
  setTabProfileView,
} from '../../actions/profilesActions';
import history from '../../config/history';
import {
  MaskSvg,
  ShieldSvg,
  SecretSvg,
  GlobeSvg,
} from '../../assets/svg/icons';

const { Text } = Typography;
const GlobeIcon = props => <Icon component={GlobeSvg} {...props} />;

const ShieldIcon = props => <Icon component={ShieldSvg} {...props} />;
const SecretIcon = props => <Icon component={MaskSvg} {...props} />;

const { TabPane } = Tabs;

class ViewProfileBlock extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { selectedProfileID } = this.props.profiles;
    const { getProfile } = this.props;
    getProfile(selectedProfileID);
  }

  viewExtra() {
    const { onDelete, onSetup } = this.props;
    const { selectedProfileID, selectedProfile } = this.props.profiles;
    const profile = {
      name: selectedProfile.username,
      os: selectedProfile.os,
      subscription: '1110',
      client: selectedProfile.client_soft,
      proto: selectedProfile.proto,
      port: selectedProfile.port,
    };
    function handleChange(value) {
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
    function onChange(checked) {
      console.log(`switch to ${checked}`);
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          size="small"
          type="primary"
          onClick={() => {
            onSetup(profile);
            history.push(`/${selectedProfileID}/setup`);
          }}
        >
          {' '}
          Setup new configuration
        </Button>
        <Button
          style={{
            marginRight: 20,
            marginLeft: 7,
          }}
          size="small"
          type="danger"
          onClick={() => onDelete(selectedProfileID)}
        >
          Delete
        </Button>
        <div>
          {' '}
          <Switch defaultChecked onChange={onChange} />
          {' '}
Disable
        </div>
      </div>
    );
  }

  // e[Object.keys(e)[0]]
  onTabChangeHandler = (activeKey) => {
    const { selectedProfileID } = this.props.profiles;
    const { onTabChange } = this.props;
    onTabChange({ tab: activeKey, selectedProfileID });
  };

  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
  };

  onDownloadClick = () => {
    const { selectedProfileID } = this.props.profiles;
    const { getConfigDownload } = this.props;

    getConfigDownload(selectedProfileID);
  };

  renderIpTableColumns = () => {
    const { selectedProfile } = this.props.profiles;

    return [
      {
        title: 'Ip Address',
        dataIndex: 'ip',
        key: 'ip',
        sorter: (a, b) => a.ip
          .split('.')
          .slice(0, 3)
          .join('')
          - b.ip
            .split('.')
            .slice(0, 3)
            .join(''),
        sortDirections: ['descend', 'ascend'],
        render: a => (
          <span
            style={{
              fontWeight: a === selectedProfile.switch_ips.switch ? 900 : 400,
            }}
          >
            {a}
          </span>
        ),
      },
      {
        title: 'Cost',
        // dataIndex: 'age',
        key: 'cost',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
        render: a => (
          <Tag color="green" style={{ fontWeight: 600 }}>
            Free
          </Tag>
        ),
      },
      {
        title: 'Status',
        key: 'status',
        // dataIndex: 'address',
        sorter: (a, b) => a.ip === selectedProfile.switch_ips.switch,
        sortDirections: ['descend', 'ascend'],
        render: a => (
          <Tag
            color={
              a.ip === selectedProfile.switch_ips.switch ? 'green' : 'blue'
            }
            style={{ fontWeight: 600 }}
          >
            {a.ip === selectedProfile.switch_ips.switch ? 'Active' : 'Public'}
          </Tag>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: a => (
          <Button htmlType="button" onClick={() => console.log(a)}>
            <Icon style={{ color: 'blue' }} type="swap" />
          </Button>
        ),
      },
    ];
  };

  renderPortTableColumns = () => {
    const { selectedProfile } = this.props.profiles;

    return [
      {
        title: 'Local Port',
        key: 'Local Port',
      },
      {
        title: 'Remote Port',
        // dataIndex: 'age',
        key: 'Remote Port',
      },
      {
        title: 'Protocol',
        key: 'Protocol',
        // dataIndex: 'address',
      },
      {
        title: 'Status',
        key: 'PortStatus',
      },
      {
        title: 'Actions',
        key: 'PortActions',
      },
    ];
  };

  render() {
    const {
      selectedProfile,
      selectedTab,
      selectedProfileID,
    } = this.props.profiles;
    console.log(this.props);

    const data = {
      labels: selectedProfile.histories.map(e => moment(Object.keys(e)[0]).format('MMM DD')),
      datasets: [
        {
          label: 'Last 30 days',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: selectedProfile.histories.map(e => Math.floor(Math.random() * Math.floor(24))),
          // e[Object.values(e)[0]]
        },
      ],
    };

    const IpData = selectedProfile.switch_ips.ips;
    return (
      <Card style={{ margin: '10px auto', maxWidth: 1000 }}>
        <div>
          <Row>
            <Col span={8}>
              <div className="profile_name">
                {' '}
                {selectedProfile.username}
              </div>
            </Col>
            <Col span={8} offset={8}>
              <div className="profile_tag_container">
                <Tags />
              </div>
            </Col>
          </Row>
        </div>
        <Tabs
          tabBarExtraContent={this.viewExtra()}
          defaultActiveKey={selectedTab}
          activeKey={selectedTab}
          onChange={this.onTabChangeHandler}
        >
          <TabPane tab="Activity" key="1">
            <div className="view_profile_tab_container">
              <div className="view_profile_tab_content">
                <div className="view_profile_tab_content_row">
                  <Row className="view_profile_tab_content_panel">
                    <Col span={18}>
                      <div className="view_profile_tab_connect_wrapper">
                        <div
                          className="view_profile_tab_connect"
                          style={{
                            backgroundColor: selectedProfile.connect
                              ? '#ecfae8'
                              : '#fae9e8',
                          }}
                        >
                          <Icon
                            style={{ fontSize: '24px' }}
                            type={`${
                              selectedProfile.connect ? 'link' : 'disconnect'
                            }`}
                          />
                          <span style={{ fontSize: '24px', fontWeight: 600 }}>
                            {selectedProfile.connect
                              ? 'Connected'
                              : 'Disconnected'}
                          </span>
                        </div>
                        <div className="view_profile_tab_connect_icons_block">
                          <div className="view_profile_tab_connect_icon_wrapper">
                            <Icon type="eye" style={{ fontSize: '3em' }} />
                            <div className="view_profile_tab_connect_icon_caption">
                              <span>{selectedProfile.protocol}</span>
                            </div>
                          </div>
                          <div className="view_profile_tab_connect_icon_wrapper">
                            <Icon
                              style={{ fontSize: '24px' }}
                              type="arrow-right"
                            />
                          </div>
                          <div className="view_profile_tab_connect_icon_wrapper">
                            <ShieldIcon style={{ fontSize: '3em' }} />
                            <div className="view_profile_tab_connect_icon_caption">
                              <span>{selectedProfile.server.name}</span>
                            </div>
                          </div>
                          <div className="view_profile_tab_connect_icon_wrapper">
                            <Icon
                              style={{ fontSize: '24px' }}
                              type="arrow-right"
                            />
                          </div>
                          <div className="view_profile_tab_connect_icon_wrapper">
                            <Icon type="global" style={{ fontSize: '3em' }} />
                            <div className="view_profile_tab_connect_icon_caption">
                              <span>{selectedProfile.server.ip}</span>
                            </div>
                          </div>
                          <div className="view_profile_tab_connect_button_wrapper">
                            <Button
                              className="view_profile_tab_connect_button"
                              size="small"
                              icon="link"
                              onClick={() => this.onTabChangeHandler('3')}
                            >
                              Connect
                            </Button>
                            <Button
                              className="view_profile_tab_connect_button"
                              size="small"
                              icon="swap"
                            >
                              Change IP
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="view_profile_tab_connect_wrapper">
                        <div
                          className="view_profile_tab_connect"
                          style={{ backgroundColor: '#f8f9fa' }}
                        >
                          <span style={{ fontSize: '24px', fontWeight: 600 }}>
                            Overview
                          </span>
                        </div>
                        <div className="view_profile_tab_overview_container">
                          <div className="view_profile_tab_overview_caption">
                            Billing:
                            {' '}
                            <span className="view_profile_badge badge_blue">
                              {selectedProfile.online}
                            </span>
                          </div>
                          <div className="view_profile_tab_overview_caption">
                            Session:
                            {' '}
                            <span
                              className="view_profile_badge"
                              style={{
                                color: '#fff',
                                backgroundColor: selectedProfile.session
                                  ? 'green'
                                  : '#acacac',
                              }}
                            >
                              {selectedProfile.session
                                ? selectedProfile.session
                                : 'Disconnected'}
                            </span>
                          </div>
                          <div className="view_profile_tab_overview_caption">
                            Used last month:
                            {' '}
                            <span className="view_profile_badge badge_blue">
                              {selectedProfile.online}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <div className="chart_container">
                      <Bar
                        data={data}
                        width={100}
                        height={300}
                        options={{
                          maintainAspectRatio: false,
                          hover: {
                            mode: 'label',
                          },
                          tooltips: {
                            enabled: false,
                          },
                          scales: {
                            yAxes: [
                              {
                                ticks: {
                                  beginAtZero: true,
                                  stepSize: 2,
                                  min: 0,
                                  max: 24,
                                },
                              },
                            ],
                          },
                        }}
                      />
                    </div>
                  </Row>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Services" key="2">
            <div className="view_profile_tab_container">
              <div className="view_profile_tab_content">
                <div className="view_profile_tab_connect_wrapper">
                  <div
                    className="view_profile_tab_connect"
                    style={{ backgroundColor: '#fbfbfc' }}
                  >
                    <Icon style={{ fontSize: '24px' }} type="environment" />

                    <span style={{ fontSize: '24px', fontWeight: 600 }}>
                      IP Address
                    </span>
                    <span style={{ float: 'right' }}>
                      <Button
                        disabled
                        size="small"
                        style={{ cursor: 'not-allowed' }}
                        type="primary"
                        htmlType="button"
                      >
                        By IP
                      </Button>
                    </span>
                  </div>
                  <div className="view_profile_services_content">
                    <Row>
                      <Col span={18}>
                        <div className="view_profile_table_wrapper">
                          <Table
                            columns={this.renderIpTableColumns()}
                            dataSource={IpData}
                            // size="middle"
                            bordered
                            rowClassName="table_row"
                            locale={{ emptyText: 'No Data' }}
                          />
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="view_profile_table_action_container">
                          <div className="view_profile_table_action_switch">
                            <Switch
                              defaultChecked
                              onChange={() => console.log(selectedProfile.switch_ips.switch)
                              }
                            />
                            {' '}
                            Random IP for each connection
                          </div>
                          <div className="view_profile_services_caption">
                            You can change your IP on the fly without
                            disconnecting from the server or enable a random IP
                            address every time you connect.
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div
                    className="view_profile_tab_connect"
                    style={{ backgroundColor: '#fbfbfc' }}
                  >
                    <Icon style={{ fontSize: '24px' }} type="environment" />

                    <span style={{ fontSize: '24px', fontWeight: 600 }}>
                      PORT FORWARDING
                    </span>
                    <span style={{ float: 'right' }}>
                      <Button
                        // disabled
                        size="small"
                        // style={{ cursor: 'not-allowed' }}
                        type="primary"
                        htmlType="button"
                        onClick={() => console.log('ADD PORT')}
                      >
                        Add PORT
                      </Button>
                    </span>
                  </div>
                  <div className="view_profile_services_content">
                    <Row>
                      <Col span={18}>
                        <div className="view_profile_table_wrapper">
                          <Table
                            columns={this.renderPortTableColumns()}
                            // pagination={false}
                            // size="middle"
                            bordered
                            rowClassName="table_row"
                            locale={{ emptyText: 'No Data' }}
                          />
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="view_profile_table_action_container">
                          <div className="view_profile_services_caption">
                            Port forwarding allows remote computers (for
                            example, computers on the Internet) to connect to a
                            specific computer or service within a private
                            local-area network (LAN).
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Connect" key="3">
            <div className="view_profile_tab_container">
              <div className="view_profile_tab_content">
                <div className="view_profile_tab_connect_wrapper">
                  <div
                    className="view_profile_tab_connect"
                    style={{ backgroundColor: '#fbfbfc' }}
                  >
                    <Icon style={{ fontSize: '24px' }} type="environment" />

                    <span style={{ fontSize: '24px', fontWeight: 600 }}>
                      VPN Account information
                    </span>
                  </div>
                  <div>
                    <Row>
                      <Col span={12}>
                        <div className="view_actions_connect">
                          {selectedProfile.protocol === 'ovpn' ? (
                            <div className="swap_options_ovpn">
                              <div>
                                Download
                                <Button
                                  htmlType="button"
                                  type="primary"
                                  style={{ marginLeft: 15 }}
                                  onClick={this.onDownloadClick}
                                >
                                  <Icon type="download" />
                                  {' '}
OpenVPN config file
                                  and certificates
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="swap_options_ikev">
                              <div className="swap_options_ikev_captions">
                                <div className="swap_options_ikev_caption_section">
                                  <div className="code_config_caption">
                                    <span className="caption_title bold">
                                      Hostname
                                    </span>
                                  </div>
                                  <div className="code_config_caption taR">
                                    <Text copyable code>
                                      {selectedProfile.server.hostname}
                                    </Text>
                                  </div>
                                </div>
                                <div className="swap_options_ikev_caption_section">
                                  <div className="code_config_caption">
                                    <span className="caption_title bold">
                                      Username
                                    </span>
                                  </div>
                                  <div className="code_config_caption taR">
                                    <Text copyable code>
                                      {selectedProfile.username}
                                    </Text>
                                  </div>
                                </div>
                                <div className="swap_options_ikev_caption_section">
                                  <div className="code_config_caption">
                                    <span className="caption_title bold">
                                      Password
                                    </span>
                                  </div>
                                  <div className="code_config_caption taR">
                                    <Text copyable code>
                                      {selectedProfile.password}
                                    </Text>
                                  </div>
                                </div>
                                <div className="swap_options_ikev_caption_section">
                                  <div className="code_config_caption">
                                    <span className="caption_title bold">
                                      Remote ID
                                    </span>
                                  </div>
                                  <div className="code_config_caption taR">
                                    <Text copyable code>
                                      {selectedProfile.server.hostname}
                                    </Text>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Col>
                      <Col span={12}>
                        <div className="view_profile_tab_connect_captions">
                          <div className="view_profile_tab_connect_caption_section">
                            <span className="caption_title bold">OS:</span>
                            {' '}
                            <span className="caption_title">
                              {selectedProfile.os}
                            </span>
                          </div>
                          <div className="view_profile_tab_connect_caption_section">
                            <span className="caption_title bold">Server:</span>
                            {' '}
                            <span className="caption_title">
                              {selectedProfile.server.name}
                            </span>
                          </div>
                          <div className="view_profile_tab_connect_caption_section">
                            <span className="caption_title bold">
                              Protocol:
                            </span>
                            {' '}
                            {selectedProfile.protocol === 'ovpn' ? (
                              <span className="caption_title">
                                {selectedProfile.port === 53
                                  ? `${selectedProfile.protocol} UDP ${
                                    selectedProfile.port
                                  }`
                                  : `${selectedProfile.protocol} TCP ${
                                    selectedProfile.port
                                  }`}
                              </span>
                            ) : (
                              <span className="caption_title">
                                {selectedProfile.protocol}
                              </span>
                            )}
                          </div>
                          {selectedProfile.protocol === 'ovpn' ? (
                            <div className="view_profile_tab_connect_caption_section">
                              <span className="caption_title bold">
                                Client:
                              </span>
                              {' '}
                              <span className="caption_title">
                                {selectedProfile.client_soft}
                              </span>
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getProfile: (id) => {
    dispatch(getProfileInfo(id));
  },
  onTabChange: (tab) => {
    dispatch(setTabProfileView(tab));
  },
  onDelete: (id) => {
    dispatch(onProfileDelete(id));
  },
  onSetup: (profile) => {
    dispatch(onSetupVpn(profile));
  },
  getConfigDownload: (id) => {
    dispatch(onDownload(id));
  },
});
const mapStateToProps = state => ({
  profiles: state.profiles,
  user: state.user,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewProfileBlock);
