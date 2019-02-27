import React from 'react';
import { connect } from 'react-redux';
import {
  Card, Row, Tabs, Col, Select, Button, Switch,
} from 'antd';
import Tags from './Tags';
import {
  getProfileInfo,
} from '../../actions/profilesActions';
import history from '../../config/history';

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
    const { Option } = Select;

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
        <Button size="small" type="primary"> Setup new configuration</Button>
        <Button
          style={{
            marginRight: 20,
            marginLeft: 7,
          }}
          size="small"
          type="danger"
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

  render() {
    const { selectedProfile } = this.props.profiles;
    console.log(this.props);
    return (
      <Card
        style={{ width: '100%', margin: 10 }}
        extra={this.more}
      >
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
        <Tabs tabBarExtraContent={this.viewExtra()}>
          <TabPane tab="Activity" key="1">
            <div>dsdsdsdsd</div>
          </TabPane>
          <TabPane tab="Services" key="2">
            <div>sdsdsd</div>
          </TabPane>
          <TabPane tab="Connect" key="3">
            <div>sdsd</div>
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

});
const mapStateToProps = state => ({
  profiles: state.profiles,
  user: state.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileBlock);
