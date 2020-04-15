import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';
import AppConstants, {IconType} from '../../../constants/AppConstants';
import DotComponent from './dotComponent';
import TextComponent from '../../../components/Shared/TextComponent';
import ImageComponent from '../../../components/Shared/ImageComponent';
import {Colors} from '../../../constants/ThemeConstants';
import {Images} from '../../../assets/images';
import IconComponent from '../../../components/Shared/IconComponent';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  get image() {
    const {
      data: {illustration},
      parallax,
      parallaxProps,
      even,
    } = this.props;

    return parallax ? (
      <ParallaxImage
        source={{uri: illustration}}
        containerStyle={[
          styles.imageContainer,
          even ? styles.imageContainerEven : {},
        ]}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={{uri: illustration}} style={styles.image} />
    );
  }

  render() {
    const {
      data: {title, subtitle},
      even,
    } = this.props;

    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <View style={{borderRadius: 10, overflow: 'hidden', elevation: 1}}>
        <ImageBackground source={Images.greycard} style={{flex: 1}}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.slideInnerContainer}>
            <View
              style={{
                flex: 2,
                backgroundColor: Colors.transparent,
                borderRadius: 10,
                overflow: 'hidden',
                justifyContent: 'space-around',
                padding: 20,
                // elevation: 3,
              }}>
              <View style={{flex: 2}}>
                <IconComponent
                  type={IconType.EvilIcons}
                  name="trash"
                  style={{
                    color: Colors.white,
                    fontSize: 25,
                    alignSelf: 'flex-end',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 4,
                  // backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextComponent style={{fontSize: 18, color: Colors.white}}>
                  XXXX XXXX XXXX 0609
                </TextComponent>
              </View>
              <View
                style={{
                  flex: 3,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  // backgroundColor: 'red',
                }}>
                <ImageComponent
                  source={Images.chip}
                  style={{height: 40}}
                  resizeMode="contain"
                />
                <ImageComponent
                  source={Images.visa}
                  style={{width: 60}}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}
