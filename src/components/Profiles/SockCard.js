import React from 'react';

function SockCard(props) {
  console.log(props);
  return (
    <div className="profile_card_container">
      <div>LOGO</div>
      <div>{props.profile.name}</div>
      <div className="profile_card_section">
        <div>Proxy</div>
        <div>{props.profile.connected ? 'Connected' : 'Disconnected'}</div>
      </div>
      <div className="profile_card_section">
        <div>Billing</div>
        <div>{props.profile.subscription.name}</div>
      </div>
      <div className="profile_card_section">
        <div>{props.profile.server.name}</div>
        <div>
          {props.profile.server.load.mbits}
          {' '}
                Mb/s
        </div>
      </div>

      <div>DROPDOWN</div>
    </div>
  );
}

export default SockCard;
