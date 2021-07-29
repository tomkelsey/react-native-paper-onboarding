import Animated from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
interface useTimingProps {
    value: Animated.Adaptable<number>;
    animatedStaticIndex: Animated.Value<number>;
    animatedOverrideIndex: Animated.Value<number>;
    velocity: Animated.Adaptable<number>;
    state: Animated.Value<State>;
    offset?: Animated.Value<number>;
    deceleration?: number;
    size: number;
    screenWidth: number;
}
export declare const useTiming: ({ animatedStaticIndex, animatedOverrideIndex, value, velocity, state, size, screenWidth, }: useTimingProps) => Animated.Node<number>;
export {};
