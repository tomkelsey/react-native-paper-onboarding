import React, { useMemo, useRef, useCallback, memo, useState, forwardRef, useImperativeHandle } from 'react';
import { Dimensions, I18nManager } from 'react-native';
import { usePanGestureHandler, useValue } from 'react-native-redash';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { add, useCode, onChange, call } from 'react-native-reanimated';
import Background from './components/background';
import Page from './components/page';
import IndicatorsContainer from './components/indicatorsContainer';
import CloseButton from './components/closeButton';
import { useTiming } from './useTiming';
import { DEFAULT_SAFE_INSET, DEFAULT_DIRECTION, DEFAULT_INDICATOR_SIZE, DEFAULT_INDICATOR_BORDER_COLOR, DEFAULT_INDICATOR_BACKGROUND_COLOR, DEFAULT_CLOSE_BUTTON_TEXT, DEFAULT_CLOSE_BUTTON_CALLBACK } from './constants';
import { styles } from './styles';
// @ts-ignore
Animated.addWhitelistedUIProps({
  cx: true,
  cy: true,
  r: true,
  fillOpacity: true,
  pointerEvents: true
});

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;
const PaperOnboardingComponent = /*#__PURE__*/forwardRef(({
  data,
  safeInsets: _safeInsets,
  direction = DEFAULT_DIRECTION,
  // indicator config
  indicatorSize = DEFAULT_INDICATOR_SIZE,
  indicatorBackgroundColor = DEFAULT_INDICATOR_BACKGROUND_COLOR,
  indicatorBorderColor = DEFAULT_INDICATOR_BORDER_COLOR,
  // override styles
  titleStyle,
  descriptionStyle,
  // close button config
  closeButton,
  closeButtonTextStyle,
  closeButtonText = DEFAULT_CLOSE_BUTTON_TEXT,
  onCloseButtonPress = DEFAULT_CLOSE_BUTTON_CALLBACK,
  onIndexChange
}, ref) => {
  // state
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }); // refs

  const indexRef = useRef(0);
  const pagesRef = useRef(data.map(() => null)); //#region variables

  const safeInsets = useMemo(() => {
    var _safeInsets$top, _safeInsets$bottom, _safeInsets$left, _safeInsets$right;

    return {
      top: (_safeInsets$top = _safeInsets === null || _safeInsets === void 0 ? void 0 : _safeInsets.top) !== null && _safeInsets$top !== void 0 ? _safeInsets$top : DEFAULT_SAFE_INSET,
      bottom: (_safeInsets$bottom = _safeInsets === null || _safeInsets === void 0 ? void 0 : _safeInsets.bottom) !== null && _safeInsets$bottom !== void 0 ? _safeInsets$bottom : DEFAULT_SAFE_INSET,
      left: (_safeInsets$left = _safeInsets === null || _safeInsets === void 0 ? void 0 : _safeInsets.left) !== null && _safeInsets$left !== void 0 ? _safeInsets$left : DEFAULT_SAFE_INSET,
      right: (_safeInsets$right = _safeInsets === null || _safeInsets === void 0 ? void 0 : _safeInsets.right) !== null && _safeInsets$right !== void 0 ? _safeInsets$right : DEFAULT_SAFE_INSET
    };
  }, [_safeInsets]);
  const indicatorsContainerLeftPadding = useMemo(() => {
    const containerLeftPadding = dimensions.width / 2 - indicatorSize / 2;
    return I18nManager.isRTL ? -containerLeftPadding + indicatorSize * (data.length - 1) : containerLeftPadding;
  }, [dimensions.width, indicatorSize, data.length]); //#endregion
  //#region animated variables

  const {
    gestureHandler,
    state,
    translation,
    velocity
  } = usePanGestureHandler();
  const animatedStaticIndex = useValue(0);
  const animatedOverrideIndex = useValue(0);
  const animatedIndex = useTiming({
    animatedStaticIndex,
    animatedOverrideIndex,
    value: direction === 'horizontal' ? translation.x : translation.y,
    velocity: direction === 'horizontal' ? velocity.x : velocity.y,
    state: state,
    size: data.length,
    screenWidth: dimensions.width
  });
  const indicatorsContainerPosition = useMemo(() => data.map((_, index) => index * indicatorSize * -1), [data, indicatorSize]);
  const animatedIndicatorsContainerPosition = useMemo(() => add(interpolate(animatedIndex, {
    inputRange: data.map((_, index) => index),
    outputRange: I18nManager.isRTL ? indicatorsContainerPosition.reverse() : indicatorsContainerPosition,
    extrapolate: Animated.Extrapolate.CLAMP
  }), indicatorsContainerLeftPadding), [data, animatedIndex, indicatorsContainerLeftPadding, indicatorsContainerPosition]); //#endregion
  //#region callbacks

  const handlePageRef = useCallback((pageRef, index) => {
    pagesRef.current[index] = pageRef;
  }, []);
  const handleOnLayout = useCallback(({
    nativeEvent: {
      layout: {
        width,
        height
      }
    }
  }) => {
    setDimensions({
      width,
      height
    });
  }, []); //#endregion
  //#region public methods

  const handleNavigateToNextPage = useCallback(() => {
    const currentIndex = indexRef.current;

    if (currentIndex === data.length - 1) {
      return;
    }

    animatedOverrideIndex.setValue(currentIndex + 1);
  }, [data, animatedOverrideIndex]);
  const handleNavigateToPreviousPage = useCallback(() => {
    const currentIndex = indexRef.current;

    if (currentIndex === 0) {
      return;
    }

    animatedOverrideIndex.setValue(currentIndex - 1);
  }, [animatedOverrideIndex]);
  useImperativeHandle(ref, () => ({
    next: handleNavigateToNextPage,
    previous: handleNavigateToPreviousPage
  }), [handleNavigateToNextPage, handleNavigateToPreviousPage]); //#endregion
  //#region effects

  useCode(() => onChange(animatedStaticIndex, call([animatedStaticIndex], args => {
    indexRef.current = args[0];
    /**
     * @DEV
     * here we directly manipulate pages native props by setting `pointerEvents`
     * to `auto` for current page and `none` for others.
     */

    pagesRef.current.map((pageRef, _index) => {
      // @ts-ignore
      pageRef.setNativeProps({
        pointerEvents: _index === args[0] ? 'auto' : 'none'
      });
    });

    if (onIndexChange) {
      onIndexChange(args[0]);
    }
  })), []); //#endregion
  // renders

  return /*#__PURE__*/React.createElement(PanGestureHandler, gestureHandler, /*#__PURE__*/React.createElement(Animated.View, {
    onLayout: handleOnLayout,
    style: styles.container
  }, /*#__PURE__*/React.createElement(Background, {
    animatedIndex: animatedIndex,
    data: data,
    safeInsets: safeInsets,
    screenDimensions: dimensions,
    indicatorSize: indicatorSize,
    animatedIndicatorsContainerPosition: animatedIndicatorsContainerPosition
  }), data.map((item, index) => /*#__PURE__*/React.createElement(Page, {
    key: `page-${index}`,
    index: index,
    item: item,
    next: handleNavigateToNextPage,
    animatedIndex: animatedIndex,
    indicatorSize: indicatorSize,
    titleStyle: titleStyle,
    descriptionStyle: descriptionStyle,
    safeInsets: safeInsets,
    screenDimensions: dimensions,
    handleRef: handlePageRef
  })), /*#__PURE__*/React.createElement(IndicatorsContainer, {
    data: data,
    animatedIndex: animatedIndex,
    animatedIndicatorsContainerPosition: animatedIndicatorsContainerPosition,
    indicatorSize: indicatorSize,
    indicatorBackgroundColor: indicatorBackgroundColor,
    indicatorBorderColor: indicatorBorderColor,
    safeInsets: safeInsets
  }), /*#__PURE__*/React.createElement(CloseButton, {
    data: data,
    animatedIndex: animatedIndex,
    safeInsets: safeInsets,
    closeButtonText: closeButtonText,
    closeButtonTextStyle: closeButtonTextStyle,
    closeButton: closeButton,
    onCloseButtonPress: onCloseButtonPress
  })));
});
const PaperOnboarding = /*#__PURE__*/memo(PaperOnboardingComponent);
export default PaperOnboarding;
//# sourceMappingURL=PaperOnboarding.js.map