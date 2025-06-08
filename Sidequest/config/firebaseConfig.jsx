import { getApp, getApps, initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, getReactNativePersistence, initializeAuth, Auth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore, doc , getDocs, setDoc , collection} from "firebase/firestore";
import { getStorage } from 'firebase/storage'; 
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7Mjfm5-HVFE-5x4LglBiuaM_pv0jHHAQ",
  authDomain: "test-242e1.firebaseapp.com",
  projectId: "test-242e1",
  storageBucket: "test-242e1.firebasestorage.app",
  messagingSenderId: "185056100644",
  appId: "1:185056100644:web:d0dd494bacb38b7bcdf3b1",
  measurementId: "G-RSBW115ZXP"
};



/** @type {import("firebase/auth").Auth} */
let auth;
let app;

if (!getApps().length) {
  try {
    console.log('beforeinitialize')
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    console.log("Error initializing app: " + error);
  }
} else {
  app = getApp();
  auth = getAuth(app);
}
export {auth};
export const db = getFirestore(app);
export const storage = getStorage(app);

export async function addInfoToUser(uid, username, fullName, resCollege, classYear, finding) {
  const userRef = doc(db, "users", uid);
  try {
    await setDoc(userRef, {
      userName: username,
      fullName: fullName,
      resCollege: resCollege,
      classYear: classYear,
      questsComplete: 0,
      completionPoints: 0,
      socialPoints: 0,
      leaderboardRank: 0,
      level: 1,
      isSignedIn: true,
      hasPostedThisWeek: false,
      somewhereToFind: finding,
      createdAt: new Date().toISOString(),
    }, { merge: true })

    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
  
}
export const fetchAllUsers = async () => {
  try {
    const usersRef = collection(db, 'users');
    const snapshot = await getDocs(usersRef);

    const users = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

