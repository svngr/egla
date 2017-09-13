import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  BackHandler,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import HeaderView from './components/HeaderView';
import ChaptersList from './components/ChaptersList';
import ChapterText from './components/ChapterText';
import BottomBar from './components/BottomBar';
import MarkButton from './components/MarkButton';

class App extends Component {
  static navigationOptions = { title: 'Egils saga', header: null }; // null to hide header

  componentWillMount() {
    this.props.stopFullscreen(); // never start app in fullscreen
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    if (!this.props.fullscreen) {
      return false;
    }

    this.props.stopFullscreen();

    return true;
  };

  scrollToTop = () => {
    this.scrollViewRef.scrollTo({ animated: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={this.props.fullscreen}
          backgroundColor="#fafafa"
          barStyle="dark-content"
        />
        <ScrollView
          style={styles.scrollViewContainer}
          contentContainerStyle={styles.content}
          ref={ref => {
            this.scrollViewRef = ref;
          }}
        >
          <HeaderView />
          <ChaptersList />
          <ChapterText />
          <MarkButton scrollToTopFunc={this.scrollToTop} />
        </ScrollView>
        {!this.props.fullscreen && <BottomBar />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 0,
  },
  content: {
    padding: 0,
    paddingBottom: 40,
    alignItems: 'center',
  },
});

const mapDispatchToProps = dispatch => ({
  stopFullscreen: itemValue =>
    dispatch(NavigationActions.navigate({ type: 'STOP_FULLSCREEN' })),
});

const mapStateToProps = (state, ownProps) => ({
  fullscreen: state.settings.fullscreen,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
