"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNativeReanimated = _interopRequireDefault(require("react-native-reanimated"));

var _indicator = _interopRequireDefault(require("../indicator"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const IndicatorsContainerComponent = ({
  data,
  animatedIndex,
  animatedIndicatorsContainerPosition,
  indicatorSize,
  indicatorBackgroundColor,
  indicatorBorderColor,
  safeInsets
}) => {
  // variables
  const containerWidth = (0, _react.useMemo)(() => {
    return data.length * indicatorSize;
  }, [data, indicatorSize]); // style

  const containerStyle = (0, _react.useMemo)(() => [_styles.styles.container, {
    width: containerWidth,
    height: indicatorSize,
    bottom: safeInsets.bottom,
    transform: [{
      translateX: animatedIndicatorsContainerPosition
    }]
  }], [containerWidth, indicatorSize, animatedIndicatorsContainerPosition, safeInsets]); // renders

  const renderIndicators = (0, _react.useCallback)(() => data.map((item, index) => {
    return /*#__PURE__*/_react.default.createElement(_indicator.default, {
      key: `item-${index}`,
      indicatorSize: indicatorSize,
      indicatorBackgroundColor: indicatorBackgroundColor,
      indicatorBorderColor: indicatorBorderColor,
      index: index,
      item: item,
      animatedIndex: animatedIndex
    });
  }), // eslint-disable-next-line react-hooks/exhaustive-deps
  [data, indicatorSize, indicatorBackgroundColor, indicatorBorderColor]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    style: containerStyle
  }, renderIndicators());
};

const IndicatorsContainer = /*#__PURE__*/(0, _react.memo)(IndicatorsContainerComponent);
var _default = IndicatorsContainer;
exports.default = _default;
//# sourceMappingURL=IndicatorsContainer.js.map