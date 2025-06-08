import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebaseConfig';
import * as FileSystem from 'expo-file-system';
import { doc, updateDoc } from 'firebase/firestore';

export const saveProfilePictureUrl = async (uid: string, url: string) => {
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, {
    profilePicture: url,
  });
};

export const uploadProfilePicture = async (uid: string, uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const fileRef = ref(storage, `profilePictures/${uid}.jpg`);
    await uploadBytes(fileRef, blob);

    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};
