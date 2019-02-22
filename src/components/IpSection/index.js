import React from 'react';

import './styles.css';
import { connect } from 'react-redux';
import { vpnNameChange, vpnOsChange, vpnSubscriptionChange } from '../../actions/profilesActions';
import { getUserIP } from '../../actions/userActions';


class IpSection extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const { onGetIp } = this.props;
    onGetIp();
  }

  render() {
    const { data } = this.props.user;
    return (
      <div className="ip-section">

        <div className="section-item">
          <span className="logo_time">time</span>
          <span className="logo_VPN">VPN</span>
        </div>
        <div className="section-item">
          <div className="section_status">
Your IP:
            {data.ip}
          </div>
          <div className="section_status">
              Your Status:
            {' '}
            {data.protected ? 'Protected' : 'Unprotected' }


          </div>
        </div>

      </div>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  onGetIp: () => {
    dispatch(getUserIP());
  },

});
const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(IpSection);
