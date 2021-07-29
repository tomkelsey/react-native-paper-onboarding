import React, { useMemo, memo } from 'react';
import { Text, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { Extrapolate } from 'react-native-reanimated';
import Color from 'color';
import { styles } from './styles';
import type { PageContentProps } from '../../types';

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2,
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
  descriptionStyle: descriptionStyleOverride,
}: PageContentProps) => {
  //#region
  const animatedImageTopPosition = interpolate(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT / 8, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  //#endregion

  //#region styles
  const titleStyle = useMemo(
    () => [styles.title, titleStyleOverride],
    [titleStyleOverride]
  );

  const descriptionStyle = useMemo(
    () => [styles.description, descriptionStyleOverride],
    [descriptionStyleOverride]
  );

  const imageContainerStyle: any = useMemo(
    () => [
      styles.imageContainer,
      {
        transform: [{ translateY: animatedImageTopPosition }],
      },
    ],
    [animatedImageTopPosition]
  );

  console.log('next: ', next);
  const nextStyle = useMemo(
    () => [
      styles.next,
      { backgroundColor: Color(backgroundColor).darken(0.2).string() },
    ],
    [backgroundColor]
  );

  //#endregion
  return (
    <>
      {image && (
        <Animated.View style={imageContainerStyle}>
          {typeof image === 'function' ? image() : image}
        </Animated.View>
      )}
      <Text style={titleStyle}>{title}</Text>
      <Text style={descriptionStyle}>{description}</Text>
      <TouchableOpacity onPress={onButtonPress || next} style={nextStyle}>
        <Text style={styles.nextText}>{buttonText}</Text>
      </TouchableOpacity>
    </>
  );
};

const PageContent = memo(PageContentComponent);

export default PageContent;
