import React from 'react';
import { Layout, Row } from 'antd';
import { Route, Router, Switch } from 'react-router-dom';
import NavBar from '../Header';
import IpSection from '../IpSection';
import history from '../../config/history';
import ProfilesContainer from '../Profiles';
import CreateNewVPN from '../Profiles/CreateNewVPN';

const { Header, Footer, Content } = Layout;

class MainContainer extends React.Component {
  render() {
    return (
      <>
        <Layout className="main-container">
          <Header className="layout-Header">
            <Row type="flex" justify="center">
              <IpSection />
              <NavBar />
            </Row>
          </Header>

          <Content>
            <Router history={history}>
              <Switch>
                <Route exact path="/" render={() => <ProfilesContainer />} />
                <Route path="/create" render={() => <CreateNewVPN />} />
              </Switch>
            </Router>
          </Content>
          <Footer style={{ position: 'absolute', width: '100%', bottom: 0 }}>
            <span>timeVPN</span>
            {' '}
© 2018-19
          </Footer>
        </Layout>
      </>
    );
  }
}
export default MainContainer;
