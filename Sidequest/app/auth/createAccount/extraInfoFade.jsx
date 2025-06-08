import {Dimensions, StyleSheet, View } from "react-native";
import Colors from "../../../constant/colors";
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from "expo-router";
import { useEffect } from 'react';

const router = useRouter();
const { height: screenHeight } = Dimensions.get('window');
export default function NameFade() {
    useEffect(() => {
    // Wait a short moment (optional), then navigate
    const timeout = setTimeout(() => {
      router.push('/auth/createAccount/profilePic'); // or router.push('/home')
    }, 500); // 0.1 second delay

    return () => clearTimeout(timeout);
  }, []);
  return (
    
    <View style={{
    height:'100%',
    backgroundColor: Colors.WHITE
    }}>
    <LinearGradient
      colors={[Colors.PRIMARY, Colors.SECONDARY]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}>

    </LinearGradient>
</View>

  );
}
const styles = StyleSheet.create({
  
  gradient: {
    flex: 1,
    paddingTop: 16,
    marginTop: 80,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    minHeight: screenHeight
   }
})
