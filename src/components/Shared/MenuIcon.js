import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const MeniIcon = ({navigation}) => (
  <View
    style={{
      height: 50,
      paddingTop: '5%',
      paddingLeft: 20,
      // backgroundColor: 'red',
    }}>
    <TouchableOpacity activeOpacity={1} onPress={() => navigation.openDrawer()}>
      <View
        style={{
          height: 5,
          backgroundColor: Colors.white,
          width: 30,
          borderRadius: 10,
        }}></View>
      <View
        style={{
          height: 5,
          backgroundColor: Colors.white,
          width: 15,
          borderRadius: 10,
          marginTop: 5,
        }}></View>
    </TouchableOpacity>
  </View>
);

export default MeniIcon;
