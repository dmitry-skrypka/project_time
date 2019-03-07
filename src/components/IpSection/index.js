import React from 'react';


import { connect } from 'react-redux';
import { vpnNameChange, vpnOsChange, vpnSubscriptionChange } from '../../actions/profilesActions';
import { getUserIP } from '../../actions/userActions';
import './styles.css';
import { Popover } from 'antd';
import delve from 'dlv';

class IpSection extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    const { onGetIp } = this.props;
    onGetIp();
  }

  popoverContent() {
    const { data } = this.props.user;
    console.log(data);
    return (
      <div className="popover_container">
        <div className="popover_content_wrapper">
          <div className="popover_caption">
            <span>Country:</span>
            {' '}
            <span style={{ fontWeight: 600 }}>

              {delve(data.city, 'country_name', '')}
,
              {' '}
              {delve(data.city, 'city', '')}

            </span>
          </div>
          <div className="popover_caption">
            <span>ISP:</span>
            {' '}
            <span>{delve(data.isp, 'isp', '')}</span>
          </div>
          <div className="popover_caption">
            <span>Organisation:</span>
            {' '}
            <span>{delve(data.isp, 'organization', '')}</span>
          </div>

          <div className="popover_caption_condition">
            {data.protected ? <span style={{ color: '#ef5350' }}>Protected</span> : <span style={{ color: '#ef5350' }}>To hide your IP address, you need connect to one of the servers.</span>}

          </div>
        </div>
        {' '}

      </div>
    );
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
          <Popover content={this.popoverContent()}>
            <div className="section_status">
              Your Status:
              {' '}
              <span className={data.protected ? 'Protected' : 'Unprotected'}>
                {data.protected ? 'Protected' : 'Unprotected' }
              </span>


            </div>
          </Popover>

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
