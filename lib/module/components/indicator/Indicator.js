import React, { useMemo, useCallback, memo } from 'react';
import Animated, { Extrapolate } from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';
import { styles } from './styles';

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const BORDER_WIDTH = 2;

const IndicatorComponent = ({
  index,
  indicatorSize,
  indicatorBackgroundColor,
  indicatorBorderColor,
  animatedIndex,
  item
}) => {
  const radius = useMemo(() => (indicatorSize - 2) / 2, [indicatorSize]); //#region animation

  const animatedRadius = useMemo(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [radius * 0.33, radius, radius * 0.33],
    extrapolate: Extrapolate.CLAMP
  }), [animatedIndex, index, radius]);
  const animatedIconScale = useMemo(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1 * 0.33, 1, 1 * 0.33],
    extrapolate: Extrapolate.CLAMP
  }), [animatedIndex, index]);
  const animatedIconOpacity = useMemo(() => interpolate(animatedIndex, {
    inputRange: [index - 0.25, index, index + 0.25],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP
  }), [animatedIndex, index]);
  const animatedCircleFillOpacity = useMemo(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index],
    outputRange: [0, 1],
    extrapolate: Extrapolate.CLAMP
  }), [animatedIndex, index]); //#endregion
  //#region styles

  const containerStyle = useMemo(() => ({ ...styles.container,
    ...{
      width: indicatorSize,
      height: indicatorSize
    }
  }), [indicatorSize]);
  const iconStyle = useMemo(() => ({ ...styles.iconContainer,
    ...{
      left: BORDER_WIDTH * 2,
      right: BORDER_WIDTH * 2,
      top: BORDER_WIDTH * 2,
      bottom: BORDER_WIDTH * 2,
      borderRadius: indicatorSize,
      opacity: animatedIconOpacity,
      transform: [{
        scale: animatedIconScale
      }]
    }
  }), [animatedIconOpacity, animatedIconScale, indicatorSize]); //#endregion
  // renders

  const renderIcon = useCallback(() => {
    if (item.icon) {
      const IconComponent = item.icon;
      return /*#__PURE__*/React.createElement(Animated.View, {
        style: iconStyle
      }, typeof IconComponent === 'function' ? IconComponent({
        size: indicatorSize / 2
      }) : /*#__PURE__*/React.createElement(IconComponent, {
        size: indicatorSize / 2
      }));
    }

    return null;
  }, [item, indicatorSize, iconStyle]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: containerStyle
  }, /*#__PURE__*/React.createElement(Svg, {
    width: indicatorSize,
    height: indicatorSize,
    viewBox: `0 0 ${indicatorSize} ${indicatorSize}`
  }, /*#__PURE__*/React.createElement(AnimatedCircle, {
    r: animatedRadius,
    cx: indicatorSize / 2,
    cy: indicatorSize / 2 // @ts-ignore
    ,
    fill: indicatorBackgroundColor,
    fillOpacity: animatedCircleFillOpacity,
    stroke: indicatorBorderColor,
    strokeWidth: BORDER_WIDTH
  })), renderIcon());
};

const Indicator = /*#__PURE__*/memo(IndicatorComponent);
export default Indicator;
//# sourceMappingURL=Indicator.js.map