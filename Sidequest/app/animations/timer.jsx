import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
} from "react-native";
import colors from "../../constant/colors";

const now = new Date();
const timestamp = now.getTime();
const { width } = Dimensions.get("window");
const CLOCK_RADIUS = width * 0.25;
const NUM_SQUARES = 1300;
const TIMEZONE_SHIFT = 14400000;
const MILLI_PER_WEEK = 604800000;
const MONDAY_AT_FIVE_SHIFT = 4*86400000 + 17*3600000;
const TIME_ELAPSED = (-MONDAY_AT_FIVE_SHIFT- TIMEZONE_SHIFT + timestamp) % MILLI_PER_WEEK;
const STARTING_BOX_NUMBER = NUM_SQUARES*(TIME_ELAPSED / MILLI_PER_WEEK);

export default function circularClock() {
  const [activeCount, setActiveCount] = useState(STARTING_BOX_NUMBER);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCount((prev) => (prev + 1) % (NUM_SQUARES + 1));
    }, 1000* 10080 * 60 / NUM_SQUARES);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.circleOuter} />
        <View style={styles.circleInner} />
      </View>
      {Array.from({ length: activeCount }).map((_, i) => {
        const angle = -90 + (i * 355) / NUM_SQUARES;
        const rad = (angle * Math.PI) / 180;
        const x = CLOCK_RADIUS * Math.cos(rad);
        const y = CLOCK_RADIUS * Math.sin(rad);
        return (
          <View
            key={i}
            style={[
              styles.square,
              {
                transform: [
                  { translateX: x },
                  { translateY: y },
                  { rotate: `${angle + 90}deg` },
                ],
              },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width*0.5,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative'
  },
  square: {
    position: "absolute",
    width: 9,
    height: 25,
    backgroundColor: colors.PRIMARY,
    zIndex: 3
  },
  circleOuter: {
    width: CLOCK_RADIUS * 2.2,
    height: CLOCK_RADIUS * 2.2,
    borderRadius: CLOCK_RADIUS * 1.1, // Must be half of width/height
    backgroundColor: colors.SECONDARY_DULL,
    position: 'absolute',
    zIndex: 1,
    top: -107,
    left: -107
  },
  circleInner: {
    width: CLOCK_RADIUS * 1.8,
    height: CLOCK_RADIUS * 1.8,
    borderRadius: CLOCK_RADIUS * 0.9, // Must be half of width/height
    backgroundColor: colors.WHITE,
    position: 'absolute',
    zIndex: 2,
    top: -88,
    left: -88
  },
});
