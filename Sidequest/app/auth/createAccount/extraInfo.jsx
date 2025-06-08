import { Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, View, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import Colors from "../../../constant/colors";
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from "expo-router";
import { addInfoToUser } from '../../../config/firebaseConfig';
import { SelectList } from 'react-native-dropdown-select-list';
import Ionicons from '@expo/vector-icons/Ionicons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { UserDetailContext } from '../../../context/UserDetailContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { height: screenHeight } = Dimensions.get('window');
export default function Name() {

  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [resCollege, setResCollege] = useState('');
  const [classYear, setClassYear] = useState('');
  const isPlaceholder = resCollege === '';
  const isPlaceholder2 = classYear === '';
  const resColleges = [
    { label: 'NCW', value: 'NCW' },
    { label: 'Yeh', value: 'Yeh' },
    { label: 'Butler', value: 'Butler' },
    { label: 'Whitman', value: 'Whitman' },
    { label: 'Rocky', value: 'Rocky' },
    { label: 'Mathey', value: 'Mathey' },
    { label: 'Forbes', value: 'Forbes' },
    { label: 'Eating Club', value: 'Eating Club' },
    { label: 'Other', value: 'Other' }
  ];
  const classYears = [
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
    { label: '2029', value: '2029' },
  ];
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [finding, setFinding] = useState('');
  const onCreateAccountClick = async () => {
    console.log(userDetail.uid)
    const success = await addInfoToUser(userDetail.uid, username, fullName, resCollege, classYear, finding)
    if (success) {
      console.log(userDetail)
      setUserDetail((prev) => ({
      ...prev,
      userName: username,
      fullName: fullName,
      resCollege: resCollege,
      classYear: classYear,
      questsComplete: 0,
      completionPoints: 0,
      socialPoints: 0,
      leaderboardRank: 0,
      level: 1,
      hasPostedThisWeek: false,
      isSignedIn: true,
      somewhereToFind: '',
    }));
      router.push('/auth/createAccount/extraInfoFade')
    }
  }
  const offset = useSharedValue(-30);
  const opacity = useSharedValue(0);

  useEffect(() => {
    offset.value = withTiming(0, { duration: 500 });
    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
      opacity: opacity.value,
    };
  });
  return (
    <KeyboardAwareScrollView
  contentContainerStyle={{ flexGrow: 1 }}
  keyboardShouldPersistTaps="handled"
  style={{ backgroundColor: Colors.WHITE }}
>
      <LinearGradient
        colors={[Colors.PRIMARY, Colors.SECONDARY]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
          <Animated.View style={animatedStyle}>
            <TouchableOpacity style={{
              padding: 10,
              borderRadius: 8,
            }}
              onPress={() => router.push('/auth/createAccount/accountCreate')}
            >
              <View style={{
                flexDirection: 'row'
              }}>
                <Ionicons name="chevron-back" size={23} color='#fff' />
                <Text style={{
                  fontFamily: 'regular',
                  color: Colors.WHITE,
                  fontSize: 17,
                  paddingLeft: 1,
                  paddingTop: 1
                }}>Back</Text>

              </View>
            </TouchableOpacity>
          </Animated.View>
          <Text style={{
            fontFamily: 'regular',
            color: Colors.WHITE,
            fontSize: 17,
            paddingRight: 25,
            paddingTop: 10
          }}>2 of 3</Text>
        </View>
        <Text style={styles.titleText}>Welcome!</Text>
        <Text style={styles.headingText}>Let's get some basic information.</Text>

        <TextInput
          placeholder='Full Name'
          onChangeText={(value) => setFullName(value)}
          placeholderTextColor={Colors.gray300}
          style={styles.textInput} />

        <TextInput
          placeholder='Username'
          onChangeText={(value) => setUsername(value)}
          placeholderTextColor={Colors.gray300}
          style={styles.textInput} />
          <TextInput
          placeholder='One Place Someone Might Find You'
          onChangeText={(value) => setFinding(value)}
          placeholderTextColor={Colors.gray300}
          style={styles.textInput} />
        <SelectList
          setSelected={(value) => setResCollege(value)}
          data={resColleges}
          search={false}
          boxStyles={styles.textInput}
          placeholder={'Res College'}
          inputStyles={[styles.buttonText, { color: isPlaceholder ? Colors.gray300 : Colors.BLACK }]}
          dropdownStyles={{
            borderRadius: 8,
            borderColor: Colors.gray300,
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: Colors.gray100,
          }}
          dropdownTextStyles={{
            color: Colors.gray500,
            fontSize: 15,
            fontFamily: 'semiBold'
          }}
          dropdownItemStyles={{
            borderBottomWidth: 1,
            paddingTop: 8,
            marginLeft: 15,
            marginRight: 15,
            borderBottomColor: Colors.gray200
          }}
        />
        <SelectList
          setSelected={(value) => setClassYear(value)}
          data={classYears}
          search={false}
          boxStyles={styles.textInput}
          placeholder={'Class Year'}
          inputStyles={[styles.buttonText, { color: isPlaceholder2 ? Colors.gray300 : Colors.BLACK }]}
          dropdownStyles={{
            borderRadius: 8,
            borderColor: Colors.gray300,
            marginLeft: 15,
            marginRight: 15,
            backgroundColor: Colors.gray100,
          }}
          dropdownTextStyles={{
            color: Colors.gray500,
            fontSize: 15,
            fontFamily: 'semiBold'
          }}
          dropdownItemStyles={{
            borderBottomWidth: 1,
            paddingTop: 8,
            marginLeft: 15,
            marginRight: 15,
            borderBottomColor: Colors.gray200
          }}
        />
        <TouchableOpacity style={[styles.button2, {
          backgroundColor: Colors.PRIMARY_DARK,
          borderWidth: 1,
          borderColor: Colors.gray100
        }]}
          onPress={onCreateAccountClick}>
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: Colors.gray300,
    backgroundColor: Colors.gray100,
    padding: 16,
    fontSize: 16,
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15
  },
  button1: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginTop: 70,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 15
  },
  button2: {
    padding: 20,
    backgroundColor: Colors.WHITE,
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
  gradient: {
    flex: 1,
    paddingTop: 16,
    marginTop: 80,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    minHeight: screenHeight
  },
  titleText: {
    paddingTop: 55,
    textAlign: 'center',
    fontSize: 55,
    color: Colors.WHITE,
    fontFamily: 'medium'
  },
  headingText: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: 'regular',
    marginTop: 20
  }
})