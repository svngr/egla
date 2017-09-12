import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, PropTypes } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Button } from 'react-native-elements';

class MarkButton extends React.Component {
  toggleButton = () => {
    if (this.props.chaptersReadList.indexOf(this.props.selectedChapter) === -1) {
      this.props.scrollToTopFunc();
      this.props.changeSelectedChapter(parseInt(this.props.selectedChapter)+1);
    }

    this.props.toggleChapterRead(parseInt(this.props.selectedChapter));
  }

  render() {
    const chapterRead = (this.props.chaptersReadList.indexOf(this.props.selectedChapter) >= 0);
    const english = (this.props.language === "en");

    return (
      <View style={styles.container}>
        <Button
          raised
          buttonStyle={[styles.button, chapterRead && styles.read]}
          containerViewStyle={styles.buttonContainer}
          textStyle={styles.buttonText}
          onPress={this.toggleButton}
          title={english  ? (chapterRead ? `Mark as unread` : `Mark as read`)
                          : (chapterRead ? `Merkja kafla sem ólesinn` : `Merkja kafla sem lesinn`)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  buttonContainer: {
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'mediumseagreen',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'ghostwhite',
    fontWeight: 'bold',
    fontSize: 17,
  },
  read: {
    backgroundColor: 'gray'
  },
});

MarkButton.propTypes = {
  scrollToTopFunc: React.PropTypes.func.isRequired, // had to put React. in front, wouldn't run otherwise
};

const mapDispatchToProps = (dispatch) => ({
  toggleChapterRead: (itemValue) =>
    dispatch(NavigationActions.navigate({type: 'TOGGLE_CHAPTER_READ', value: itemValue})),
  changeSelectedChapter: (itemValue) =>
    dispatch(NavigationActions.navigate({type: 'CHANGE_SELECTED_CHAPTER', value: itemValue})),
});

const mapStateToProps = (state, ownProps) => ({
  language: state.settings.language,
  selectedChapter: state.chapters.selectedChapter,
  chaptersReadList: state.chapters.chaptersReadList,
});

export default connect(mapStateToProps, mapDispatchToProps)(MarkButton);
