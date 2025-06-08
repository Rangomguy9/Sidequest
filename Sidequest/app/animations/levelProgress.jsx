import  { useContext } from "react";
import { UserDetailContext } from '../../context/UserDetailContext';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Text,
} from "react-native";
import colors from "../../constant/colors";

const { width } = Dimensions.get("window");
const CLOCK_RADIUS = width * 0.115;
const NUM_SQUARES = 200;


export default function levelProgress() {

  const { userDetail } = useContext(UserDetailContext);
  const COMP_POINTS = userDetail.completionPoints;
  const LVL = userDetail.level;
  const xpIn = COMP_POINTS - 20 * LVL + 10 * (LVL + 1) * LVL;
  const xpToGO = 20 + 20 * LVL - xpIn;
  const ratioLeft = xpToGO / (20 + 20 * LVL);
  const activeCount = 100+ NUM_SQUARES- ratioLeft * NUM_SQUARES;


  return (
    <View style={styles.container}>
      <View style={styles.label}/>
      <Text style= {styles.labelText}>Lvl. {userDetail.level}</Text>
      {Array.from({ length: activeCount}).map((_, i) => {
        const angle = 110 + (i * 320) / NUM_SQUARES;
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
    height: width * 0.5,
    marginLeft: 41,
    marginTop: 40,
    position: 'absolute'
  },
  square: {
    position: "absolute",
    width: 5,
    height: 6,
    backgroundColor: colors.GREEN,
    zIndex: 3
  },
  circleOuter: {
    width: CLOCK_RADIUS * 2.2,
    height: CLOCK_RADIUS * 2.2,
    borderRadius: CLOCK_RADIUS * 1.1, // Must be half of width/height
    backgroundColor: colors.DARK_GREEN,
    position: 'absolute',
    outlineWidth: 3,
    outlineColor: colors.gray200,
    zIndex: 1,
    top: -184,
    left: -194
  },
  circleInner: {
    width: CLOCK_RADIUS * 1.8,
    height: CLOCK_RADIUS * 1.8,
    borderRadius: CLOCK_RADIUS * 0.9, // Must be half of width/height
    backgroundColor: colors.gray150,
    position: 'absolute',
    zIndex: 2,
    top: -88,
    left: -88
  },
  label:
  {
    height: 20,
    Width: 60,
    marginLeft: 173,
    marginRight: 176,
    backgroundColor: colors.gray300,
    borderRadius: 2,
    zIndex: 4,
    top: 35,
    left: -190
  },
  labelText:{
    color: colors.BLACK,
    zIndex: 5,
    top: 16,
    left: -11,
    fontFamily: 'regular'
  }
});
