"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CloseButtonComponent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeRedash = require("react-native-redash");

var _styles = require("./styles");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CloseButtonComponent = ({
  data,
  safeInsets,
  animatedIndex,
  closeButton,
  closeButtonText,
  closeButtonTextStyle: textStyleOverride,
  onCloseButtonPress
}) => {
  const containerRef = (0, _react.useRef)(null); //#region animations

  const animatedShowButtonOpacityValues = (0, _reactNativeRedash.useValues)(...data.map((item, index) => index === data.length - 1 || item.showCloseButton ? 1 : 0));
  const animatedShowButtonPointerEventValues = (0, _reactNativeRedash.useValues)(...data.map((item, index) => index === data.length - 1 || item.showCloseButton ? 'auto' : 'none'));
  const defaultShowButtonOpacity = new _reactNativeReanimated.default.Value(0);
  const defaultShowButtonPointerEvent = new _reactNativeReanimated.default.Value('none');
  const animatedShowButtonOpacity = (0, _reactNativeRedash.get)(animatedShowButtonOpacityValues, (0, _reactNativeReanimated.round)(animatedIndex), defaultShowButtonOpacity);
  const animatedShowButtonPointerEvent = (0, _reactNativeRedash.get)( // @ts-ignore
  animatedShowButtonPointerEventValues, (0, _reactNativeReanimated.round)(animatedIndex), defaultShowButtonPointerEvent); //#endregion
  //#region styles

  const containerStyle = (0, _react.useMemo)(() => [_styles.styles.container, {
    opacity: animatedShowButtonOpacity,
    top: safeInsets.top
  }], // eslint-disable-next-line react-hooks/exhaustive-deps
  [safeInsets]);
  const textStyle = (0, _react.useMemo)(() => [_styles.styles.text, textStyleOverride], [textStyleOverride]); //#endregion

  return /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
    ref: containerRef,
    pointerEvents: animatedShowButtonPointerEvent,
    style: containerStyle
  }, closeButton ? typeof closeButton === 'function' ? closeButton() : closeButton : /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onCloseButtonPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: textStyle
  }, closeButtonText)));
};

exports.CloseButtonComponent = CloseButtonComponent;
const CloseButton = /*#__PURE__*/(0, _react.memo)(CloseButtonComponent);
var _default = CloseButton;
exports.default = _default;
//# sourceMappingURL=CloseButton.js.map