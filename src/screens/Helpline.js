import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import TextComponent from '../components/Shared/TextComponent';
import IconComponent from '../components/Shared/IconComponent';
import {IconType, FontType} from '../constants/AppConstants';
import CopyToClipboard from '../components/Shared/CopyToClipboard';
import {Colors} from '../constants/ThemeConstants';
import PhoneCall from '../components/Shared/PhoneCall';

const data = [
  {
    name: 'Andhra Pradesh',
    phn: '0866-2410978',
  },
  {
    name: 'Arunachal Pradesh',
    phn: '9436055743',
  },
  {
    name: 'Assam',
    phn: '6913347770',
  },
  {
    name: 'Bihar',
    phn: '104',
  },
  {
    name: 'Chhattisgarh',
    phn: '104',
  },
  {
    name: 'Goa',
    phn: '104',
  },
  {
    name: 'Gujarat',
    phn: '104',
  },
  {
    name: 'Haryana',
    phn: '8558893911',
  },
  {
    name: 'Himachal Pradesh',
    phn: '104',
  },
  {
    name: 'Jharkhand',
    phn: '104',
  },
  {
    name: 'Karnataka',
    phn: '104',
  },
  {
    name: 'Kerala',
    phn: '0471-2552056',
  },
  {
    name: 'Madhya Pradesh',
    phn: '104',
  },
  {
    name: 'Maharashtra',
    phn: '020-26127394',
  },
  {
    name: 'Manipur',
    phn: '3852411668',
  },
  {
    name: 'Meghalaya',
    phn: '108',
  },
  {
    name: 'Mizoram',
    phn: '102',
  },
  {
    name: 'Nagaland',
    phn: '7005539653',
  },
  {
    name: 'Odisha',
    phn: '9439994859',
  },
  {
    name: 'Punjab',
    phn: '104',
  },
  {
    name: 'Rajasthan',
    phn: '0141-2225624',
  },
  {
    name: 'Sikkim',
    phn: '104',
  },
  {
    name: 'Tamil Nadu',
    phn: '044-29510500',
  },
  {
    name: 'Telangana',
    phn: '104',
  },
  {
    name: 'Tripura',
    phn: '0381-2315879',
  },
  {
    name: 'Uttarakhand',
    phn: '104',
  },
  {
    name: 'Uttar Pradesh',
    phn: '18001805145',
  },
  {
    name: 'West Bengal',
    phn: '1800313444222',
  },
];

const Helpline = ({params}) => {
  const Call = new PhoneCall();
  return (
    <View>
      <TextComponent style={{fontSize: 15}} type={FontType.BOLD}>
        Central Helpline Number: <TextComponent>+91-11-23978046</TextComponent>
      </TextComponent>
      <TextComponent
        style={{fontSize: 11, paddingBottom: 10, color: Colors.searchText}}
        type={FontType.BOLD}>
        Helpline Numbers of States & Union Territories (UTs)
      </TextComponent>
      <View
        style={{
          paddingVertical: 10,
          backgroundColor: Colors.staysBackground,
          padding: 10,
          borderRadius: 10,
        }}>
        {data.map((data, i) => (
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
              borderBottomColor: Colors.accordionBorderColor,
              borderBottomWidth: 0.5,
            }}
            key={i}>
            <View style={{flex: 5, justifyContent: 'center'}}>
              <TextComponent type={FontType.BOLD}>{data.name}</TextComponent>
            </View>
            <View style={{flex: 5, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 8}}>
                <TextComponent style={{color: Colors.blue}}>
                  {data.phn}
                </TextComponent>
              </View>
              <View
                style={{
                  flex: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => Call.makeCall(data.phn)}>
                  <IconComponent
                    name="phone"
                    type={IconType.Feather}
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Helpline;
