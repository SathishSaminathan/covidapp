import React, {Component} from 'react';
import {View} from 'react-native';
import {Colors} from '../../../constants/ThemeConstants';

export default class DotComponent extends Component {
  renderDots = (numberOfDotes) => {
    let dots = [];
    for (let i = 0; i < numberOfDotes; i++) {
      dots.push(
        <View
          style={{
            width: 5,
            height: 5,
            borderRadius: 2.5,
            backgroundColor: Colors.white,
            marginRight: 5,
          }}
          key={i}></View>,
      );
    }
    return dots;
  };
  render() {
    const {numberOfDotes} = this.props;
    return (
      <View style={{flexDirection: 'row'}}>
        {this.renderDots(numberOfDotes)}
      </View>
    );
  }
}
