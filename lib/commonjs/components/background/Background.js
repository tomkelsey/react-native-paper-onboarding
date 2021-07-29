"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeSvg = _interopRequireDefault(require("react-native-svg"));

var _backgroundCircle = _interopRequireDefault(require("../backgroundCircle"));

var _math = require("../../utils/math");

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BackgroundComponent = ({
  animatedIndex,
  data,
  screenDimensions,
  safeInsets,
  indicatorSize,
  animatedIndicatorsContainerPosition
}) => {
  //#region variables
  const extendedSize = (0, _react.useMemo)(() => {
    return (0, _math.calculateRectangleCircleRadius)({
      width: screenDimensions.width,
      height: screenDimensions.height,
      indicatorX: safeInsets.bottom,
      indicatorY: 0
    });
  }, [screenDimensions, safeInsets]);
  const bottomPosition = (0, _react.useMemo)(() => screenDimensions.height - indicatorSize / 2 - safeInsets.bottom, [screenDimensions, indicatorSize, safeInsets]); //#endregion
  // render

  return /*#__PURE__*/_react.default.createElement(_reactNativeSvg.default, {
    style: _styles.styles.container,
    pointerEvents: "none"
  }, data.map((item, index) => {
    return /*#__PURE__*/_react.default.createElement(_backgroundCircle.default, {
      key: `circle-${index}`,
      index: index,
      animatedIndex: animatedIndex,
      color: item.backgroundColor,
      extendedSize: extendedSize,
      bottomPosition: bottomPosition,
      screenDimensions: screenDimensions,
      indicatorSize: indicatorSize,
      animatedIndicatorsContainerPosition: animatedIndicatorsContainerPosition
    });
  }));
};

const Background = /*#__PURE__*/(0, _react.memo)(BackgroundComponent);
var _default = Background;
exports.default = _default;
//# sourceMappingURL=Background.js.map