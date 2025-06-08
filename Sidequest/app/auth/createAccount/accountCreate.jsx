import { Alert, Text, StyleSheet, TouchableOpacity, TextInput, View, ScrollView, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import { useContext, useState, useEffect } from 'react'
import Colors from "../../../constant/colors";
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from "expo-router";
import { UserDetailContext } from '../../../context/UserDetailContext';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Ionicons from '@expo/vector-icons/Ionicons';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth, db } from '../../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { height: screenHeight } = Dimensions.get('window');
export default function Name() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateNewAccount = () => {
    if (email != '' && password != '' && confirmPassword != '') {
      if (password == confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(async (resp) => {
            const user = resp.user;
            console.log(user);
            await saveUser(user);
            //Save user to database
          })
          .catch(e => {
            if (e.message == 'Firebase: Error (auth/invalid-email).') {
              Alert.alert(
                "Account Creation Failed",
                "Please enter a valid email address.",
                [{ text: "OK" }]
              );
            }
            else if(e.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
              Alert.alert(
                "Password Too Short",
                "Please enter a password with at least 6 characters",
                [{ text: "OK" }]
              );
            }
            else{
              Alert.alert('Error', e.message)
            }
          })
      }
      else {
        Alert.alert(
          "Account Creation Failed",
          "Password and Confirm Password do not match.",
          [{ text: "OK" }]
        );
      }
    }
    else {
      Alert.alert(
        "Try Again",
        "Please complete all required fields.",
        [{ text: "OK" }]
      );
    }

  }

  const saveUser = async (user) => {
    const data = {
      uid: user.uid,
      userName: '',
      fullName: '',
      resCollege: '',
      classYear: 0,
      email: email,

      // Add other fields here if needed (e.g., fullName, username, etc.)
    };
    await setDoc(doc(db, 'users', user.uid), data)
    setUserDetail(data);
    console.log(userDetail);
    router.push('/auth/createAccount/accountCreateFade')

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
              onPress={() => router.replace('/')}
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
          }}>1 of 3</Text>
        </View>
        <Text style={styles.titleText}>Let's Create Your Account</Text>

        <TextInput placeholder='Princeton Email *'
          onChangeText={(value) => setEmail(value)}
          placeholderTextColor={Colors.gray200}
          style={styles.textInput}
        />
        <TextInput placeholder='Password *'
          onChangeText={(value) => setPassword(value)}
          placeholderTextColor={Colors.gray200}
          style={styles.textInput}
          secureTextEntry={true} />
        <TextInput placeholder='Confirm Password *'
          onChangeText={(value) => setConfirmPassword(value)}
          placeholderTextColor={Colors.gray200}
          style={styles.textInput}
          secureTextEntry={true} />
        <TouchableOpacity style={[styles.button2, {
          backgroundColor: Colors.PRIMARY_DARK,
          borderWidth: 1,
          borderColor: Colors.WHITE
        }]}
          onPress={CreateNewAccount}>
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Next</Text>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: Colors.WHITE,
    padding: 18,
    fontSize: 18,
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
    fontSize: 18,
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
    paddingTop: 80,
    padding: 20,
    textAlign: 'center',
    fontSize: 50,
    color: Colors.WHITE,
    fontFamily: 'medium'
  },
  headingText: {
    textAlign: 'center',
    fontSize: 30,
    color: Colors.WHITE,
    fontFamily: 'regular',
    marginTop: 30
  }
})