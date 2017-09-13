import React from 'react';
import { TouchableWithoutFeedback, View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class ChapterButton extends React.Component {
  render() {
    const currNum = parseInt(this.props.name);
    const selected = parseInt(this.props.name) === this.props.selectedChapter;
    const read =
      this.props.chaptersReadList.indexOf(parseInt(this.props.name)) >= 0;
    const english = this.props.language === 'en';

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.changeSelectedChapter(parseInt(this.props.name));
        }}
      >
        <View
          style={[
            styles.circle,
            read && styles.read,
            selected && styles.selected,
          ]}
        >
          <Text style={[selected && styles.selectedText]}>
            {english  ? <Text style={{ fontSize: 20 }}>Chapter {this.props.name}</Text>
                      : <Text style={{ fontSize: 28 }}>Kafli {this.props.name}</Text>}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 30,
    width: 110,
    height: 40,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 2,
    marginRight: 2,
  },
  read: {
    backgroundColor: 'mediumseagreen',
  },
  selected: {
    backgroundColor: 'lightskyblue',
  },
  selectedText: {
    fontWeight: '500',
  },
});

const mapDispatchToProps = dispatch => ({
  changeSelectedChapter: itemValue =>
    dispatch(NavigationActions.navigate({type: 'CHANGE_SELECTED_CHAPTER', value: itemValue})),
});

const mapStateToProps = (state, ownProps) => ({
  selectedChapter: state.chapters.selectedChapter,
  language: state.settings.language,
  chaptersReadList: state.chapters.chaptersReadList,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterButton);
