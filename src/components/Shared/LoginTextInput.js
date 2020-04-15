import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Colors} from '../../constants/ThemeConstants';

const LoginTextInput = ({password, placeholder, icon}) => {
  const [ShowPassword, setShowPassword] = useState(false);
  const renderIcons = name => {
    let temp = name;
    let Icon = null;
    if (['user'].includes(name)) {
      Icon = EvilIcons;
    } else if (['md-mail', 'ios-eye'].includes(name)) {
      Icon = Ionicons;
    } else {
      Icon = Ionicons;
    }
    if (password) {
      if (ShowPassword) {
        temp = 'ios-eye-off';
      } else {
        temp = 'ios-eye';
      }
    }
    return (
      <Icon
        name={temp}
        style={{color: Colors.textDark, fontSize: 25}}
        onPress={() => password && setShowPassword(!ShowPassword)}
      />
    );
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: Colors.textDark,
        borderRadius: 50,
        paddingHorizontal: 10,
      }}>
      <View style={{flex: 8}}>
        <TextInput
          secureTextEntry={password && !ShowPassword}
          style={{color: Colors.textWhite, fontSize: 12}}
          // defaultValue="sample"
          placeholder={placeholder}
          placeholderTextColor={Colors.textWhite}
        />
      </View>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
        {renderIcons(icon)}
      </View>
    </View>
  );
};

export default LoginTextInput;
