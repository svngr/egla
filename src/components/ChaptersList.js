import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import ChapterButton from './ChapterButton';

class ChaptersList extends React.Component {
  componentDidUpdate() {
    this.scrollToIndex();
  }

  scrollToIndex = () => {
    this.flatListRef.scrollToIndex({animated: true, viewPosition: 0.5, index: this.props.selectedChapter-1});
  }

  render() {
    return (
      <View style={styles.strip}>
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          horizontal={true}
          initialScrollIndex={this.props.selectedChapter-1}
          getItemLayout={(data, index) => ({length: 114, offset: 114 * index, index: index})}
          data={Array.from({ length: 90 }).map((x, i) => ({ key: i+1 }))}
          renderItem={({item}) => <ChapterButton key={item.key} chapterNum={item.key} name={item.key} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  strip: {
    height: 56,
    marginTop: 10,
  },
});

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = (state, ownProps) => ({
  selectedChapter: state.chapters.selectedChapter,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChaptersList);
