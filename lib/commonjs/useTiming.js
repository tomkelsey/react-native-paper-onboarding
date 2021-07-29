"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTiming = void 0;

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _reactNativeRedash = require("react-native-redash");

var _react = require("react");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  interpolate: interpolateV1,
  interpolateNode: interpolateV2
} = require('react-native-reanimated');

const interpolate = interpolateV2 || interpolateV1;

const {
  Easing: EasingV1,
  EasingNode: EasingV2
} = require('react-native-reanimated');

const Easing = EasingV2 || EasingV1;

const useTiming = ({
  animatedStaticIndex,
  animatedOverrideIndex,
  value,
  velocity,
  state,
  size,
  screenWidth
}) => {
  const clock = (0, _reactNativeRedash.useClock)();
  const isManuallyAnimated = (0, _reactNativeRedash.useValue)(0);
  const config = (0, _react.useMemo)(() => ({
    toValue: new _reactNativeReanimated.default.Value(0),
    duration: 500,
    easing: Easing.out(Easing.exp)
  }), []);
  const animationState = (0, _react.useMemo)(() => ({
    finished: new _reactNativeReanimated.default.Value(0),
    position: new _reactNativeReanimated.default.Value(0),
    frameTime: new _reactNativeReanimated.default.Value(0),
    time: new _reactNativeReanimated.default.Value(0)
  }), []);
  const valueClamp = (0, _react.useMemo)(() => interpolate(value, {
    inputRange: [screenWidth * -1, 0, screenWidth],
    outputRange: _reactNative.I18nManager.isRTL ? [-1, 0, 1] : [1, 0, -1],
    extrapolate: _reactNativeReanimated.default.Extrapolate.CLAMP
  }), [value, screenWidth]);
  const velocityClamp = (0, _react.useMemo)(() => interpolate(velocity, {
    inputRange: [screenWidth * -2, 0, screenWidth * 2],
    outputRange: _reactNative.I18nManager.isRTL ? [-0.5, 0, 0.5] : [0.5, 0, -0.5],
    extrapolate: _reactNativeReanimated.default.Extrapolate.CLAMP
  }), [screenWidth, velocity]);
  const isTimingInterrupted = (0, _reactNativeReanimated.and)((0, _reactNativeReanimated.eq)(state, _reactNativeGestureHandler.State.BEGAN), (0, _reactNativeReanimated.clockRunning)(clock));
  const finishTiming = (0, _react.useMemo)(() => [(0, _reactNativeReanimated.set)(animatedStaticIndex, config.toValue), (0, _reactNativeReanimated.set)(animatedOverrideIndex, config.toValue), (0, _reactNativeReanimated.set)(animationState.frameTime, 0), (0, _reactNativeReanimated.set)(animationState.time, 0), (0, _reactNativeReanimated.set)(state, _reactNativeGestureHandler.State.UNDETERMINED), (0, _reactNativeReanimated.set)(isManuallyAnimated, 0), (0, _reactNativeReanimated.stopClock)(clock)], [state, animatedOverrideIndex, animatedStaticIndex, animationState.frameTime, animationState.time, clock, config.toValue, isManuallyAnimated]);
  const shouldAnimate = (0, _react.useMemo)(() => (0, _reactNativeReanimated.and)((0, _reactNativeReanimated.not)((0, _reactNativeReanimated.and)((0, _reactNativeReanimated.eq)(animatedStaticIndex, 0), (0, _reactNativeReanimated.lessThan)(valueClamp, 0))), (0, _reactNativeReanimated.not)((0, _reactNativeReanimated.and)((0, _reactNativeReanimated.eq)(animatedStaticIndex, size - 1), (0, _reactNativeReanimated.greaterThan)(valueClamp, 0)))), [animatedStaticIndex, size, valueClamp]);
  const shouldReset = (0, _react.useMemo)(() => (0, _reactNativeReanimated.not)((0, _reactNativeReanimated.greaterThan)((0, _reactNativeReanimated.add)((0, _reactNativeReanimated.abs)(valueClamp), (0, _reactNativeReanimated.abs)(velocityClamp)), 0.5)), [valueClamp, velocityClamp]);
  const shouldAnimateNext = (0, _react.useMemo)(() => (0, _reactNativeReanimated.greaterThan)((0, _reactNativeReanimated.add)(animationState.position, velocityClamp), animatedStaticIndex), [animatedStaticIndex, animationState.position, velocityClamp]);
  const animatedPosition = (0, _react.useMemo)(() => (0, _reactNativeReanimated.block)([(0, _reactNativeReanimated.cond)(isTimingInterrupted, finishTiming), (0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.eq)(state, _reactNativeGestureHandler.State.ACTIVE), (0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.and)((0, _reactNativeReanimated.not)((0, _reactNativeReanimated.and)((0, _reactNativeReanimated.eq)(animatedStaticIndex, 0), (0, _reactNativeReanimated.lessThan)(valueClamp, 0))), (0, _reactNativeReanimated.not)((0, _reactNativeReanimated.and)((0, _reactNativeReanimated.eq)(animatedStaticIndex, size - 1), (0, _reactNativeReanimated.greaterThan)(valueClamp, 0)))), [(0, _reactNativeReanimated.set)(animationState.finished, 0), (0, _reactNativeReanimated.set)(animationState.position, (0, _reactNativeReanimated.add)(animatedStaticIndex, valueClamp))])), (0, _reactNativeReanimated.onChange)(animatedOverrideIndex, [(0, _reactNativeReanimated.set)(isManuallyAnimated, 1), (0, _reactNativeReanimated.set)(animationState.finished, 0)]), (0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.or)((0, _reactNativeReanimated.eq)(state, _reactNativeGestureHandler.State.END), isManuallyAnimated), [(0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.and)((0, _reactNativeReanimated.not)((0, _reactNativeReanimated.clockRunning)(clock)), (0, _reactNativeReanimated.not)(animationState.finished)), [(0, _reactNativeReanimated.cond)(isManuallyAnimated, (0, _reactNativeReanimated.set)(config.toValue, animatedOverrideIndex), (0, _reactNativeReanimated.cond)((0, _reactNativeReanimated.or)(shouldReset, (0, _reactNativeReanimated.not)(shouldAnimate)), (0, _reactNativeReanimated.set)(config.toValue, animatedStaticIndex), (0, _reactNativeReanimated.cond)(shouldAnimateNext, (0, _reactNativeReanimated.set)(config.toValue, (0, _reactNativeReanimated.add)(animatedStaticIndex, 1)), (0, _reactNativeReanimated.set)(config.toValue, (0, _reactNativeReanimated.sub)(animatedStaticIndex, 1))))), (0, _reactNativeReanimated.set)(animationState.finished, 0), (0, _reactNativeReanimated.set)(animationState.frameTime, 0), (0, _reactNativeReanimated.set)(animationState.time, 0), (0, _reactNativeReanimated.startClock)(clock)]), (0, _reactNativeReanimated.timing)(clock, animationState, config), (0, _reactNativeReanimated.cond)(animationState.finished, finishTiming)]), animationState.position]), [size, state, animatedOverrideIndex, animatedStaticIndex, animationState, clock, config, finishTiming, isManuallyAnimated, isTimingInterrupted, shouldAnimate, shouldAnimateNext, shouldReset, valueClamp]);
  return animatedPosition;
};

exports.useTiming = useTiming;
//# sourceMappingURL=useTiming.js.map