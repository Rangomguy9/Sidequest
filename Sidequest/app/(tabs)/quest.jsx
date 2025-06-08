import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Pressable, Dimensions, ActionSheetIOS, Button, Animated, Image } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import CircularClock from '../animations/timer'
import colors from '../../constant/colors'
import HomeFeed from '../feed/homeFeed';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router"
import { BlurView } from 'expo-blur';
import LevelProgress from '../animations/levelProgress';
import { UserDetailContext } from '../../context/UserDetailContext';
import Svg, { Path } from 'react-native-svg';


const { height, width } = Dimensions.get('window');
export default function Quest() {
  const { userDetail } = useContext(UserDetailContext);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [visibleQuest, setVisibleQuest] = useState(false);
  const [visibleUser, setVisibleUser] = useState(false);
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
      if (hour === 16) {
        verbalTimeLeft = "0 Hours Remaining";
        break;
      }
      if (hour === 15) {
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
  const Wave = ({fill=colors.PRIMARY_DARK, style}) => (
  <Svg
    height="1000"
    width="220%"
    viewBox="0 0 1440 320"
    style={style}
  >
    <Path
      fill={fill}
  d="
    M0,160 
    C 60,120 120,200 180,160 
    S 300,120 360,160 
    S 480,200 540,160 
    S 660,120 720,160 
    S 840,200 900,160 
    S 1020,120 1080,160 
    S 1200,200 1260,160 
    S 1380,120 1440,160 
    L1440,320 
    L0,320 
    Z"
    />
  </Svg>
);

  return (

    <View style={{ backgroundColor: colors.WHITE }}>
      
      <View style={{ alignContent: 'left', flexDirection: 'row' }}>
        <Image source={require('../../assets/images/SidequestBigBlack.png')}
          style={{
            height: 60,
            width: 110,
            marginTop: 23,
            marginLeft: 30
          }}></Image>
        <TouchableOpacity
          onPress={() => setVisible(true)} style={{ padding: 10, marginLeft: 'auto', marginTop: 25 }}>
          <Ionicons style={{ marginTop: 1, marginRight: 12, marginLeft: 'auto' }} name="information-circle-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{
        height: 1.5,
        backgroundColor: '#ccc',
        marginTop: 12,
        borderRadius: 1,
      }}>
      </View>
      <ScrollView style={{ backgroundColor: colors.WHITE, height: '100%' }}>
        <Text style={styles.titleText}>This Week's Quest:</Text>
        <TouchableOpacity
          onPress={() => setVisibleQuest(prev => !prev)}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={[styles.titleText1, { paddingTop: 6, paddingRight: 8 }]}>
            Create an Original Song
          </Text>


        </TouchableOpacity>
        {visibleQuest && (
          <Text style={styles.bodyText}>
            This week's sidequest is to create an original song, or some form of music, with your partner and then upload your favorite part. Here we're looking for creativity, effort and originiality.
          </Text>
        )}
        <View style={{
          marginLeft: 20,
          marginRight: 20,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Text style={styles.titleText3}>With</Text>
          <TouchableOpacity
            onPress={() => setVisibleUser(prev => !prev)}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          >

            <Text style={[styles.titleText5, { paddingTop: 6, paddingRight: 8 }]}>
              Giovanni Nigro
            </Text>
          </TouchableOpacity>
        </View>
        {visibleUser && (
          <View style={styles.header}>
            <View>
              <Image
                source={{ uri: 'https://i.pravatar.cc/300' }}
                style={styles.avatar}
              />
              <LevelProgress style={{ transform: [{ scale: 0.5 }] }} />
            </View>
            <View style={styles.stats}>
              <Text style={styles.statLabel}>Quests Completed: {userDetail.questsComplete}</Text>
              <Text style={styles.statLabel}>Completion Points: {userDetail.completionPoints}</Text>
              <Text style={styles.statLabel}>Social Points: {userDetail.socialPoints}</Text>
            </View>
          </View>
        )}



        <View style={styles.overlap}>
          <CircularClock style={{ zIndex: 4 }} />
          <Text style={styles.textOverlap}>{verbalTimeLeft}</Text>
        </View>


        <TouchableOpacity style={[styles.button2, {
          backgroundColor: 'black',
          borderWidth: 1,
          borderColor: colors.gray100,
          marginTop: 60
        }]}
          onPress={() => router.push('/feed/homeFeed')}>
          <Text style={[styles.buttonText, { color: colors.WHITE }]}>Submit your Video</Text>
        </TouchableOpacity>

        <Wave style={styles.wave} fill= {colors.PRIMARY} />
        <Wave style= {[styles.wave,{
          bottom: -500,
          opacity: 0.85
        }]} fill= {colors.SECONDARY} />
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
    </View>

  )

};
const styles = StyleSheet.create({
  titleText1: {
    paddingBottom: 10,
    paddingLeft: 10,
    textAlign: 'center',
    backgroundColor: colors.gray200,
    fontSize: 25,
    color: colors.BLACK,
    fontFamily: 'ExtraBold',
    flex: 1,
    maxWidth: width * 0.9,
    borderRadius: 12
  },
  titleText5: {
    paddingBottom: 10,
    backgroundColor: colors.gray200,
    marginLeft: 10,
    paddingLeft: 30,
    fontSize: 25,
    color: colors.BLACK,
    fontFamily: 'ExtraBold',
    flex: 1,
    maxWidth: width * 0.6,
    borderRadius: 12
  },
  titleText: {
    paddingBottom: 10,
    marginTop: 60,
    paddingLeft: 30,
    textAlign: 'center',
    fontSize: 35,
    color: colors.PRIMARY,
    fontFamily: 'ExtraBold',
    flex: 1,
    maxWidth: width * 0.9
  },
  titleText2: {
    textAlign: 'center',
    marginHorizontal: 20,
    fontSize: 25,
    paddingBottom: 70,
    marginBottom: 80,
    outlineColor: colors.gray400,
    color: colors.gray400,
    backgroundColor: colors.QUATERNARY,
    fontFamily: 'ExtraBold'
  },
  titleText3: {
    textAlign: 'center',
    fontSize: 25,
    color: colors.PRIMARY,
    fontFamily: 'ExtraBold'
  },
  titleText4: {
    textAlign: 'center',
    paddingLeft: 10,
    fontSize: 25,
    color: colors.BLACK,
    fontFamily: 'ExtraBold'
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  button2: {
    padding: 20,
    backgroundColor: colors.WHITE,
    marginTop: 5,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'regular'
  },
  profileText: {
    fontSize: 16,
    fontFamily: 'semiBold',
    marginLeft: 10
  },
  overlap: {
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    marginTop: 65
  },
  textOverlap: {
    top: -105,
    zIndex: 5,
    fontFamily: 'regular',
    fontSize: 17,
    color: colors.gray500

  },
  profileTag: {
    borderRadius: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderWidth: 3,
    marginBottom: 80,
    flexDirection: 'row',
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
    paddingHorizontal: 25,
    paddingTop: 10,
    fontSize: 18,
    color: colors.BLACK,
    fontFamily: 'regular'
  },
  stats: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'left',
    marginLeft: 50,
  },
  statLabel: {
    fontSize: 18,
    fontFamily: 'bold',
    color: colors.BLACK,
    marginTop: 11
  },
    header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
    wave: {
    position: 'absolute',
    bottom: -450,
    left: -200,
    opacity: 0.8,
    zIndex: -1,
    transform: [{rotate: '-20deg'}]
  },
})