import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, Dimensions, View } from "react-native";
import Colors from "../constant/colors";
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { UserDetailContext } from "../context/UserDetailContext";
import { onAuthStateChanged } from 'firebase/auth'
import { auth , db } from '../config/firebaseConfig'


const { height: screenHeight } = Dimensions.get('window');

export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
useEffect(() => {
  const subscribe = onAuthStateChanged(auth, async (user) => {
    console.log(user)
    if (user) {
        const result = await getDoc(doc(db, 'users', user.uid));
        const data = result.data();
        console.log(data)
        setUserDetail(data)
        router.replace('/quest'); // Navigate after setting context
        }
    })
    return () => subscribe();
}, []);
  return (
    <ScrollView style={{
      height: '100%',
      backgroundColor: Colors.WHITE
    }}>
      <LinearGradient
        colors={[Colors.PRIMARY, Colors.SECONDARY]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>

        <Image source={require('../assets/images/white-text.png')}
          style={{
            alignItems: 'center',
            marginLeft: 60,
            marginTop: 50,
            width: 250,
            height: 250
          }}
        />
        <TouchableOpacity style={styles.button1}
          onPress={() => router.replace('/blankFade')}>
          <Text style={[styles.buttonText, { color: Colors.PRIMARY_DARK }]}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button2, {
          backgroundColor: Colors.PRIMARY_DARK,
          borderWidth: 1,
          borderColor: Colors.WHITE
        }]}
          onPress={() => router.replace('/auth/signIn')}>
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Already have an Acount?</Text>
        </TouchableOpacity>

      </LinearGradient>
    </ScrollView>

  );
}
const styles = StyleSheet.create({
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
  titleText1: {
    paddingTop: 120,
    paddingLeft: 100,
    textAlign: 'left',
    fontSize: 50,
    color: Colors.BLACK,
    fontFamily: 'ExtraBold'
  },
  titleText2: {
    textAlign: 'center',
    fontSize: 50,
    color: Colors.BLACK,
    fontFamily: 'ExtraBold'
  },
  slogan: {
    textAlign: 'center',
    fontSize: 25,
    paddingTop: 50,
    color: Colors.BLACK,
    fontFamily: 'italic'
  }
})
