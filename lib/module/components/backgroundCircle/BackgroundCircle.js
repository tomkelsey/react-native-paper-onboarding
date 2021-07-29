import React, { memo, useMemo } from 'react';
import { I18nManager } from 'react-native';
import { Circle } from 'react-native-svg';
import Animated, { add, Extrapolate } from 'react-native-reanimated';

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const BackgroundCircleComponent = ({
  index,
  animatedIndex,
  color,
  extendedSize,
  bottomPosition,
  screenDimensions,
  indicatorSize,
  animatedIndicatorsContainerPosition
}) => {
  //#region variables
  //#endregion
  //#region animations
  const animatedFocus = useMemo(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 2],
    extrapolate: Extrapolate.CLAMP
  }), [animatedIndex, index]);
  const animatedRadius = useMemo(() => interpolate(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [0, extendedSize],
    extrapolate: Extrapolate.CLAMP
  }), [animatedFocus, extendedSize]);
  const animatedLeftPosition = useMemo(() => add(animatedIndicatorsContainerPosition, indicatorSize / 2, I18nManager.isRTL ? -((index + 1) * indicatorSize) : index * indicatorSize, I18nManager.isRTL ? screenDimensions.width : 0), [animatedIndicatorsContainerPosition, index, indicatorSize, screenDimensions.width]); //#endregion
  // render

  return /*#__PURE__*/React.createElement(AnimatedCircle, {
    r: animatedRadius,
    cy: bottomPosition,
    cx: animatedLeftPosition,
    fill: color
  });
};

const BackgroundCircle = /*#__PURE__*/memo(BackgroundCircleComponent);
export default BackgroundCircle;
//# sourceMappingURL=BackgroundCircle.js.map