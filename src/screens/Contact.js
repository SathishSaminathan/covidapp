import React from 'react';
import {Text, View} from 'react-native';
import MeniIcon from '../components/Shared/MenuIcon';
import {Colors} from '../constants/ThemeConstants';

const ContactUs = (props) => (
  <View style={{backgroundColor: Colors.blue, flex: 1}}>
    <MeniIcon {...props} />
    <Text>ContactUs</Text>
  </View>
);

export default ContactUs;
