import React from 'react';
import {Text, View} from 'react-native';
import TextComponent from '../components/Shared/TextComponent';
import {FontType} from '../constants/AppConstants';

const videos = ['https://www.youtube.com/watch?v=8c_UJwLq8PI'];

const CoronaVideos = ({params}) => (
  <View style={{flex: 1}}>
    <TextComponent style={{fontSize: 20}} type={FontType.BOLD}>
      Corona related videos
    </TextComponent>
  </View>
);

export default CoronaVideos;
