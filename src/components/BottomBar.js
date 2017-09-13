import React from 'react';
import { connect } from 'react-redux';
import { ToastAndroid } from 'react-native';
import { NavigationActions } from 'react-navigation';
import BottomToolbar from 'react-native-bottom-toolbar';

class BottomBar extends React.Component {
  nextLanguage = () => {
    var lang = '';

    if (this.props.language === 'is') {
      this.props.changeLanguage('on');
      lang = 'Fornnorræna / Old Norse';
    } else if (this.props.language === 'on') {
      this.props.changeLanguage('en');
      lang = 'Enska / English';
    } else if (this.props.language === 'en') {
      this.props.changeLanguage('is');
      lang = 'Íslenska / Icelandic';
    }

    ToastAndroid.show(lang, ToastAndroid.SHORT);
  };

  render() {
    return (
      <BottomToolbar color={'lightgray'} size={40}>
        <BottomToolbar.Action
          title="Change Font Size"
          font="material"
          iconName="format-size"
          onPress={this.props.changeFontSize}
        />
        <BottomToolbar.Action
          title="Change Language"
          font="material"
          iconName="translate"
          onPress={this.nextLanguage}
        />
        <BottomToolbar.Action
          title="Fullscreen"
          font="material"
          iconName="fullscreen"
          onPress={this.props.toggleFullscreen}
        />
      </BottomToolbar>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeLanguage: itemValue =>
    dispatch(NavigationActions.navigate({ type: 'CHANGE_LANGUAGE', value: itemValue })),
  toggleFullscreen: itemValue =>
    dispatch(NavigationActions.navigate({ type: 'TOGGLE_FULLSCREEN' })),
  changeFontSize: itemValue =>
    dispatch(NavigationActions.navigate({ type: 'CHANGE_FONT_SIZE' })),
});

const mapStateToProps = (state, ownProps) => ({
  selectedChapter: state.chapters.selectedChapter,
  chaptersReadList: state.chapters.chaptersReadList,
  language: state.settings.language,
});

export default connect(mapStateToProps, mapDispatchToProps)(BottomBar);
