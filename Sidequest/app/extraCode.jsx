import { View, Text } from 'react-native'
import React from 'react'

export default function extraCode() {
  return (
    <View>
      <Text>extraCode</Text>
    </View>
  )
}


/*import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable, Dimensions, ActionSheetIOS, Button, Animated } from 'react-native'
import React, { useRef, useState } from 'react'
import CircularClock from '../animations/timer'
import colors from '../../constant/colors'
import HomeFeed from '../feed/homeFeed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router"
import { BlurView } from 'expo-blur';
const { height, width } = Dimensions.get('window');
export default function Quest() {
  const [showHomeFeed, setShowHomeFeed] = useState(false);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [visibleQuest, setVisibleQuest] = useState(false);
  let day = new Date().getDay();
  let hour = new Date().getHours();
  if (hour >= 17) {
    day++;
    if (day === 7) {
      day = 0;
    }
  }
  let verbalTimeLeft = "It's Sunday";

  switch (day) {
    case 0:
      verbalTimeLeft = "One Day Remaining";
      break;
    case 1:
      if (hour === 17) {
        verbalTimeLeft = "0 Hours Remaining";
        break;
      }
      if (hour === 16) {
        verbalTimeLeft = "One Hour Remaining";
        break;
      }
      if (hour >= 17) {
        hour = hour - 24
      }
      verbalTimeLeft = 17 - hour + " Hours Remaining";
      break;
    case 2:
      verbalTimeLeft = "Six Days Remaining";
      break;
    case 3:
      verbalTimeLeft = "Five Days Remaining";
      break;
    case 4:
      verbalTimeLeft = "Four Days Remaining";
      break;
    case 5:
      verbalTimeLeft = "Three Days Remaining";
      break;
    case 6:
      verbalTimeLeft = "Two Days Remaining";
      break;
    default:
      verbalTimeLeft = "One Day Remaining";
  }


  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggleDropdown = () => {
    setVisibleQuest(!visibleQuest);

    Animated.timing(rotateAnim, {
      toValue: visibleQuest ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 2],
    outputRange: ['90deg', '-90deg'],
  });

  return showHomeFeed ? (
    <HomeFeed onClose={() => setShowHomeFeed(false)} />
  ) : (

    <ScrollView style={{backgroundColor: colors.gray100}}>
      <View style={{ alignContent: 'left' }}>
        <TouchableOpacity
          onPress={() => setVisible(true)} style={{ padding: 10, marginLeft: 'auto', marginTop: 20 }}>
          <Ionicons style={{ marginTop: 2, marginRight: 12, marginLeft: 'auto' }} name="information-circle-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.titleText}>Your Quest:</Text>
      <TouchableOpacity
        onPress={toggleDropdown}
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={[styles.titleText1, { paddingRight: 8 }]}>
          Create an Original Song
        </Text>

        <Animated.View
          style={{
            marginLeft: -20, // negative margin to make arrow overlap the text
            transform: [{ rotate: rotateInterpolate }],
          }}
        >
          <Ionicons name="chevron-down" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>


      {visibleQuest && (
        <Text style={styles.bodyText}>
          This week's sidequest is to create an original song with your partner, and then upload all or part of it (length dependent) to
        </Text>
      )}
      <Text style={styles.titleText2}>with Giovanni Nigro</Text>
      <View style={styles.overlap}>
        <CircularClock style={{ zIndex: 4 }} />
        <Text style={styles.textOverlap}>{verbalTimeLeft}</Text>
      </View>
      <TouchableOpacity style={[styles.button2, {
        backgroundColor: colors.PRIMARY,
        borderWidth: 1,
        borderColor: colors.gray100
      }]}
        onPress={() => setShowHomeFeed(true)}>
        <Text style={[styles.buttonText, { color: colors.WHITE }]}>Already Submitted Video</Text>
      </TouchableOpacity>
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <BlurView intensity={50} tint="light" style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
          <Pressable style={styles.backdrop} onPress={() => setVisible(false)} />

          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How To Play</Text>
            <Text style={styles.headingText}>Completing the Quest:</Text>
            <Text style={styles.modalText}>Each week a new quest will be released with three difficulty levels. You can find more information by clicking on the quest on the home screen.</Text>
            <Text style={styles.headingText}>Submitting Your Video/Image:</Text>
            <Text style={styles.modalText}>In the center tab on the bottom bar you will see the post button, to create your submission and complete the week's sidequest follow the steps listed there.</Text>
            <Text style={styles.headingText}>Scoring System:</Text>
            <Text style={[styles.modalText, { marginBottom: 1 }]}>Completion Points <Text style={{ color: 'blue' }}>(CP)</Text> are gained from completing quests.</Text>
            <Text style={[styles.modalText, { marginBottom: 1 }]}>Social Points <Text style={{ color: 'green' }}>(SP)</Text> are gained from likes and views on your posts.</Text>
            <Text style={[styles.modalText, { marginBottom: 1 }]}>Rank Points <Text style={{ color: 'red' }}>(RP)</Text> combine these two and determine your place on the Leaderboard.</Text>
            <Text style={styles.headingText}>Timeline:</Text>
            <Text style={styles.modalText}>The week starts and ends Monday at 5:00 pm EST, so make sure to check back each week to see what the new challenge is going to be.</Text>
            <Text style={styles.headingText}>How to Succeed:</Text>
            <Text style={styles.modalText}>Complete the sidequest, regardless of how unhinged they get, and make an entertaining video out of it.</Text>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>

        </BlurView>
      </Modal>

    </ScrollView>

  )

};
const styles = StyleSheet.create({
  titleText1: {
    paddingBottom: 10,
    paddingLeft: 10,
    textAlign: 'center',
    backgroundColor: colors.PRIMARY,
    fontSize: 50,
    color: colors.BLACK,
    outlineWidth: 1,
    fontFamily: 'ExtraBold',
    flex: 1,
    maxWidth: width * 0.9,
    borderRadius: 12
  },
    titleText: {
    paddingBottom: 10,
    paddingLeft: 30,
    textAlign: 'center',
    fontSize: 50,
    color: colors.gray566,
    fontFamily: 'ExtraBold',
    flex: 1,
    maxWidth: width * 0.9
  },
  titleText2: {
    textAlign: 'right',
    paddingRight: 10,
    fontSize: 50,
    outlineWidth: 1,
    outlineColor: colors.gray400,
    color: colors.gray400,
    fontFamily: 'ExtraBold'
  },
  button2: {
    padding: 20,
    backgroundColor: colors.WHITE,
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'semiBold'
  },
  overlap: {
    alignItems: "center",
    justifyContent: "center",
    position: 'relative'
  },
  textOverlap: {
    top: -105,
    zIndex: 5,
    fontFamily: 'bold',
    fontSize: 17,
    color: colors.gray400

  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modalContent: {
    width: width * 0.9,
    height: height * 0.9, // 80% of screen height
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    padding: 20,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'SemiBold'
  },
  modalTitle: {
    fontSize: 43,
    marginBottom: 12,
    fontFamily: 'light',
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  closeButton: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
    marginTop: 18,
    marginLeft: 240,
  },
  headingText: {
    fontSize: 22,
    color: colors.PRIMARY,
    fontFamily: 'SemiBold',
    marginTop: 12
  },
  bodyText: {
    padding: 10,
    fontSize: 18
  }
})*/