import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import App from './App';

export const AppNavigator = StackNavigator({
    App: { screen: App },
  },{
    headerMode: 'screen'
  }
);

class AppWithNavigationState extends React.Component {
  render() {
    const { dispatch, nav } = this.props;
    return (
      <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
    );
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
