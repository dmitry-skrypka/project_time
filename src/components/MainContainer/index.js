import React from 'react';
import { Layout, Row } from 'antd';
import { Route, Router, Switch } from 'react-router-dom';
import NavBar from '../Header';
import IpSection from '../IpSection';
import history from '../../config/history';
import ProfilesContainer from '../Profiles';
import CreateNewVPN from '../Profiles/CreateNewVPN';
import CreateNewPROXY from '../Profiles/CreateNewPROXY';
import ViewProfileBlock from '../Profiles/ViewProfileBlock';
import './styles.css';

const { Header, Footer, Content } = Layout;

class MainContainer extends React.Component {
  render() {
    return (
      <>
        <Layout className="main-container">
          <div className="header-wrapper">
            <Header className="layout-Header header">
              <Row type="flex" justify="space-between">
                <IpSection />
                <NavBar />
              </Row>
            </Header>
          </div>
          <Content>
            <Router history={history}>
              <Switch>
                <Route exact path="/" render={() => <ProfilesContainer />} />
                <Route path="/create" render={() => <CreateNewVPN />} />
                <Route path="/create_proxy" render={() => <CreateNewPROXY />} />
                <Route path="/:id/view" render={() => <ViewProfileBlock />} />
                <Route path="/:id/setup" render={() => <CreateNewVPN />} />
              </Switch>
            </Router>
          </Content>
          <Footer style={{ position: 'fixed', width: '100%', bottom: 0 }}>
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
