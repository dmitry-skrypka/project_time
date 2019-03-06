import React from 'react';


import { connect } from 'react-redux';
import { vpnNameChange, vpnOsChange, vpnSubscriptionChange } from '../../actions/profilesActions';
import { getUserIP } from '../../actions/userActions';
import './styles.css';

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

        <div className="section-item section-item--logo">
          <span className="logo_time">time</span>
          <span className="logo_VPN">VPN</span>
        </div>
        <div className="section-item section-item--status">
          <div className="section_status">
                        Your IP:
              {' '}
            {data.ip}
          </div>
          <div className="section_status">
                        Your Status:
            {' '}
            <span className={data.protected ? 'Protected' : 'Unprotected'}>
              {data.protected ? 'Protected' : 'Unprotected' }
            </span>


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
