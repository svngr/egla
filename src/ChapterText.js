import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import egla from '../res/egla.json';

class ChapterText extends React.Component {
  render() {
    const currChapter = egla.chapters[parseInt(this.props.selectedChapter)-1];
    var currChapterText = "";

    if (this.props.language === "en")
      currChapterText = currChapter.en;
    else if (this.props.language === "on")
      currChapterText = currChapter.on;
    else
      currChapterText = currChapter.is;

    return (
      <TouchableWithoutFeedback onPress={() => {this.props.stopFullscreen();}}>
        <View>
          <Text style={[styles.chapterText, {fontSize: this.props.readingFontSize}]}>
            {currChapterText}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  chapterText: {
    textAlign: 'justify',
    color: '#333333',
    marginBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
  },
});

const mapDispatchToProps = dispatch => ({
  stopFullscreen: (itemValue) =>
    dispatch(NavigationActions.navigate({type: 'STOP_FULLSCREEN'})),
});

const mapStateToProps = (state, ownProps) => ({
  selectedChapter: state.chapters.selectedChapter,
  language: state.settings.language,
  readingFontSize: state.settings.readingFontSize,
  fullscreen: state.settings.fullscreen,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterText);
