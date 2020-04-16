import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Ripple from 'react-native-material-ripple';
import {startCase} from 'lodash';

import {Colors} from '../constants/ThemeConstants';
import Axios from 'axios';
import TextComponent from '../components/Shared/TextComponent';
import {getPartOfTheDay, currencyFormat} from '../helpers/validationHelper';
import {FontType, IconType} from '../constants/AppConstants';
import LottieAnimation from '../components/Shared/LottieAnimation';
import {LottieFile} from '../assets/lottie';
import MeniIcon from '../components/Shared/MenuIcon';
import IconComponent from '../components/Shared/IconComponent';

const values = [
  {name: 'recovered', icon: 'account-check-outline'},
  {name: 'confirmed', icon: 'account-alert-outline'},
  {name: 'deaths', icon: 'account-outline'},
];

const borderRadius = 18;
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmed: null,
      recovered: null,
      deaths: null,
    };
  }

  componentDidMount() {
    this.getGlobalData();
  }

  getGlobalData = () => {
    Axios.get('https://covid19.mathdro.id/api')
      .then((res) => {
        // console.log(res);
        this.setState({
          confirmed: res.data.confirmed.value,
          recovered: res.data.recovered.value,
          deaths: res.data.deaths.value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {confirmed, recovered, deaths} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.blue}}>
        <MeniIcon {...this.props} />
        <StatusBar
          backgroundColor={Colors.blue}
          barStyle="light-content"></StatusBar>
        <Svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 20,
            zIndex: 0,
            transform: [{rotateY: '180deg'}],
          }}>
          <Path
            d="M-17.5 378.5C31.5 32.5 302.5 463 375 89C447.5 -285 375 644 375 644H0C0 644 -66.5 724.5 -17.5 378.5Z"
            fill={Colors.white}
            // fillOpacity={0.5}
          />
        </Svg>
        <View style={{paddingTop: '5%', paddingLeft: 20}}>
          <TextComponent
            style={{fontSize: 25, color: Colors.white}}
            type={FontType.BOLD}>
            Good {getPartOfTheDay()}!
          </TextComponent>
          <TextComponent
            style={{fontSize: 12, color: Colors.white}}
            type={FontType.BOLD}>
            All cases update
          </TextComponent>
        </View>
        <ScrollView contentContainerStyle={{padding: 10, flexGrow: 1}}>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: 10,
              justifyContent: 'space-around',
            }}>
            {confirmed &&
              recovered &&
              deaths &&
              values.map((v, i) => (
                <View
                  rippleContainerBorderRadius={borderRadius}
                  key={i}
                  style={{
                    width: '45%',
                    height: 180,
                    borderRadius,
                    backgroundColor: Colors.white,
                    elevation: 10,
                    marginBottom: 10,
                    padding: 20,
                  }}>
                  <View
                    style={{
                      flex: 7,
                      justifyContent: 'flex-end',
                      paddingBottom: '10%',
                    }}>
                    <View
                      style={{
                        backgroundColor: Colors[v.name],
                        width: 50,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius,
                        elevation: 20,
                      }}>
                      <IconComponent
                        type={IconType.MaterialCommunityIcons}
                        name={v.icon}
                        style={{fontSize: 30, color: Colors.white}}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 3,
                    }}>
                    <TextComponent
                      style={{
                        color: Colors.searchText,
                        fontSize: 14,
                        paddingBottom: 5,
                      }}>
                      {startCase(v.name)}
                    </TextComponent>
                    <TextComponent
                      style={{color: Colors.themeBlack, fontSize: 20}}
                      type={FontType.BOLD}>
                      {currencyFormat(this.state[v.name])}
                    </TextComponent>
                  </View>
                </View>
              ))}
          </View>
          <Ripple
            rippleContainerBorderRadius={borderRadius}
            style={{
              // backgroundColor: Colors.red,
              height: 80,
              elevation: 10,
              marginTop: 20,
              borderRadius,
            }}>
            <View
              style={{
                backgroundColor: Colors.white,
                height: 80,
                // elevation: 10,
                borderRadius,
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flex: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconComponent
                  name="map-search-outline"
                  type={IconType.MaterialCommunityIcons}
                  style={{fontSize: 40}}
                />
              </View>
              <View
                style={{
                  flex: 5,
                  justifyContent: 'space-around',
                  paddingVertical: 10,
                }}>
                <TextComponent type={FontType.BOLD} style={{fontSize: 14}}>
                  Check by country
                </TextComponent>
                <TextComponent style={{color: Colors.searchText}}>
                  Find out how many people have confirmed cases in your country
                </TextComponent>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <IconComponent type={IconType.AntDesign} name="right" />
              </View>
            </View>
          </Ripple>
          {/* <View style={{height: 300}}>
            <LottieAnimation file={LottieFile.Istayathome} />
          </View> */}
        </ScrollView>
      </View>
    );
  }
}
