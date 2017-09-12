import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const MIN_HEIGHT = 10;
const MAX_HEIGHT = ((Dimensions.get('window').width)/3)*2;

export default class HeaderView extends React.Component {
  render() {
    return (
      <View style={styles.headerView}>
        <Image source={require('../res/egill.png')} alignContent={'center'} style={styles.image}>
          <View style={styles.imageTextContainer}>
            <Text style={styles.logo}>Egils saga</Text>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  imageTextContainer: {
    flex: 1,
    marginTop: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 60,
    fontFamily: 'Plakat-Fraktur',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
    textShadowColor: '#000000'
  },
});
