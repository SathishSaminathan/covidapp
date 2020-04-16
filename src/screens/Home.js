import React, {Component} from 'react';
import {Text, View, ScrollView, StatusBar} from 'react-native';

import {Colors} from '../constants/ThemeConstants';
import Axios from 'axios';
import TextComponent from '../components/Shared/TextComponent';
import {getPartOfTheDay} from '../helpers/validationHelper';
import {FontType} from '../constants/AppConstants';
import Svg, {Path} from 'react-native-svg';

const values = ['confirmed', 'recovered', 'deaths'];
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
        console.log(res);
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
        <ScrollView style={{padding: 10}}>
          <TextComponent
            style={{fontSize: 25, color: Colors.white}}
            type={FontType.BOLD}>
            Good {getPartOfTheDay()}!
          </TextComponent>

          <View
            style={{
              marginTop: "30%",
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingTop: 10,
              justifyContent: 'space-around',
            }}>
            {values.map((v, i) => (
              <View
                key={i}
                style={{
                  width: '45%',
                  height: 200,
                  borderRadius: 15,
                  backgroundColor: Colors.white,
                  elevation: 10,
                  marginBottom: 10,
                }}>
                <TextComponent>{this.state[v]}</TextComponent>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
