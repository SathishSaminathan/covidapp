import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Video from 'react-native-video';

const VideoComponent = props => {
  return (
    <>
      {props.overley && <View style={styles.absolute} blurType="light" blurAmount={1} />}
      <Video
        // source={{
        //   uri:
        //     'https://www.no-copyright.com/static2/preview/stock-video-no-copyright-video-stock-video-clip-4763-137432.mp4',
        // }} // Can be a URL or a local file.
        // ref={ref => {
        //   this.player = ref;
        // }}
        repeat={true}
        resizeMode={'cover'}
        rate={1.0}
        ignoreSilentSwitch={'obey'}
        {...props}
      />
    </>
  );
};

export default VideoComponent;

var styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    backgroundColor: '#0000008a',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 2
  },
});
