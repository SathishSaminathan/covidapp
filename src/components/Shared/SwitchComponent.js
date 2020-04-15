import React from 'react';
import {Switch} from 'react-native-switch';
import {Colors} from '../../constants/ThemeConstants';

const SwitchComponent = ({status, onChange}) => {
  const barHeight = 20;
  return (
    <Switch
      value={status}
      onValueChange={onChange}
      disabled={false}
      activeText={'On'}
      inActiveText={'Off'}
      circleSize={barHeight}
      barHeight={barHeight}
      // circleBorderWidth={3}
      backgroundActive={Colors.themeBlack}
      backgroundInactive={Colors.accordionBorderColor}
      circleActiveColor={Colors.white}
      circleInActiveColor={Colors.white}
      changeValueImmediately={true}
      // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
      changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
      innerCircleStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.transparent,
      }} // style for inner animated circle for what you (may) be rendering inside the circle
      outerCircleStyle={{}} // style for outer animated circle
      renderActiveText={false}
      renderInActiveText={false}
      // switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
      // switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
      // switchWidthMultiplier={2} // multipled by the `circleSize` prop to calculate total width of the Switch
    />
  );
};

export default SwitchComponent;
