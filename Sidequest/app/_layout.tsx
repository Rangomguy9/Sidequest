import { Stack } from "expo-router";
import {useFonts} from "expo-font";
import {UserDetailContext} from '../context/UserDetailContext';
import { useState } from "react";

export default function RootLayout() {

  useFonts({
    'condensed':require('./../assets/fonts/Roboto_Condensed-Medium.ttf'),
    'bold':require('./../assets/fonts/Roboto-Bold.ttf'),
    'ExtraBold':require('./../assets/fonts/Roboto-ExtraBold.ttf'),
    'italic':require('./../assets/fonts/Roboto-Italic.ttf'),
    'light':require('./../assets/fonts/Roboto-Light.ttf'),
    'medium':require('./../assets/fonts/Roboto-Medium.ttf'),
    'regular':require('./../assets/fonts/Roboto-Regular.ttf'),
    'SemiBold':require('./../assets/fonts/Roboto-SemiBold.ttf'),
    'slab':require('./../assets/fonts/RobotoSlab-ExtraBold.ttf')
  })

    const [userDetail, setUserDetail] = useState('')
  return (
    <UserDetailContext.Provider value = {{userDetail, setUserDetail}}>
    <Stack screenOptions={{
      headerShown: false,
      animation: 'fade'
    }}>
    </Stack>
    </UserDetailContext.Provider>
  );
}
