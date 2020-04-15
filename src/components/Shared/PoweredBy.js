import React from 'react';
import {Text, View} from 'react-native';
import TextComponent from './TextComponent';
import {Colors} from '../../constants/ThemeConstants';

const PoweredBY = ({params}) => (
  <TextComponent style={{color: Colors.textBlack, textAlign: 'center', paddingVertical: 8}}>
    Powered By Alfred
  </TextComponent>
);

export default PoweredBY;
