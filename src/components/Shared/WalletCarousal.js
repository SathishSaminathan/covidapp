import React, {Component} from 'react';
import {
  Platform,
  View,
  ScrollView,
  Text,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {
  sliderWidth,
  itemWidth,
} from '../../assets/snap-carousal/styles/SliderEntry.style';
import SliderEntry from '../../assets/snap-carousal/components/SliderEntry';
import styles from '../../assets/snap-carousal/styles/index.style';
import {ENTRIES2} from '../../assets/snap-carousal/static/entries';

export default class WalletCarousal extends Component {
  _renderItem({item, index}) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }
  render() {
    return (
      <Carousel
        data={ENTRIES2}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={0.92}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        activeSlideAlignment="center"
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        activeAnimationType={"timing"}
        activeAnimationOptions={{
          friction: 4,
          tension: 40,
        }}
      />
    );
  }
}
