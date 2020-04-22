import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  Linking,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import firestore from '@react-native-firebase/firestore';
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';
import Share from 'react-native-share';
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
import ImageComponent from '../components/Shared/ImageComponent';
import moment from 'moment';
import {Images} from '../assets/images';
import CoronaVideos from './CoronaVideos';
import PMFundArea from './PMFundArea';
import ButtonComponent from '../components/Shared/ButtonComponent';
import Helpline from './Helpline';
import WebView from 'react-native-webview';

const values = [
  {name: 'recovered', icon: 'account-check-outline'},
  {name: 'confirmed', icon: 'account-alert-outline'},
  {name: 'critical', icon: 'account-outline'},
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
      updated: null,
      critical: null,
      link: null,
    };
  }

  componentDidMount() {
    this.getGlobalData();
    firestore()
      .collection('applink')
      .onSnapshot((querySnapshot) => {
        let link = [];
        // console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach((doc) => {
          link.push(doc.data());
        });
        if (link) {
          if (link[0]) {
            if (link[0].link) console.log('applink', link[0].link);
            this.setState({link: link[0].link});
          }
        }
      });

    // Stop listening for updates when no longer required
    // firestore()
    //   .collection('videos')
    //   .add({link: 'Q-Iy7ccCpS4'})
    //   .then(() => {
    //     console.log('videos added!');
    //   });
  }

  getGlobalData = () => {
    // Axios.get('https://covid19.mathdro.id/api')
    //   .then((res) => {
    //     // console.log(res);
    //     this.setState({
    //       confirmed: res.data.confirmed.value,
    //       recovered: res.data.recovered.value,
    //       deaths: res.data.deaths.value,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    Axios.get('https://corona.lmao.ninja/v2/all')
      .then((res) => {
        // console.log(res);
        this.setState({
          confirmed: res.data.cases,
          recovered: res.data.recovered,
          deaths: res.data.deaths,
          updated: res.data.updated,
          critical: res.data.critical,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  shareFuntion(link) {
    const shareOptions = {
      title: 'Sevai: Corona Updates',
      message: `Get the latest updates on Corona by country wise, District wise.
Lets Fight against COVID-19`,
      url: link,
      // social: Share.Social.WHATSAPP,
    };
    Share.isPackageInstalled('com.whatsapp').then(({isInstalled}) => {
      if (isInstalled) {
        Share.open(shareOptions);
      } else {
        Share.open(shareOptions);
      }
    });
  }

  render() {
    const {confirmed, recovered, deaths, updated, critical, link} = this.state;
    return (
      <View style={{flex: 1, backgroundColor: Colors.blue}}>
        <MeniIcon {...this.props} />
        {link && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{position: 'absolute', top: 20, right: 20}}
            onPress={() => this.shareFuntion(link)}>
            <IconComponent
              type={IconType.MaterialCommunityIcons}
              name="share-variant"
              size={30}
              color={Colors.white}
            />
          </TouchableOpacity>
        )}
        <StatusBar
          backgroundColor={Colors.blue}
          barStyle="light-content"></StatusBar>
        <Svg
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 60,
            zIndex: -1,
            transform: [{rotateY: '180deg'}],
          }}>
          <Path
            d="M-17.5 378.5C31.5 32.5 302.5 463 375 89C447.5 -285 375 644 375 644H0C0 644 -66.5 724.5 -17.5 378.5Z"
            fill={Colors.white}
            // fillOpacity={0.5}
          />
        </Svg>
        <View style={{paddingLeft: 20, paddingBottom: 10}}>
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
          {updated && (
            <TextComponent
              style={{fontSize: 12, color: Colors.white}}
              type={FontType.BOLD}>
              Last update {moment(updated).fromNow()}
            </TextComponent>
          )}
        </View>
        <ScrollView
          contentContainerStyle={{padding: 10, flexGrow: 1, paddingTop: 0}}>
          <View
            style={{
              marginTop: 0,
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: 10,
              justifyContent: 'space-around',
            }}>
            {confirmed &&
              recovered &&
              deaths &&
              values.map((v, i) => (
                <Animatable.View
                  animation="fadeIn"
                  delay={i}
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
                </Animatable.View>
              ))}
          </View>
          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View style={{width: '90%'}}>
              <ButtonComponent
                style={{
                  backgroundColor: Colors.deaths,
                  fontSize: 12,
                  color: Colors.white,
                }}>
                Lets fight against CORONA
              </ButtonComponent>
            </View>
          </View>
          <Ripple
            onPress={() => this.props.navigation.navigate('CheckByCountry')}
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
                  Find out how many people have confirmed cases in your country.
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

          <Ripple
            onPress={() => this.props.navigation.navigate('WeRecommend')}
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
                overflow: 'hidden',
                flex: 1,
              }}>
              <View
                style={{
                  flex: 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{height: '100%', width: '70%'}}>
                  <ImageComponent source={Images.followins} />
                </View>
              </View>
              <View
                style={{
                  flex: 5,
                  // justifyContent: 'space-around',
                  paddingVertical: 10,
                }}>
                <TextComponent type={FontType.BOLD} style={{fontSize: 14}}>
                  Follow our instructions
                </TextComponent>
                <TextComponent style={{color: Colors.searchText}}>
                  To prevent the spread of the coronavirus disease
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
          <View style={{padding: 10}}>
            <CoronaVideos />
          </View>
          <View style={{padding: 10}}>
            <Helpline />
          </View>
          <View style={{padding: 10}}>
            <PMFundArea />
          </View>
          <View style={{paddingVertical: 10}}>
            <View style={{height: 250}}>
              <ImageComponent source={Images.protective} resizeMode="contain" />
            </View>
          </View>
          <View style={{paddingVertical: 10}}>
            <View style={{height: 350}}>
              <ImageComponent
                source={Images.protective1}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={{paddingVertical: 10}}>
            <View style={{flex: 1}}>
              <View style={{height: 60}}>
                <ImageComponent source={Images.gov} resizeMode="contain" />
              </View>
              <TextComponent style={{alignSelf: 'center'}} type={FontType.BOLD}>
                Thanks to Gov. of India
              </TextComponent>
            </View>
          </View>
          {/* <View
            style={{
              // backgroundColor: Colors.red,
              marginTop: 20,
              paddingLeft: 10,
              flex: 1,
            }}>
            <TextComponent style={{fontSize: 20}} type={FontType.BOLD}>
              We recommend
            </TextComponent>
            <View style={{height: 100}}>
              <LottieAnimation
                file={LottieFile.washHand}
              />
            </View>
          </View> */}
          {/* <View style={{height: 300}}>
            <LottieAnimation file={LottieFile.Istayathome} />
          </View> */}
        </ScrollView>
      </View>
    );
  }
}
