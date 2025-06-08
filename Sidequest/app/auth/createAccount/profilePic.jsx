import React, { useContext, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Platform
} from 'react-native';
import Colors from "../../../constant/colors";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";
import { UserDetailContext } from '../../../context/UserDetailContext';
import * as ImagePicker from 'expo-image-picker';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import {uploadProfilePicture, saveProfilePictureUrl} from '../../../config/profilePicture'
import { auth } from '../../../config/firebaseConfig';

const { height: screenHeight } = Dimensions.get('window');

export default function Name() {
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [imageUri, setImageUri] = useState(null);

  const offset = useSharedValue(-30);
  const opacity = useSharedValue(0);

  const handleContinue = async () => {
  try {
    if (auth.currentUser && imageUri) {
      const url = await uploadProfilePicture(auth.currentUser.uid, imageUri);
      await saveProfilePictureUrl(auth.currentUser.uid, url);
      setUserDetail({ ...userDetail, profilePicture: url }); // 👈 Update context
    }
    router.push('/quest');
  } catch (error) {
    alert('Error uploading profile picture. Please try again.');
  }
};


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

  const pickImage = async () => {
    // Ask for permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need media permissions to make this work!');
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.Images],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <LinearGradient
        colors={[Colors.PRIMARY, Colors.SECONDARY]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Animated.View style={animatedStyle}>
            <TouchableOpacity
              style={{ padding: 10, borderRadius: 8 }}
              onPress={() => router.replace('/auth/createAccount/extraInfo')}
            >
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name="chevron-back" size={23} color="#fff" />
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
          }}>3 of 3</Text>
        </View>

        <Text style={styles.titleText}>Add a Profile Picture</Text>

        {imageUri ? (
          <>
            <Image
              source={{ uri: imageUri }}
              style={{ width: 200, height: 200, borderRadius: 100, alignSelf: 'center', marginTop: 30 }}
            />
            <TouchableOpacity
              style={[styles.button1, { marginTop: 30 }]}
              onPress={() => router.push('/quest')}
            >
              <Text style={[styles.buttonText, { color: Colors.PRIMARY_DARK }]}>Continue</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button1} onPress={pickImage}>
            <Text style={[styles.buttonText, { color: Colors.PRIMARY_DARK }]}>Choose Photo</Text>
          </TouchableOpacity>
        )}

        {!imageUri && (
          <TouchableOpacity
            style={[styles.button2, {
              backgroundColor: Colors.PRIMARY_DARK,
              borderWidth: 1,
              borderColor: Colors.WHITE
            }]}
            onPress={handleContinue}
          >
            <Text style={[styles.buttonText, { color: Colors.WHITE }]}>Skip for now</Text>
          </TouchableOpacity>
        )}
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
  titleText: {
    paddingTop: 120,
    textAlign: 'center',
    fontSize: 50,
    color: Colors.WHITE,
    fontFamily: 'medium'
  },
  headingText: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.WHITE,
    fontFamily: 'regular',
    marginTop: 10
  }
});
