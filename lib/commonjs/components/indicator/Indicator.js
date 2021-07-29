"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSvg = require("react-native-svg");

var _styles = require("./styles");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;

const AnimatedCircle = _reactNativeReanimated.default.createAnimatedComponent(_reactNativeSvg.Circle);

const BORDER_WIDTH = 2;

const IndicatorComponent = ({
  index,
  indicatorSize,
  indicatorBackgroundColor,
  indicatorBorderColor,
  animatedIndex,
  item
}) => {
  const radius = (0, _react.useMemo)(() => (indicatorSize - 2) / 2, [indicatorSize]); //#region animation

  const animatedRadius = (0, _react.useMemo)(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [radius * 0.33, radius, radius * 0.33],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedIndex, index, radius]);
  const animatedIconScale = (0, _react.useMemo)(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1 * 0.33, 1, 1 * 0.33],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedIndex, index]);
  const animatedIconOpacity = (0, _react.useMemo)(() => interpolate(animatedIndex, {
    inputRange: [index - 0.25, index, index + 0.25],
    outputRange: [0, 1, 0],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedIndex, index]);
  const animatedCircleFillOpacity = (0, _react.useMemo)(() => interpolate(animatedIndex, {
    inputRange: [index - 1, index],
    outputRange: [0, 1],
    extrapolate: _reactNativeReanimated.Extrapolate.CLAMP
  }), [animatedIndex, index]); //#endregion
  //#region styles

  const containerStyle = (0, _react.useMemo)(() => ({ ..._styles.styles.container,
    ...{
      width: indicatorSize,
      height: indicatorSize
    }
  }), [indicatorSize]);
  const iconStyle = (0, _react.useMemo)(() => ({ ..._styles.styles.iconContainer,
    ...{
      left: BORDER_WIDTH * 2,
      right: BORDER_WIDTH * 2,
      top: BORDER_WIDTH * 2,
      bottom: BORDER_WIDTH * 2,
      borderRadius: indicatorSize,
      opacity: animatedIconOpacity,
      transform: [{
        scale: animatedIconScale
      }]
    }
  }), [animatedIconOpacity, animatedIconScale, indicatorSize]); //#endregion
  // renders

  const renderIcon = (0, _react.useCallback)(() => {
    if (item.icon) {
      const IconComponent = item.icon;
      return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
        style: iconStyle
      }, typeof IconComponent === 'function' ? IconComponent({
        size: indicatorSize / 2
      }) : /*#__PURE__*/_react.default.createElement(IconComponent, {
        size: indicatorSize / 2
      }));
    }

    return null;
  }, [item, indicatorSize, iconStyle]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: containerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNativeSvg.Svg, {
    width: indicatorSize,
    height: indicatorSize,
    viewBox: `0 0 ${indicatorSize} ${indicatorSize}`
  }, /*#__PURE__*/_react.default.createElement(AnimatedCircle, {
    r: animatedRadius,
    cx: indicatorSize / 2,
    cy: indicatorSize / 2 // @ts-ignore
    ,
    fill: indicatorBackgroundColor,
    fillOpacity: animatedCircleFillOpacity,
    stroke: indicatorBorderColor,
    strokeWidth: BORDER_WIDTH
  })), renderIcon());
};

const Indicator = /*#__PURE__*/(0, _react.memo)(IndicatorComponent);
var _default = Indicator;
exports.default = _default;
//# sourceMappingURL=Indicator.js.map