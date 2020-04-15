import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {Colors} from '../constants/ThemeConstants';
import Axios from 'axios';
import TextComponent from '../components/Shared/TextComponent';

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
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View
          style={{
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
                borderRadius: 5,
                backgroundColor: Colors.white,
                elevation: 10,
                marginBottom: 10,
              }}>
              <TextComponent>{this.state[v]}</TextComponent>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
