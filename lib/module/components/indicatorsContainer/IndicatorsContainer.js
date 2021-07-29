import React, { useMemo, useCallback, memo } from 'react';
import Animated from 'react-native-reanimated';
import Indicator from '../indicator';
import { styles } from './styles';

const IndicatorsContainerComponent = ({
  data,
  animatedIndex,
  animatedIndicatorsContainerPosition,
  indicatorSize,
  indicatorBackgroundColor,
  indicatorBorderColor,
  safeInsets
}) => {
  // variables
  const containerWidth = useMemo(() => {
    return data.length * indicatorSize;
  }, [data, indicatorSize]); // style

  const containerStyle = useMemo(() => [styles.container, {
    width: containerWidth,
    height: indicatorSize,
    bottom: safeInsets.bottom,
    transform: [{
      translateX: animatedIndicatorsContainerPosition
    }]
  }], [containerWidth, indicatorSize, animatedIndicatorsContainerPosition, safeInsets]); // renders

  const renderIndicators = useCallback(() => data.map((item, index) => {
    return /*#__PURE__*/React.createElement(Indicator, {
      key: `item-${index}`,
      indicatorSize: indicatorSize,
      indicatorBackgroundColor: indicatorBackgroundColor,
      indicatorBorderColor: indicatorBorderColor,
      index: index,
      item: item,
      animatedIndex: animatedIndex
    });
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [data, indicatorSize, indicatorBackgroundColor, indicatorBorderColor]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    style: containerStyle
  }, renderIndicators());
};

const IndicatorsContainer = /*#__PURE__*/memo(IndicatorsContainerComponent);
export default IndicatorsContainer;
//# sourceMappingURL=IndicatorsContainer.js.map