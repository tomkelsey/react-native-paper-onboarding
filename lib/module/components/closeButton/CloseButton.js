import React, { useMemo, memo, useRef } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { round } from 'react-native-reanimated';
import { useValues, get } from 'react-native-redash';
import { styles } from './styles';
export const CloseButtonComponent = ({
  data,
  safeInsets,
  animatedIndex,
  closeButton,
  closeButtonText,
  closeButtonTextStyle: textStyleOverride,
  onCloseButtonPress
}) => {
  const containerRef = useRef(null); //#region animations

  const animatedShowButtonOpacityValues = useValues(...data.map((item, index) => index === data.length - 1 || item.showCloseButton ? 1 : 0));
  const animatedShowButtonPointerEventValues = useValues(...data.map((item, index) => index === data.length - 1 || item.showCloseButton ? 'auto' : 'none'));
  const defaultShowButtonOpacity = new Animated.Value(0);
  const defaultShowButtonPointerEvent = new Animated.Value('none');
  const animatedShowButtonOpacity = get(animatedShowButtonOpacityValues, round(animatedIndex), defaultShowButtonOpacity);
  const animatedShowButtonPointerEvent = get( // @ts-ignore
  animatedShowButtonPointerEventValues, round(animatedIndex), defaultShowButtonPointerEvent); //#endregion
  //#region styles

  const containerStyle = useMemo(() => [styles.container, {
    opacity: animatedShowButtonOpacity,
    top: safeInsets.top
  }], // eslint-disable-next-line react-hooks/exhaustive-deps
  [safeInsets]);
  const textStyle = useMemo(() => [styles.text, textStyleOverride], [textStyleOverride]); //#endregion

  return /*#__PURE__*/React.createElement(Animated.View, {
    ref: containerRef,
    pointerEvents: animatedShowButtonPointerEvent,
    style: containerStyle
  }, closeButton ? typeof closeButton === 'function' ? closeButton() : closeButton : /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onCloseButtonPress
  }, /*#__PURE__*/React.createElement(Text, {
    style: textStyle
  }, closeButtonText)));
};
const CloseButton = /*#__PURE__*/memo(CloseButtonComponent);
export default CloseButton;
//# sourceMappingURL=CloseButton.js.map