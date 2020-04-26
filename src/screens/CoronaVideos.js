import React, {Component} from 'react';
import 'react-native-get-random-values';
import {Text, View, FlatList} from 'react-native';
import {WebView} from 'react-native-webview';
import firestore from '@react-native-firebase/firestore';

import TextComponent from '../components/Shared/TextComponent';
import {FontType} from '../constants/AppConstants';
import {Colors} from '../constants/ThemeConstants';

// const videos = [
//   {link: 'Q-Iy7ccCpS4'},
//   {link: 'lhYAxIc1xUc'},
//   {link: '8c_UJwLq8PI'},
// ];

class CoronaVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Videos: null,
      ShowVideos: false,
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.setState({
        ShowVideos: true,
      });
    });
    this.props.navigation.addListener('blur', () => {
      this.setState({
        ShowVideos: false,
      });
    });
    firestore()
      .collection('videos')
      .onSnapshot((querySnapshot) => {
        let Videos = [];
        // console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach((doc) => {
          Videos.push(doc.data());
        });
        this.setState({Videos});
      });

    // Stop listening for updates when no longer required
    // firestore()
    //   .collection('videos')
    //   .add({link: 'Q-Iy7ccCpS4'})
    //   .then(() => {
    //     console.log('videos added!');
    //   });
  }
  render() {
    const {Videos, ShowVideos} = this.state;
    return ShowVideos ? (
      <View style={{flex: 1}}>
        <TextComponent style={{fontSize: 20}} type={FontType.BOLD}>
          Corona related videos
        </TextComponent>
        {Videos && (
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
            data={Videos}
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
        )}
      </View>
    ) : null;
  }
}

export default CoronaVideos;
