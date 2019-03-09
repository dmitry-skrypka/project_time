import React from 'react';

function SockCard(props) {
  return (
    <div className="profile_card_container">
      <div>WIN</div>
      <div>{props.profile.name}</div>
      <div className="profile_card_section">
        <div>Session</div>
        <div>{props.connected ? 'Connected' : 'Disconnected'}</div>
      </div>
      <div className="profile_card_section">
        <div>Billing</div>
        <div>Trial</div>
      </div>
      <div className="profile_card_section">
        <div>City</div>
        <div>Speed</div>
      </div>
      <div className="profile_card_section">
        <div>Used</div>
        <div>Status</div>
      </div>
      <div>DROPDOWN</div>
    </div>
  );
}

export default SockCard;
