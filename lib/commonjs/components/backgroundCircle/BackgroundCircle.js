"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeSvg = require("react-native-svg");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;

const AnimatedCircle = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Circle);

const BackgroundCircleComponent = ({
  index,
  animatedIndex,
  color,
  extendedSize,
  bottomPosition,
  screenDimensions,
  indicatorSize,
  animatedIndicatorsContainerPosition
}) => {
  //#region variables
  //#endregion
  //#region animations
  const animatedFocus = (0, _react.useMemo)(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0, 1, 2],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedIndex, index]);
  const animatedRadius = (0, _react.useMemo)(() => interpolate(animatedFocus, {
    inputRange: [0, 1],
    outputRange: [0, extendedSize],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedFocus, extendedSize]);
  const animatedLeftPosition = (0, _react.useMemo)(() => (0, _reactNativeReanimated.add)(animatedIndicatorsContainerPosition, indicatorSize / 2, _reactNative.I18nManager.isRTL ? -((index + 1) * indicatorSize) : index * indicatorSize, _reactNative.I18nManager.isRTL ? screenDimensions.width : 0), [animatedIndicatorsContainerPosition, index, indicatorSize, screenDimensions.width]); //#endregion
  // render

  return /*#__PURE__*/_react.default.createElement(AnimatedCircle, {
    r: animatedRadius,
    cy: bottomPosition,
    cx: animatedLeftPosition,
    fill: color
  });
};

const BackgroundCircle = /*#__PURE__*/(0, _react.memo)(BackgroundCircleComponent);
var _default = BackgroundCircle;
exports.default = _default;
//# sourceMappingURL=BackgroundCircle.js.map