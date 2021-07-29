import React, { memo, useMemo } from 'react';
import Svg from 'react-native-svg';
import BackgroundCircle from '../backgroundCircle';
import { calculateRectangleCircleRadius } from '../../utils/math';
import { styles } from './styles';

const BackgroundComponent = ({
  animatedIndex,
  data,
  screenDimensions,
  safeInsets,
  indicatorSize,
  animatedIndicatorsContainerPosition
}) => {
  //#region variables
  const extendedSize = useMemo(() => {
    return calculateRectangleCircleRadius({
      width: screenDimensions.width,
      height: screenDimensions.height,
      indicatorX: safeInsets.bottom,
      indicatorY: 0
    });
  }, [screenDimensions, safeInsets]);
  const bottomPosition = useMemo(() => screenDimensions.height - indicatorSize / 2 - safeInsets.bottom, [screenDimensions, indicatorSize, safeInsets]); //#endregion
  // render

  return /*#__PURE__*/React.createElement(Svg, {
    style: styles.container,
    pointerEvents: "none"
  }, data.map((item, index) => {
    return /*#__PURE__*/React.createElement(BackgroundCircle, {
      key: `circle-${index}`,
      index: index,
      animatedIndex: animatedIndex,
      color: item.backgroundColor,
      extendedSize: extendedSize,
      bottomPosition: bottomPosition,
      screenDimensions: screenDimensions,
      indicatorSize: indicatorSize,
      animatedIndicatorsContainerPosition: animatedIndicatorsContainerPosition
    });
  }));
};

const Background = /*#__PURE__*/memo(BackgroundComponent);
export default Background;
//# sourceMappingURL=Background.js.map