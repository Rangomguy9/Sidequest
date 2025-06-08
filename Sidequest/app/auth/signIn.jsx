import { View, Text, Image, Pressable, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { useContext, useRef, useState } from 'react'
import Colors from '../../constant/colors'
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../config/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { UserDetailContext } from '../../context/UserDetailContext';
export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading, setLoading] = useState(false);

  const getUserDetail = async (uid) => {
    const result = await getDoc(doc(db, 'users', uid));
    const data = result.data();
    setUserDetail(data);
    return data;

  };

  const onSignInClick = () => {
    if (loading) return;
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user
        const details = await getUserDetail(user.uid);
        if (details?.isSignedIn === false) {
          console.log('SUCESSSS')
          await updateDoc(doc(db, 'users', user.uid), {
        isSignedIn: true,
        });
          setUserDetail((prev) => ({
            ...prev,
            isSignedIn: true,

          }))
          console.log(userDetail)
          setLoading(false);
          router.replace('../../quest');
        }
      }).catch(e => {
        if (e.message === 'Firebase: Error (auth/invalid-email).') {
          Alert.alert("Try Again", "Username or Password Incorrect", [{ text: "OK" }]);
          setLoading(false);
        } else {
          console.log(e.message);
          setLoading(false);
        }
      })
  };
  return (
    <ScrollView contentContainerStyle={{
      display: 'flex',
      flex: 1,
      paddingTop: 80,
      padding: 25,
      backgroundColor: Colors.WHITE,
      alignItems: 'center'
    }}>
      <Image source={require('./../../assets/images/sidequest-text.png')}
        style={{
          width: 250,
          height: 250
        }}
      />

      <Text style={{
        fontSize: 30,
        fontFamily: 'outfit-bold'
      }}>Welcome Back</Text>



      <TextInput placeholder='Email' onChangeText={(value) => setEmail(value)} placeholderTextColor={'#D3D3D3'} style={styles.textInput} />
      <TextInput placeholder='Password' onChangeText={(value) => setPassword(value)} placeholderTextColor={'#D3D3D3'} secureTextEntry={true}
        style={styles.textInput} />


      <TouchableOpacity
        onPress={onSignInClick}
        disabled={loading}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          width: '100%',
          marginTop: 25,
          borderRadius: 10
        }}
      >
        {!loading ? <Text style={{
          fontFamily: 'outfit',
          fontSize: 20,
          color: Colors.WHITE,
          textAlign: 'center'
        }}>Sign In</Text> :
          <ActivityIndicator size={'large'} color={Colors.WHITE} />
        }

      </TouchableOpacity>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        marginTop: 20
      }}>
        <Text style={{
          fontFamily: 'outfit'
        }}>Don't have an account?</Text>
        <Pressable
          onPress={() => router.push('/blankFade')}>
          <Text style={{
            color: Colors.PRIMARY,
            fontFamily: 'oufit-bold'
          }}>Create one Here</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: '100%',
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8
  }
})