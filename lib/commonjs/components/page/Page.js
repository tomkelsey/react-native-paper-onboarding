"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _PageContent = _interopRequireDefault(require("../pageContent/PageContent"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  const animatedFocus = (0, _react.useMemo)(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 2],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedIndex, index]);
  const animatedContentOpacity = (0, _react.useMemo)(() => interpolate(animatedFocus, {
    inputRange: [0.5, 1, 1.5],
    outputRange: [0, 1, 0],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedFocus]);
  const animatedContentTopPosition = (0, _react.useMemo)(() => interpolate(animatedFocus, {
    inputRange: [0, 1, 2],
    outputRange: [screenDimensions.height / 8, 0, screenDimensions.height / 6 * -1],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedFocus, screenDimensions.height]); //#endregion
  //#region styles

  const contentContainerStyle = (0, _react.useMemo)(() => [_styles.styles.contentContainer, {
    marginTop: safeInsets.top,
    marginRight: safeInsets.right,
    marginLeft: safeInsets.left,
    marginBottom: safeInsets.bottom + indicatorSize + safeInsets.bottom,
    opacity: animatedContentOpacity,
    transform: [{
      translateY: animatedContentTopPosition
    }]
  }], [animatedContentOpacity, animatedContentTopPosition, safeInsets, indicatorSize]);
  const titleStyle = (0, _react.useMemo)(() => [titleStyleOverride, item.titleStyle ? item.titleStyle : null], [item, titleStyleOverride]);
  const descriptionStyle = (0, _react.useMemo)(() => [descriptionStyleOverride, item.descriptionStyle ? item.descriptionStyle : null], [item, descriptionStyleOverride]); //#endregion
  //#region memo

  const pageContentProps = (0, _react.useMemo)(() => ({
    index,
    animatedFocus,
    image: item.image,
    title: item.title,
    description: item.description,
    backgroundColor: item.backgroundColor,
    titleStyle,
    descriptionStyle,
    buttonText: item.buttonText,
    buttonColor: item.buttonColor,
    onButtonPress: item.onButtonPress,
    next
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [index, item, titleStyle, descriptionStyle]); //#endregion
  //#region callbacks

  const handleContainerRef = (0, _react.useCallback)(ref => handleRef(ref, index), [index, handleRef]); //#endregion
  // render

  const renderContent = (0, _react.useCallback)(() => {
    const ContentComponent = item.content;
    return ContentComponent ? typeof ContentComponent === 'function' ? ContentComponent(pageContentProps) : /*#__PURE__*/_react.default.createElement(ContentComponent, pageContentProps) : /*#__PURE__*/_react.default.createElement(_PageContent.default, pageContentProps);
  }, [item, pageContentProps]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    pointerEvents: index === 0 ? 'auto' : 'none',
    ref: handleContainerRef,
    style: _styles.styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: contentContainerStyle
  }, renderContent()));
};

const Page = /*#__PURE__*/(0, _react.memo)(PageComponent);
var _default = Page;
exports.default = _default;
//# sourceMappingURL=Page.js.map