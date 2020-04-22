import React, {useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {Button, StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import GetStarted from '../screens/GetStarted';
import Animated from 'react-native-reanimated';
import {Colors} from '../constants/ThemeConstants';
import Home from '../screens/Home';
import ContactUs from '../screens/Contact';
import TextComponent from '../components/Shared/TextComponent';
import IconComponent from '../components/Shared/IconComponent';
import {IconType} from '../constants/AppConstants';
import CheckByCountry from '../screens/CheckByCountry';
import WeRecommend from '../screens/WeRecommend';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MyStack = ({navigation, style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        headerMode="none"
        screenOptions={{
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({current: {progress}}) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
          }),
        }}
        // screenOptions={
        //   {
        //     headerTransparent: true,
        //     headerTitle: null,
        //     headerLeft: () => (
        //       <Button title="Menu" onPress={() => navigation.openDrawer()} />
        //     ),
        //   }
        // }
      >
        <Stack.Screen
          name="Home"
          options={
            {
              // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }
          }>
          {(props) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="ContactUs"
          options={
            {
              // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }
          }>
          {(props) => <ContactUs {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="CheckByCountry"
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          {(props) => <CheckByCountry {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="WeRecommend"
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          {(props) => <WeRecommend {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </Animated.View>
  );
};

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{flex: 1, paddingTop: '50%'}}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
        // icon={() => (
        //   <IconComponent
        //     name="home-outline"
        //     type={IconType.MaterialCommunityIcons}
        //     style={{color: Colors.white, fontSize: 20}}
        //   />
        // )}
      />
      <DrawerItem
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
        label="Check by country"
        onPress={() => props.navigation.navigate('CheckByCountry')}
        // icon={() => (
        //   <IconComponent
        //     name="home-outline"
        //     type={IconType.MaterialCommunityIcons}
        //     style={{color: Colors.white, fontSize: 20}}
        //   />
        // )}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNav = () => {
  const [Progress, setProgress] = useState(new Animated.Value(0));
  const scale = Animated.interpolate(Progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(Progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });
  const animatedStyle = {borderRadius, transform: [{scale}]};

  return (
    <LinearGradient style={{flex: 1}} colors={[Colors.blue, Colors.white]}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={{flex: 1}}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        drawerContent={(props) => {
          setProgress(props.progress);
          return <CustomDrawerContent {...props} />;
        }}>
        <Drawer.Screen name="Screens">
          {(props) => <MyStack {...props} style={animatedStyle} />}
        </Drawer.Screen>
        {/* <Drawer.Screen name="Contact Us" component={ContactUs} /> */}
      </Drawer.Navigator>
    </LinearGradient>
  );
};

export {DrawerNav};

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    borderColor: Colors.transparent,
    overflow: 'hidden',
    // borderWidth: 1,
  },
  drawerStyles: {flex: 1, width: '80%', backgroundColor: 'transparent'},
  drawerItem: {alignItems: 'flex-start', marginVertical: 0},
  drawerLabel: {
    color: 'white',
    // marginLeft: -16,
    fontFamily: 'Proxima Nova Bold',
    fontSize: 25,
  },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
  },
});
