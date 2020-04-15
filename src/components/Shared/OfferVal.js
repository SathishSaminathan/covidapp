import React from 'react';
import {Text, View} from 'react-native';
import TextComponent from './TextComponent';
import {Colors} from '../../constants/ThemeConstants';

const OfferVal = ({org = null, off}) => (
  <View style={{flexDirection: 'row'}}>
    {org && (
      <TextComponent
        style={{
          color: Colors.searchText,
          textDecorationLine: 'line-through',
          paddingRight: 10,
        }}>
        {org}
      </TextComponent>
    )}
    <TextComponent style={{color: Colors.white}}>{off}% Off</TextComponent>
  </View>
);

export default OfferVal;
