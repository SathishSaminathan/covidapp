import React from 'react';
import {
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {Colors} from '../../constants/ThemeConstants';
import TextComponent from '../../components/Shared/TextComponent';
import IconComponent from '../../components/Shared/IconComponent';
import {FontType, IconType} from '../../constants/AppConstants';
import {heightPerc} from '../../helpers/styleHelper';
import Ripple from 'react-native-material-ripple';

const HeaderComponent = ({
  title,
  hasBack = false,
  navigation,
  isDark = false,
  children,
  twoOnly = false,
}) =>
  !isDark ? (
    <View
      style={{
        height: 60,
        backgroundColor: Colors.white,
        // borderBottomWidth: 1,
        borderBottomColor: Colors.accordionBorderColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: hasBack ? 0 : 10,
        elevation: 5,
      }}>
      {hasBack && (
        <Ripple rippleColor={Colors.white} onPress={() => navigation.goBack()}>
          <View
            style={{
              width: 40,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <IconComponent
              type={IconType.AntDesign}
              name="left"
              style={{fontSize: 18}}
            />
          </View>
        </Ripple>
      )}
      <TextComponent style={{fontSize: 18}} type={FontType.BOLD}>
        {title}
      </TextComponent>
    </View>
  ) : (
    <View
      style={{
        backgroundColor: Colors.themeBlack,
        // borderBottomWidth: 1,
        borderBottomColor: Colors.accordionBorderColor,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: hasBack ? 0 : 10,
        elevation: 5,
        height: 90,
        width: '100%',
      }}>
      <View style={{flex: !twoOnly ? 3 : 1}}>
        {hasBack && (
          <Ripple
            rippleColor={Colors.white}
            onPress={() => navigation.goBack()}>
            <View
              style={{
                width: 40,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 50,
              }}>
              <IconComponent
                type={IconType.AntDesign}
                name="left"
                style={{fontSize: 18, color: Colors.white}}
              />
            </View>
          </Ripple>
        )}
      </View>
      <StatusBar
        backgroundColor={Colors.themeBlack}
        barStyle="light-content"
        animated
      />
      <View style={{flex: !twoOnly ? 7 : 9, alignItems: 'center'}}>
        {children}
      </View>
      {!twoOnly && <View style={{flex: 3}} />}
    </View>
  );

export default HeaderComponent;
