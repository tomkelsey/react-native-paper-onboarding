"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeRedash = require("react-native-redash");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _background = _interopRequireDefault(require("./components/background"));

var _page = _interopRequireDefault(require("./components/page"));

var _indicatorsContainer = _interopRequireDefault(require("./components/indicatorsContainer"));

var _closeButton = _interopRequireDefault(require("./components/closeButton"));

var _useTiming = require("./useTiming");

var _constants = require("./constants");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// @ts-ignore
_reactNativeReanimated.default.addWhitelistedUIProps({
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
const PaperOnboardingComponent = /*#__PURE__*/(0, _react.forwardRef)(({
  data,
  safeInsets: _safeInsets,
  direction = _constants.DEFAULT_DIRECTION,
  // indicator config
  indicatorSize = _constants.DEFAULT_INDICATOR_SIZE,
  indicatorBackgroundColor = _constants.DEFAULT_INDICATOR_BACKGROUND_COLOR,
  indicatorBorderColor = _constants.DEFAULT_INDICATOR_BORDER_COLOR,
  // override styles
  titleStyle,
  descriptionStyle,
  // close button config
  closeButton,
  closeButtonTextStyle,
  closeButtonText = _constants.DEFAULT_CLOSE_BUTTON_TEXT,
  onCloseButtonPress = _constants.DEFAULT_CLOSE_BUTTON_CALLBACK,
  onIndexChange
}, ref) => {
  // state
  const [dimensions, setDimensions] = (0, _react.useState)({
    width: _reactNative.Dimensions.get('window').width,
    height: _reactNative.Dimensions.get('window').height
  }); // refs

  const indexRef = (0, _react.useRef)(0);
  const pagesRef = (0, _react.useRef)(data.map(() => null)); //#region variables

  const safeInsets = (0, _react.useMemo)(() => {
    var _safeInsets$top, _safeInsets$bottom, _safeInsets$left, _safeInsets$right;

    return {
      top: (_safeInsets$top = _safeInsets === null || _safeInsets === void 0 ? void 0 : _safeInsets.top) !== null && _safeInsets$top !== void 0 ? _safeInsets$top : _constants.DEFAULT_SAFE_INSET,
      bottom: (_safeInsets$bottom = _safeInsets === null || _safeInsets === void 0 ? void 0 : _safeInsets.bottom) !== null && _safeInsets$bottom !== void 0 ? _safeInsets$bottom : _constants.DEFAULT_SAFE_INSET,
      left: (_safeInsets$left = _safeInsets === null || _safeInsets === void 0 ? void 0 : _safeInsets.left) !== null && _safeInsets$left !== void 0 ? _safeInsets$left : _constants.DEFAULT_SAFE_INSET,
      right: (_safeInsets$right = _safeInsets === null || _safeInsets === void 0 ? void 0 : _safeInsets.right) !== null && _safeInsets$right !== void 0 ? _safeInsets$right : _constants.DEFAULT_SAFE_INSET
    };
  }, [_safeInsets]);
  const indicatorsContainerLeftPadding = (0, _react.useMemo)(() => {
    const containerLeftPadding = dimensions.width / 2 - indicatorSize / 2;
    return _reactNative.I18nManager.isRTL ? -containerLeftPadding + indicatorSize * (data.length - 1) : containerLeftPadding;
  }, [dimensions.width, indicatorSize, data.length]); //#endregion
  //#region animated variables

  const {
    gestureHandler,
    state,
    translation,
    velocity
  } = (0, _reactNativeRedash.usePanGestureHandler)();
  const animatedStaticIndex = (0, _reactNativeRedash.useValue)(0);
  const animatedOverrideIndex = (0, _reactNativeRedash.useValue)(0);
  const animatedIndex = (0, _useTiming.useTiming)({
    animatedStaticIndex,
    animatedOverrideIndex,
    value: direction === 'horizontal' ? translation.x : translation.y,
    velocity: direction === 'horizontal' ? velocity.x : velocity.y,
    state: state,
    size: data.length,
    screenWidth: dimensions.width
  });
  const indicatorsContainerPosition = (0, _react.useMemo)(() => data.map((_, index) => index * indicatorSize * -1), [data, indicatorSize]);
  const animatedIndicatorsContainerPosition = (0, _react.useMemo)(() => (0, _reactNativeReanimated.add)(interpolate(animatedIndex, {
    inputRange: data.map((_, index) => index),
    outputRange: _reactNative.I18nManager.isRTL ? indicatorsContainerPosition.reverse() : indicatorsContainerPosition,
    extrapolate: _reactNativeReanimated.default.Extrapolate.CLAMP
  }), indicatorsContainerLeftPadding), [data, animatedIndex, indicatorsContainerLeftPadding, indicatorsContainerPosition]); //#endregion
  //#region callbacks

  const handlePageRef = (0, _react.useCallback)((pageRef, index) => {
    pagesRef.current[index] = pageRef;
  }, []);
  const handleOnLayout = (0, _react.useCallback)(({
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

  const handleNavigateToNextPage = (0, _react.useCallback)(() => {
    const currentIndex = indexRef.current;

    if (currentIndex === data.length - 1) {
      return;
    }

    animatedOverrideIndex.setValue(currentIndex + 1);
  }, [data, animatedOverrideIndex]);
  const handleNavigateToPreviousPage = (0, _react.useCallback)(() => {
    const currentIndex = indexRef.current;

    if (currentIndex === 0) {
      return;
    }

    animatedOverrideIndex.setValue(currentIndex - 1);
  }, [animatedOverrideIndex]);
  (0, _react.useImperativeHandle)(ref, () => ({
    next: handleNavigateToNextPage,
    previous: handleNavigateToPreviousPage
  }), [handleNavigateToNextPage, handleNavigateToPreviousPage]); //#endregion
  //#region effects

  (0, _reactNativeReanimated.useCode)(() => (0, _reactNativeReanimated.onChange)(animatedStaticIndex, (0, _reactNativeReanimated.call)([animatedStaticIndex], args => {
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

  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.PanGestureHandler, gestureHandler, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    onLayout: handleOnLayout,
    style: _styles.styles.container
  }, /*#__PURE__*/_react.default.createElement(_background.default, {
    animatedIndex: animatedIndex,
    data: data,
    safeInsets: safeInsets,
    screenDimensions: dimensions,
    indicatorSize: indicatorSize,
    animatedIndicatorsContainerPosition: animatedIndicatorsContainerPosition
  }), data.map((item, index) => /*#__PURE__*/_react.default.createElement(_page.default, {
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
  })), /*#__PURE__*/_react.default.createElement(_indicatorsContainer.default, {
    data: data,
    animatedIndex: animatedIndex,
    animatedIndicatorsContainerPosition: animatedIndicatorsContainerPosition,
    indicatorSize: indicatorSize,
    indicatorBackgroundColor: indicatorBackgroundColor,
    indicatorBorderColor: indicatorBorderColor,
    safeInsets: safeInsets
  }), /*#__PURE__*/_react.default.createElement(_closeButton.default, {
    data: data,
    animatedIndex: animatedIndex,
    safeInsets: safeInsets,
    closeButtonText: closeButtonText,
    closeButtonTextStyle: closeButtonTextStyle,
    closeButton: closeButton,
    onCloseButtonPress: onCloseButtonPress
  })));
});
const PaperOnboarding = /*#__PURE__*/(0, _react.memo)(PaperOnboardingComponent);
var _default = PaperOnboarding;
exports.default = _default;
//# sourceMappingURL=PaperOnboarding.js.map