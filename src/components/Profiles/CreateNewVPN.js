import React from 'react';
import './styles.css';
import {
  Icon, Divider, Input, Steps, Select, message, Button, Form,
} from 'antd';

import { connect } from 'react-redux';
import {
  createVpn, vpnNameChange, vpnOsChange, vpnSelectorChange,
} from '../../actions/profilesActions';
import handleOsIcons from '../../helpers/osIcon';
import { getServers, getSubscriptions } from '../../actions/userActions';

const PORT_DESCRIPTION = {
  8080: <span>
    <span className="bold">8080</span>
    {' '}
    port through the
    {' '}
    <span className="bold">TCP</span>
    {' '}
    protocol without TLS and with
    <span className="bold"> authorization</span>
. Works well for mikrotik and other routers.
        </span>,

  433: <span>
    <span className="bold">433</span>
    {' '}
port through the
    {' '}
    <span className="bold"> SSL </span>
    {' '}
protocol, looks like
    {' '}
    <span className="bold"> HTTPS </span>
    {' '}
traffic and excellent speed, but not some providers support.
       </span>,
  80: <span>
    <span className="bold">80</span>
    {' '}
port through the
    {' '}
    <span className="bold">TCP</span>
    {' '}
protocol, looks like
    {' '}
    <span className="bold">HTTP</span>
    {' '}
traffic, excellent for unlocking the Internet at airports and any Wi-Fi hotspots.
      </span>,
  53: <span>
    {' '}
    <span className="bold"> 53 </span>
port through the
    {' '}
    <span className="bold">UDP</span>
    {' '}
protocol, looks like
    {' '}
    <span className="bold">DNS</span>
    {' '}
traffic and excellent speed, but not some providers support.
      </span>,
};


const { Option } = Select;
const { Step } = Steps;
const FormItem = Form.Item;

const OS = [{
  value: 'win',
  description: 'Windows',
}, {
  value: 'mac',
  description: 'Mac OS',
}, {
  value: 'ios',
  description: 'iPhone/iPad',
}, {
  value: 'android',
  description: 'Android',
}, {
  value: 'linux',
  description: 'Linux',
}, {
  value: 'win_phone',
  description: 'Windows phone',
}, {
  value: 'routers',
  description: 'Routers',
}];
class CreateNewVPN extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: 3,
      error: '',
    };
    this.handleOsChange = this.handleOsChange.bind(this);
  }

  componentDidMount() {
    const { getSubscriptionList, getServerList } = this.props;
    getSubscriptionList();
    getServerList();
  }

  next() {
    const {
      name,
    } = this.props.vpn;
    const current = this.state.current + 1;
    console.log(name.length);
    if (name.length < 2) {
      this.setState({ error: 'error' });
    } else { this.setState({ current, error: '' }); }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleInputFocus = () => {
    this.setState({ error: '' });
  }

     handleNameChange = (e) => {
       const { onNameChange } = this.props;
       const name = e.target.value;
       onNameChange({ name });
     };


     handleOsChange(e) {
       e.preventDefault();
       const { onOsChange } = this.props;
       onOsChange({ [e.target.name]: e.target.value });
     }

    handleSelectorChange =(value, selectorName) => {
      const { name } = selectorName.props;

      const { onSelectorChange } = this.props;
      onSelectorChange({ [name]: value });
    }

    handleSubmit = () => {
      const { onSubmitProfile } = this.props;
      onSubmitProfile();
    }

    handleStepsContent = (current) => {
      const {
        name, subscription, os, client, proto, port, server,
      } = this.props.vpn;
      const { error } = this.state;
      const { subscriptions } = this.props.user;
      const { servers } = this.props.user;
      const actualServers = servers.slice(0, 3);
      // const formItemLayout = {
      //   labelCol: {
      //     xs: { span: 24 },
      //     sm: { span: 5 },
      //   },
      //   wrapperCol: {
      //     xs: { span: 24 },
      //     sm: { span: 12 },
      //   },
      // };
      switch (current) {
        case 0:
          return (
            <>
              <div className="create_profile_tab1_container">
                <div className="create_profile_tab_content_section_wrapper">
                  <div className="create_profile_tab_content_section">

                    <div> Name</div>
                    <Form>
                      <FormItem
                        validateStatus={error}
                        help={error ? 'Your profile name must consist of at least 2 characters' : null}
                      >
                        <Input style={{ width: 200 }} value={name} onChange={this.handleNameChange} placeholder="Name" onFocus={this.handleInputFocus} />
                      </FormItem>
                    </Form>
                  </div>
                  <div className="create_profile_tab_content_section">
                    <div> Subscription</div>
                    <Select
                      defaultValue={1110}
                      style={{ width: 200 }}
                      // placeholder="Create new profile"
                      onChange={(e, name) => this.handleSelectorChange(e, name)}
                    >
                      {subscriptions.map(subs => (
                        <Option key={subs.id} name="subscription" value={subs.id}>

                          {subs.name}
                          {' '}
[
                          {subs.remaining}
                          {' '}
remaining]
                        </Option>
                      ))}

                    </Select>
                  </div>

                </div>
              </div>
            </>
          );
        case 1:
          return (
            <>
              <div className="create_profile_tab1_container">
                <div className="create_profile_tab_content_section">
                  <div className="create_profile_tab_description">
                    <div> Choose your operations system and press "Next"</div>
                  </div>
                </div>
                <div className="create_profile_tab_content_section_os">
                  <div className="create_profile_buttonOs_wrapper">
                    {OS.map(o => (
                      <Button
                        htmlType="button"
                        className="create_profile_buttonOs"
                        name="os"
                        key={o.description}
                        type={os === o.value ? 'primary' : null}
                        value={o.value}
                        onClick={this.handleOsChange}
                      >
                        <span className="create_profile_os_icon_wrapper">
                          <Icon
                            style={{ fontSize: 20 }}
                            component={handleOsIcons(o.value)}
                          />
                          <span className="create_profile_os_icon_description">{o.description}</span>
                        </span>
                      </Button>
                    ))}
                  </div>
                  <div className="create_profile_selectedOs">
                            OS Selected:
                    {' '}
                    {os}
                  </div>
                </div>

              </div>
            </>
          );
        case 2:

          return (
            <>
              <div className="create_profile_tab1_container">
                <div className="create_profile_tab_content_section">
                  <div> Select the protocol that you prefer and create profile.</div>
                </div>
                <div className="create_profile_tab_content_section_protocol">
                  <div className="create_profile_selectors_wrapper">
                    <div className="create_profile_selector_wrapper">
                      <div>Protocol</div>
                      <Select
                        defaultValue={proto}
                        style={{ width: 200 }}

                        onChange={(e, name) => this.handleSelectorChange(e, name)}
                      >
                        <Option name="proto" value="ovpn">OpenVPN</Option>
                        <Option name="proto" value="ikev">IKEv2</Option>
                        <Option name="proto" value="l2tp">L2TP</Option>
                        <Option name="proto" value="pptp">PPTP</Option>
                      </Select>
                    </div>
                    {proto === 'ovpn' && (
                      <>
                        <div className="create_profile_selector_wrapper">
                          <div>Client</div>
                          <Select
                            defaultValue={client}
                            style={{ width: 200 }}

                            onChange={(e, name) => this.handleSelectorChange(e, name)}
                          >
                            <Option name="client" value="ovpn">OpenVPN 2.3.4</Option>
                            <Option name="client" value="blick">TunnelBlick</Option>
                          </Select>
                        </div>

                        <div className="create_profile_selector_wrapper">
                          <div>Port</div>
                          <Select
                            defaultValue={port}
                            style={{ width: 200 }}
                            placeholder="Port"
                            onChange={(e, name) => this.handleSelectorChange(e, name)}
                          >
                            <Option name="port" value="8080">8080 TCP</Option>
                            <Option name="port" value="433">433 TCP</Option>
                            <Option name="port" value="80">80 TCP</Option>
                            <Option name="port" value="53">53 UDP</Option>
                          </Select>
                        </div>
                        <div className="create_profile_port_description">{PORT_DESCRIPTION[port]}</div>
                      </>
                    ) }
                    {proto !== 'ovpn' ? <div className="create_profile_port_description">Protocol descr</div> : null }
                  </div>
                  <div className="create_profile_servers">
                      Recommended servers:
                    <div className="create_profile_servers_wrapper">
                      <div className="create_profile_servers_list">
                        {actualServers.map(serv => (
                          <Button key={serv.name} type={server === serv.id.toString() ? 'primary' : null} value={serv.id} name="server" onClick={this.handleOsChange}>
                            <span>
                              {' '}
                              <span>{serv.name}</span>
                              {' '}
                              <span>
                                {' '}
                                {serv.ping}
                              </span>
                            </span>
                            {' '}
                          </Button>

                        ))}
                      </div>
                      <div className="create_profile_servers_caption">
                        <span>* You can select any server after creating a profile.</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </>
          );
        default:
          return <div> NO data</div>;
      }
    }

    render() {
      const { current, steps } = this.state;
      return (
        <div className="profiles_container">
          <div className="create_profile_header">
              Create new VPN profile
          </div>
          <Divider />
          <div className="create_profile_tabs_container">
            <div>
              <Steps current={current}>
                <Step title="Name" />
                <Step title="Operation system " />
                <Step title="Connect" />
              </Steps>
              <div className="steps-content">{this.handleStepsContent(current)}</div>
              <div className="steps-action">
                {
                          current < steps - 1
                          && <Button type="primary" htmlType="submit" onClick={() => (this.next())}>Next</Button>
                      }
                {
                          current === steps - 1
                          && <Button type="primary" onClick={() => this.handleSubmit()}>Done</Button>
                      }
                {
                          current > 0
                          && (
                          <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                  Previous
                          </Button>
                          )
                      }
              </div>
            </div>
          </div>

        </div>
      );
    }
}


const mapDispatchToProps = dispatch => ({
  onNameChange: (name) => {
    dispatch(vpnNameChange(name));
  },
  onSelectorChange: (value) => {
    dispatch(vpnSelectorChange(value));
  },
  onOsChange: (os) => {
    dispatch(vpnOsChange(os));
  },
  getSubscriptionList: () => {
    dispatch(getSubscriptions());
  },
  getServerList: () => {
    dispatch(getServers());
  },
  onSubmitProfile: () => {
    dispatch(createVpn());
  },
});
const mapStateToProps = state => ({
  vpn: state.vpn,
  user: state.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateNewVPN);
