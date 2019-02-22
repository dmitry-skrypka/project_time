import React from 'react';
import './styles.css';
import CreateBlock from './CreateBlock';

class ProfilesContainer extends React.Component {
  render() {
    return (
      <div className="profiles_container">
        <CreateBlock />
      </div>
    );
  }
}
export default ProfilesContainer;
