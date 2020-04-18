import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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
import moment from 'moment';

const names = ['INDIA', 'OTHER'];

const dateFormat = 'DD/MM/YYYY';

const res = ['confirmed', 'recovered', 'deaths'];

const India = ({data = null, obj = null}) => {
  const [State, setState] = useState();
  const [Data, setData] = useState(data);
  useEffect(() => {
    setData(data);
    setState(obj);
  }, [data, obj]);

  return Data ? (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        // backgroundColor: 'red',
        width: '90%',
        alignSelf: 'center',
        paddingTop: '10%',
      }}>
      <View
        style={{
          // width: '90%',
          backgroundColor: Colors.white,
          borderRadius: 10,
          padding: 10,
          // height: '55%',
          // elevation: 10,
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

      {Data && (
        <View
          style={{
            marginTop: 20,
            backgroundColor: Colors.white,
            padding: 10,
            borderRadius: 10,
          }}>
          <TextComponent
            style={{fontSize: 25, paddingVertical: 5}}
            type={FontType.BOLD}>
            {Data.date}
          </TextComponent>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 5}}>
              <TextComponent type={FontType.BOLD} style={{fontSize: 15}}>
                Location
              </TextComponent>
            </View>
            <View style={{flex: 3}}>
              <TextComponent style={{color: Colors.blue}}>
                Infected
              </TextComponent>
            </View>
            <View style={{flex: 2}}>
              <TextComponent style={{color: Colors.deaths}}>
                Death
              </TextComponent>
            </View>
          </View>
          {Data.data &&
            Data.data.map((list, i) => (
              <View
                key={i}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingVertical: 10,
                  borderBottomWidth: 0.5,
                  borderBottomColor: Colors.accDividerColor,
                }}>
                <View style={{flex: 5}}>
                  <TextComponent type={FontType.BOLD}>
                    {list.state}
                  </TextComponent>
                </View>
                <View style={{flex: 3}}>
                  <TextComponent style={{color: Colors.blue}}>
                    {list.data.infected}
                  </TextComponent>
                </View>
                <View style={{flex: 2}}>
                  <TextComponent style={{color: Colors.deaths}}>
                    {list.data.dead}
                  </TextComponent>
                </View>
                {/* {list.data &&
              list.data.state.map((value, i) => (
                <TextComponent key={i}>{value.name}</TextComponent>
              ))} */}
              </View>
            ))}
        </View>
      )}
    </ScrollView>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.transparent,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator size="large" color={Colors.blue} />
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
        alignSelf: 'center',
        borderRadius: 10,
        paddingTop: 20,
        // paddingTop: '10%',
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
      data: null,
      obj: null,
    };
  }

  componentDidMount() {
    this.getDistrictWise();
    this.getData();
  }

  getData = () => {
    Axios.get('https://covid19.mathdro.id/api/countries/INDIA')
      .then((res) => {
        this.setState({
          obj: {
            confirmed: res.data.confirmed.value,
            recovered: res.data.recovered.value,
            deaths: res.data.deaths.value,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getDistrictWise = () => {
    Axios.get('https://v1.api.covindia.com/district-date-total-data')
      .then((res) => {
        let lastFiveDays = Array(5)
          .fill('')
          .map((v, i) => moment().subtract(i, 'd').format('DD/MM/YYYY'));
        // console.log(
        //   lastFiveDays.map((date) => {
        //     return {
        //       date,
        //       data: res.data[date],
        //     };
        //   }),
        // );
        let availableDates = Object.keys(res.data);
        let moments = availableDates.map((d) => moment(d, dateFormat));
        let maxDate = moment.max(moments).format(dateFormat);
        this.constructData(maxDate, res.data);
        // let keys = Object.keys(res.data);
        // let data = Object.values(res.data);
        // let temp = keys.map((key, i) => {
        //   return {
        //     date: key,
        //     // data: {
        //     //   state: Object.keys(data[i]).map((name, j) => {
        //     //     return {
        //     //       name,
        //     //       data: Object.values(data[i])[j],
        //     //     };
        //     //   }),
        //     // },
        //   };
        // });
        // setData(temp);
        // console.log(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  constructData = (date, data) => {
    let todayData = data[moment().format('DD/MM/YYYY')];
    var arr = Object.keys(todayData).map(function (key) {
      return {state: key, data: todayData[key]};
    });
    // console.clear();
    let ArrayLength = arr.length;
    arr.splice(ArrayLength - 3, 3);

    this.setState({
      data: {
        data: arr.sort((a, b) => a.data.infected < b.data.infected),
        date,
      },
    });
  };

  render() {
    const {activeMenu, data, obj} = this.state;
    return (
      <LinearGradient style={{flex: 1}} colors={[Colors.blue, Colors.white]}>
        {/* <View> */}
        <MenuIcon
          {...this.props}
          onPress={() => this.props.navigation.goBack()}
          back
        />
        {/* </View> */}
        <View style={{flex: 9}}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              // alignItems: 'center',
              // justifyContent: 'center',
              //   backgroundColor: 'yellow',
            }}>
            <>
              <View style={{flex: 1, opacity: activeMenu === names[0] ? 1 : 0}}>
                <India data={data} obj={obj} />
              </View>
              <View
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  opacity: activeMenu === names[1] ? 1 : 0,
                  zIndex: activeMenu === names[1] ? 1 : -1,
                }}>
                <Other />
              </View>
            </>
            {/* {activeMenu === names[0] ? (
              <India data={data} obj={obj} />
            ) : (
              <Other />
            )} */}
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
