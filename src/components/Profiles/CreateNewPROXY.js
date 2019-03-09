import React from 'react';
import './styles.css';
import {
  Icon,
  Divider,
  Input,
  Steps,
  Select,
  message,
  Button,
  Form,
} from 'antd';

import { connect } from 'react-redux';
import {
  createProxy,
  proxyNameChange,
  proxyOsChange,
  proxySelectorChange,
} from '../../actions/profilesActions';

import { getServers, getSubscriptions } from '../../actions/userActions';

const { Option } = Select;
const { Step } = Steps;
const FormItem = Form.Item;

class CreateNewPROXY extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      steps: 2,
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
    const { name } = this.props.proxy;
    const current = this.state.current + 1;

    if (name.length < 2) {
      this.setState({ error: 'error' });
    } else {
      this.setState({ current, error: '' });
    }
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleInputFocus = () => {
    this.setState({ error: '' });
  };

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

  handleSelectorChange = (value, selectorName) => {
    const { name } = selectorName.props;

    const { onSelectorChange } = this.props;
    onSelectorChange({ [name]: value });
  };

  handleSubmit = () => {
    const { onSubmitProfile } = this.props;
    onSubmitProfile();
  };

  handleStepsContent = (current) => {
    const { name, subscription, server } = this.props.proxy;
    const { error } = this.state;
    const { subscriptions } = this.props.user;
    const { servers } = this.props.user;
    const actualServers = servers.slice(0, 3);

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
                      help={
                        error
                          ? 'Your profile name must consist of at least 2 characters'
                          : null
                      }
                    >
                      <Input
                        style={{ width: 200 }}
                        value={name}
                        onChange={this.handleNameChange}
                        placeholder="Name"
                        onFocus={this.handleInputFocus}
                      />
                    </FormItem>
                  </Form>
                </div>
                <div className="create_profile_tab_content_section">
                  <div> Subscription</div>
                  <Select
                    defaultValue={subscription}
                    style={{ width: 200 }}
                    placeholder="Create new profile"
                    onChange={(e, name) => this.handleSelectorChange(e, name)}
                  >
                    {subscriptions.map(subs => (
                      <Option
                        key={subs.name}
                        name="subscription"
                        value={subs.name}
                      >
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
                <div>
                  {' '}
                  Select the server that you prefer and create profile.
                </div>
              </div>
              <div className="create_profile_tab_content_section_protocol">
                <div className="create_profile_selectors_wrapper">
                  <div className="create_profile_selector_wrapper">
                    <div>PROXY</div>
                    <div style={{ width: 300 }}>
                      <span>
                        <span className="bold">Socket Secure (SOCKS)</span>
                        {' '}
is
                        an Internet protocol that exchanges network packets
                        between a client and server through a proxy server.
                        {' '}
                        <span className="bold">SOCKS5</span>
                        {' '}
additionally
                        provides authentication so only authorized users may
                        access a server.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="create_profile_servers">
                  Recommended servers:
                  <div className="create_profile_servers_wrapper">
                    <div className="create_profile_servers_list">
                      {actualServers.map(serv => (
                        <Button
                          key={serv.name}
                          type={server === serv.name ? 'primary' : null}
                          value={serv.name}
                          name="server"
                          onClick={this.handleOsChange}
                        >
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
                      <span>
                        * You can select any server after creating a profile.
                      </span>
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
  };

  render() {
    const { current, steps } = this.state;
    return (
      <div className="profiles_container">
        <div className="create_profile_header">Create new proxy profile</div>
        <Divider />
        <div className="create_profile_tabs_container">
          <div>
            <Steps current={current}>
              <Step title="Name" />
              <Step title="Connect" />
            </Steps>
            <div className="steps-content">
              {this.handleStepsContent(current)}
            </div>
            <div className="steps-action">
              {current < steps - 1 && (
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => this.next()}
                >
                  Next
                </Button>
              )}
              {current === steps - 1 && (
                <Button type="primary" onClick={() => this.handleSubmit()}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  Previous
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onNameChange: (name) => {
    dispatch(proxyNameChange(name));
  },
  onSelectorChange: (value) => {
    dispatch(proxySelectorChange(value));
  },
  onOsChange: (os) => {
    dispatch(proxyOsChange(os));
  },
  getSubscriptionList: () => {
    dispatch(getSubscriptions());
  },
  getServerList: () => {
    dispatch(getServers());
  },
  onSubmitProfile: () => {
    dispatch(createProxy());
  },
});
const mapStateToProps = state => ({
  proxy: state.proxy,
  user: state.user,
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewPROXY);
