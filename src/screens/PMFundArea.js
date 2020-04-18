import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import TextComponent from '../components/Shared/TextComponent';
import IconComponent from '../components/Shared/IconComponent';
import {IconType, FontType} from '../constants/AppConstants';
import CopyToClipboard from '../components/Shared/CopyToClipboard';
import {Colors} from '../constants/ThemeConstants';

const data = [
  {
    label: 'Account name',
    value: 'PM CARES',
  },
  {
    label: 'Account number',
    value: '2121PM20202',
  },
  {
    label: 'IFSC Code',
    value: 'SBIN0000691',
  },
  {
    label: 'UPI',
    value: 'pmcares@sbi',
  },
  {
    label: 'Bank',
    value: `State Bank of India, New Delhi main branch`,
  },
];

const PMFundArea = ({params}) => (
  <View>
    <TextComponent
      style={{fontSize: 20, paddingBottom: 10}}
      type={FontType.BOLD}>
      PM CARES
    </TextComponent>
    <View
      style={{
        paddingVertical: 10,
        backgroundColor: Colors.staysBackground,
        padding: 10,
        borderRadius: 10,
      }}>
      {data.map((data, i) => (
        <View style={{flexDirection: 'row', paddingVertical: 5}} key={i}>
          <View style={{flex: 5}}>
            <TextComponent type={FontType.BOLD}>{data.label}</TextComponent>
          </View>
          <View style={{flex: 5, flexDirection: 'row'}}>
            <View style={{flex: 8}}>
              <TextComponent style={{color: Colors.blue}}>
                {data.value}
              </TextComponent>
            </View>
            <View
              style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <CopyToClipboard text={data.value} />
            </View>
          </View>
        </View>
      ))}
    </View>
  </View>
);

export default PMFundArea;
