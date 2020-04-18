import React from 'react';
import 'react-native-get-random-values';
import {Text, View, FlatList} from 'react-native';
import {WebView} from 'react-native-webview';

import TextComponent from '../components/Shared/TextComponent';
import {FontType} from '../constants/AppConstants';
import {Colors} from '../constants/ThemeConstants';

const videos = [
  {link: 'Q-Iy7ccCpS4'},
  {link: 'lhYAxIc1xUc'},
  {link: '8c_UJwLq8PI'},
];

const CoronaVideos = ({params}) => (
  <View style={{flex: 1}}>
    <TextComponent style={{fontSize: 20}} type={FontType.BOLD}>
      Corona related videos
    </TextComponent>
    <FlatList
     keyExtractor={(item, index) => index.toString()}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: 20,
            width: '100%',
            backgroundColor: Colors.transparent,
          }}
        />
      )}
      data={videos}
      renderItem={({item}) => (
        <WebView
        //   javaScriptEnabled
          style={{height: 220}}
          source={{
            uri: `https://www.youtube.com/embed/${item.link}?version=3&enablejsapi=1&rel=0&autoplay=1&showinfo=0&controls=1&modestbranding=0"`,
          }}
        />
      )}
    />
  </View>
);

export default CoronaVideos;
