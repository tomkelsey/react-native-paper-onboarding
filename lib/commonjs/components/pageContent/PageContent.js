"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _color = _interopRequireDefault(require("color"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;

const SCREEN_HEIGHT = _reactNative.Dimensions.get('window').height;

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
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }); //#endregion
  //#region styles

  const titleStyle = (0, _react.useMemo)(() => [_styles.styles.title, titleStyleOverride], [titleStyleOverride]);
  const descriptionStyle = (0, _react.useMemo)(() => [_styles.styles.description, descriptionStyleOverride], [descriptionStyleOverride]);
  const imageContainerStyle = (0, _react.useMemo)(() => [_styles.styles.imageContainer, {
    transform: [{
      translateY: animatedImageTopPosition
    }]
  }], [animatedImageTopPosition]);
  console.log('next: ', next);
  const nextStyle = (0, _react.useMemo)(() => [_styles.styles.next, {
    backgroundColor: (0, _color.default)(backgroundColor).darken(0.2).string()
  }], [backgroundColor]); //#endregion

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, image && /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: imageContainerStyle
  }, typeof image === 'function' ? image() : image), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: titleStyle
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: descriptionStyle
  }, description), /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onButtonPress || next,
    style: nextStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: _styles.styles.nextText
  }, buttonText)));
};

const PageContent = /*#__PURE__*/(0, _react.memo)(PageContentComponent);
var _default = PageContent;
exports.default = _default;
//# sourceMappingURL=PageContent.js.map