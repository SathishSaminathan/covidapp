import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import PersonBlink from "../../assets/lottie/2454-personal-character.json";
import BoyBlink from "../../assets/lottie/5666-zezinho.json";
import GirlJump from "../../assets/lottie/2144-little-girl-jumping-loader.json";
import EmptyKart from "../../assets/lottie/4496-empty-cart.json";
import EmptySearch from "../../assets/lottie/10223-search-empty.json";
import Network from "../../assets/lottie/1408-network-lost.json";
import StayHome from "../../assets/lottie/19110-stay-home-enjoy-your-coffee.json";
import { LottieFile } from "../../assets/lottie";

// import AppConstants from "../../../constants/AppConstants.js";

export default function LottieAnimation({ file = LottieFile.Stayhomeandenjoycofee }) {
  // const getLottie = name => {
  //   switch (name) {
  //     case AppConstants.ASK_TO_LOGIN:
  //       return PersonBlink;
  //     case AppConstants.AVATAR:
  //       return BoyBlink;
  //     case AppConstants.JUMPING_GIRL:
  //       return GirlJump;
  //     case AppConstants.EMPTY_KART:
  //       return EmptyKart;
  //     case AppConstants.EMPTY_SEARCH:
  //       return EmptyKart;
  //     case AppConstants.NETWORK:
  //       return Network;
  //   }
  // };
  return (
    <View style={{ flex: 1 }}>
      <LottieView source={file} autoPlay loop />
    </View>
  );
}
