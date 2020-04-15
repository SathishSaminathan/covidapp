import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import VideoComponent from '../components/Shared/VideoComponent';
import {Colors} from '../constants/ThemeConstants';
import {widthPerc, heightPerc} from '../helpers/styleHelper';
import {Images} from '../assets/images';
import ButtonComponent from '../components/Shared/ButtonComponent';
import TextComponent from '../components/Shared/TextComponent';
import PoweredBY from '../components/Shared/PoweredBy';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

export default class GetStarted extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <StatusBar backgroundColor={Colors.transparent} />
        <ButtonComponent style={{backgroundColor: Colors.themeBlack}}>
          hai
        </ButtonComponent>
      </View>
    );
  }
}

// Later on in your styles..
var styles = StyleSheet.create({
  backgroundVideo: {
    height: viewportHeight,
    ...StyleSheet.absoluteFill,
  },
  container: {
    width: widthPerc(60),
    height: heightPerc(30),
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
});
