import React, {Component, useEffect, useState} from 'react';
import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {startCase} from 'lodash';
import RNPickerSelect from 'react-native-picker-select';

import {Colors} from '../constants/ThemeConstants';
import {heightPerc} from '../helpers/styleHelper';
import TextComponent from '../components/Shared/TextComponent';
import {FontType, IconType} from '../constants/AppConstants';
import Axios from 'axios';
import {currencyFormat} from '../helpers/validationHelper';
import IconComponent from '../components/Shared/IconComponent';
import MenuIcon from '../components/Shared/MenuIcon';

const names = ['INDIA', 'OTHER'];

const res = ['confirmed', 'recovered', 'deaths'];

const India = () => {
  const [State, setState] = useState();
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    Axios.get('https://covid19.mathdro.id/api/countries/INDIA')
      .then((res) => {
        setState({
          confirmed: res.data.confirmed.value,
          recovered: res.data.recovered.value,
          deaths: res.data.deaths.value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View
      style={{
        width: '90%',
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 10,
        height: '55%',
        elevation: 10,
        // alignItems: 'center',
      }}>
      <TextComponent style={{fontSize: 20}} type={FontType.BOLD}>
        Across India
      </TextComponent>
      {State && (
        <View>
          {res.map((v, i) => (
            <View style={{paddingTop: 15}} key={i}>
              <TextComponent style={{fontSize: 15}} type={FontType.BOLD}>
                {startCase(v)}
              </TextComponent>
              <TextComponent
                style={{fontSize: 30, paddingVertical: 5, color: Colors[v]}}
                type={FontType.BOLD}>
                {currencyFormat(State[v])}
              </TextComponent>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const Other = () => {
  const [Countries, setCountries] = useState(null);
  const [Country, setCountry] = useState(null);
  const [State, setState] = useState();
  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    const {
      data: {countries},
    } = await Axios.get('https://covid19.mathdro.id/api/countries');

    setCountries(
      countries.map((country) => {
        return {label: country.name, value: country.name};
      }),
    );
  };

  const handleChange = (value) => {
    getData(value);
    setCountry(value);
  };

  const getData = (country) => {
    Axios.get(`https://covid19.mathdro.id/api/countries/${country}`)
      .then((res) => {
        setState({
          confirmed: res.data.confirmed.value,
          recovered: res.data.recovered.value,
          deaths: res.data.deaths.value,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View
      style={{
        width: '90%',
        height: '55%',
        borderRadius: 10,
      }}>
      {/* <TextComponent>Other</TextComponent> */}
      <View style={{backgroundColor: Colors.white, marginBottom: 10}}>
        {Countries && (
          <RNPickerSelect
            placeholder={{
              label: 'Select country',
              value: null,
              color: '#9EA0A4',
            }}
            items={Countries}
            onValueChange={(value) => {
              handleChange(value);
            }}
            useNativeAndroidPickerStyle={false}
            // InputAccessoryView={() => null}
            style={{
              inputAndroid: {
                backgroundColor: 'transparent',
                paddingHorizontal: 10,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                overflow: 'hidden',
              },
              iconContainer: {
                top: '30%',
                right: 15,
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
            // value={this.state.favSport2}
            Icon={() => {
              return (
                <IconComponent
                  type={IconType.AntDesign}
                  size={20}
                  color="gray"
                  name="down"
                />
              );
            }}
          />
        )}
      </View>
      <View
        style={{
          height: '100%',
          backgroundColor: Colors.white,
          borderRadius: 10,
          padding: 10,
          elevation: 10,
        }}>
        <TextComponent style={{fontSize: 20}} type={FontType.BOLD}>
          {Country && `Across ${Country}`}
        </TextComponent>
        {State && (
          <View>
            {res.map((v, i) => (
              <View style={{paddingTop: 15}} key={i}>
                <TextComponent style={{fontSize: 15}} type={FontType.BOLD}>
                  {startCase(v)}
                </TextComponent>
                <TextComponent
                  style={{fontSize: 30, paddingVertical: 5, color: Colors[v]}}
                  type={FontType.BOLD}>
                  {currencyFormat(State[v])}
                </TextComponent>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

export default class CheckByCountry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: names[0],
    };
  }

  render() {
    const {activeMenu} = this.state;
    return (
      <LinearGradient style={{flex: 1}} colors={[Colors.blue, Colors.white]}>
        <View>
          <MenuIcon
            {...this.props}
            onPress={() => this.props.navigation.goBack()}
            back
          />
        </View>
        <View style={{flex: 9}}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              //   backgroundColor: 'yellow',
            }}>
            {activeMenu === names[0] ? <India /> : <Other />}
          </ScrollView>
        </View>
        <View
          style={{
            height: 70,
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '60%',
              height: 40,
              backgroundColor: Colors.white,
              borderRadius: 25,
              flexDirection: 'row',
              elevation: 10,
            }}>
            {names.map((v, i) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.setState({activeMenu: v})}
                key={i}
                style={{
                  flex: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View>
                  <TextComponent
                    style={{
                      color: activeMenu === v ? Colors.blue : Colors.themeBlack,
                      fontSize: 18,
                    }}
                    type={activeMenu === v ? FontType.BOLD : FontType.BOLD}>
                    {startCase(v.toLowerCase())}
                  </TextComponent>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>
    );
  }
}
