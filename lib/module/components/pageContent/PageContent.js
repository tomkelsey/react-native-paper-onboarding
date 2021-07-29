import React, { useMemo, memo } from 'react';
import { Text, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import Color from 'color';
import { styles } from './styles';

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const PageContentComponent = ({
  animatedFocus,
  image,
  title,
  next,
  buttonText = 'Next',
  onButtonPress,
  description,
  backgroundColor,
  titleStyle: titleStyleOverride,
  descriptionStyle: descriptionStyleOverride
}) => {
  //#region
  const animatedImageTopPosition = interpolate(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT / 8, 0],
    extrapolate: Extrapolate.CLAMP
  }); //#endregion
  //#region styles

  const titleStyle = useMemo(() => [styles.title, titleStyleOverride], [titleStyleOverride]);
  const descriptionStyle = useMemo(() => [styles.description, descriptionStyleOverride], [descriptionStyleOverride]);
  const imageContainerStyle = useMemo(() => [styles.imageContainer, {
    transform: [{
      translateY: animatedImageTopPosition
    }]
  }], [animatedImageTopPosition]);
  console.log('next: ', next);
  const nextStyle = useMemo(() => [styles.next, {
    backgroundColor: Color(backgroundColor).darken(0.2).string()
  }], [backgroundColor]); //#endregion

  return /*#__PURE__*/React.createElement(React.Fragment, null, image && /*#__PURE__*/React.createElement(Animated.View, {
    style: imageContainerStyle
  }, typeof image === 'function' ? image() : image), /*#__PURE__*/React.createElement(Text, {
    style: titleStyle
  }, title), /*#__PURE__*/React.createElement(Text, {
    style: descriptionStyle
  }, description), /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onButtonPress || next,
    style: nextStyle
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.nextText
  }, buttonText)));
};

const PageContent = /*#__PURE__*/memo(PageContentComponent);
export default PageContent;
//# sourceMappingURL=PageContent.js.map