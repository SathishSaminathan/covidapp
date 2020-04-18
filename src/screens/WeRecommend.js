import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {startCase} from 'lodash';
import RNPickerSelect from 'react-native-picker-select';

import {Colors} from '../constants/ThemeConstants';
import {heightPerc} from '../helpers/styleHelper';
import TextComponent from '../components/Shared/TextComponent';
import {FontType, IconType} from '../constants/AppConstants';
import Axios from 'axios';
import {currencyFormat} from '../helpers/validationHelper';
import IconComponent from '../components/Shared/IconComponent';
import MenuIcon from '../components/Shared/MenuIcon';
import {LottieFile} from '../assets/lottie';
import LottieAnimation from '../components/Shared/LottieAnimation';

const recommendations = [
  {
    name: 'Great with Namaste',
    icon: LottieFile.namaste,
  },
  {
    name: 'Wear Mask',
    icon: LottieFile.wearmask,
  },
  {
    name: 'Maintain Social Distance',
    icon: LottieFile.socialdistancing,
  },
  {
    name: 'Wash Hands Frequently',
    icon: LottieFile.washHand,
  },
];

const WeRecommend = (props) => (
  <LinearGradient style={{flex: 1}} colors={[Colors.blue, Colors.white]}>
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{paddingBottom: 20}}>
          <MenuIcon
            {...props}
            onPress={() => props.navigation.goBack()}
            back
            title="We recommend"
          />
        </View>
        <View
          style={{
            flex: 1,
            paddingTop: 10,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}>
          {recommendations.map((data, i) => (
            <View
              key={i}
              style={{
                width: '45%',
                height: '30%',
                backgroundColor: Colors.white,
                borderRadius: 10,
                marginBottom: 10,
                padding: 10,
              }}>
              <View style={{flex: 2}}>
                <TextComponent type={FontType.BOLD}>{`${i + 1}. ${
                  data.name
                }`}</TextComponent>
              </View>
              <View style={{flex: 8}}>
                <LottieAnimation file={data.icon} />
              </View>
            </View>
          ))}
          <View
            style={{
              width: '90%',
              height: '30%',
              backgroundColor: Colors.white,
              borderRadius: 10,
              marginBottom: 10,
              padding: 10,
            }}>
            <View style={{flex: 2}}>
              <TextComponent type={FontType.BOLD}>{`${
                recommendations.length + 1
              }. Consult with doctor`}</TextComponent>
            </View>
            <View style={{flex: 8}}>
              <View style={{height: '100%'}}>
                <LottieAnimation file={LottieFile.consultation} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  </LinearGradient>
);

export default WeRecommend;
