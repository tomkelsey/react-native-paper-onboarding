import React, { useMemo, useCallback, memo } from 'react';
import Animated, { Extrapolate } from 'react-native-reanimated';
import PageContent from '../pageContent/PageContent';
import { styles } from './styles';

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;

const PageComponent = ({
  index,
  item,
  animatedIndex,
  indicatorSize,
  next,
  titleStyle: titleStyleOverride,
  descriptionStyle: descriptionStyleOverride,
  screenDimensions,
  safeInsets,
  handleRef
}) => {
  //#region animation
  const animatedFocus = useMemo(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 2],
    extrapolate: Extrapolate.CLAMP
  }), [animatedIndex, index]);
  const animatedContentOpacity = useMemo(() => interpolate(animatedFocus, {
    inputRange: [0.5, 1, 1.5],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP
  }), [animatedFocus]);
  const animatedContentTopPosition = useMemo(() => interpolate(animatedFocus, {
    inputRange: [0, 1, 2],
    outputRange: [screenDimensions.height / 8, 0, screenDimensions.height / 6 * -1],
    extrapolate: Extrapolate.CLAMP
  }), [animatedFocus, screenDimensions.height]); //#endregion
  //#region styles

  const contentContainerStyle = useMemo(() => [styles.contentContainer, {
    marginTop: safeInsets.top,
    marginRight: safeInsets.right,
    marginLeft: safeInsets.left,
    marginBottom: safeInsets.bottom + indicatorSize + safeInsets.bottom,
    opacity: animatedContentOpacity,
    transform: [{
      translateY: animatedContentTopPosition
    }]
  }], [animatedContentOpacity, animatedContentTopPosition, safeInsets, indicatorSize]);
  const titleStyle = useMemo(() => [titleStyleOverride, item.titleStyle ? item.titleStyle : null], [item, titleStyleOverride]);
  const descriptionStyle = useMemo(() => [descriptionStyleOverride, item.descriptionStyle ? item.descriptionStyle : null], [item, descriptionStyleOverride]); //#endregion
  //#region memo

  const pageContentProps = useMemo(() => ({
    index,
    animatedFocus,
    image: item.image,
    title: item.title,
    description: item.description,
    backgroundColor: item.backgroundColor,
    titleStyle,
    descriptionStyle,
    buttonText: item.buttonText,
    onButtonPress: item.onButtonPress,
    next
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [index, item, titleStyle, descriptionStyle]); //#endregion
  //#region callbacks

  const handleContainerRef = useCallback(ref => handleRef(ref, index), [index, handleRef]); //#endregion
  // render

  const renderContent = useCallback(() => {
    const ContentComponent = item.content;
    return ContentComponent ? typeof ContentComponent === 'function' ? ContentComponent(pageContentProps) : /*#__PURE__*/React.createElement(ContentComponent, pageContentProps) : /*#__PURE__*/React.createElement(PageContent, pageContentProps);
  }, [item, pageContentProps]);
  return /*#__PURE__*/React.createElement(Animated.View, {
    pointerEvents: index === 0 ? 'auto' : 'none',
    ref: handleContainerRef,
    style: styles.container
  }, /*#__PURE__*/React.createElement(Animated.View, {
    style: contentContainerStyle
  }, renderContent()));
};

const Page = /*#__PURE__*/memo(PageComponent);
export default Page;
//# sourceMappingURL=Page.js.map