import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import IconComponent from './IconComponent';
import {IconType} from '../../constants/AppConstants';

const CopyToClipboard = ({text}) => {
  const copyToClipboard = () => {
    Clipboard.setString(text);
    showToast();
  };

  const showToast = () => {
    ToastAndroid.show(`${text} copied`, ToastAndroid.SHORT);
  };
  return (
    <TouchableOpacity onPress={copyToClipboard}>
      <IconComponent name="copy" type={IconType.Feather} />
    </TouchableOpacity>
  );
};

export default CopyToClipboard;
