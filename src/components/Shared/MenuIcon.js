import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import IconComponent from './IconComponent';
import {IconType} from '../../constants/AppConstants';

const MenuIcon = ({navigation, onPress, back = false}) => (
  <View
    style={{
      height: 50,
      paddingTop: '5%',
      paddingLeft: 20,
    }}>
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => (onPress ? onPress() : navigation.openDrawer())}>
      {!back ? (
        <>
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
        </>
      ) : (
        <IconComponent
          type={IconType.AntDesign}
          name="left"
          style={{fontSize: 30, color: Colors.white}}
        />
      )}
    </TouchableOpacity>
  </View>
);

export default MenuIcon;
