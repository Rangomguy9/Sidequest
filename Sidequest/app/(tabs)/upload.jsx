import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const UploadPost = () => {
  const [mediaUri, setMediaUri] = useState(null);
  const [mediaType, setMediaType] = useState(null); // 'image' or 'video'
  const [caption, setCaption] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const requestPermissions = async () => {
    const { status: libStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const { status: camStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (libStatus !== 'granted' || camStatus !== 'granted') {
      Alert.alert('Permission Denied', 'We need access to your camera and gallery.');
      return false;
    }
    return true;
  };

  const pickFromGallery = async () => {
    const granted = await requestPermissions();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.All],
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
      setMediaType(result.assets[0].type);
    }
  };

  const captureMedia = async () => {
    const granted = await requestPermissions();
    if (!granted) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: [ImagePicker.MediaType.All],
      quality: 1,
    });

    if (!result.canceled) {
      setMediaUri(result.assets[0].uri);
      setMediaType(result.assets[0].type);
    }
  };

  const handlePost = () => {
    if (!mediaUri) {
      Alert.alert('No Media', 'Please add an image or video.');
      return;
    }

    Alert.alert('Post Uploaded!', `Caption: ${caption}\nDifficulty: ${difficulty}`);
    setMediaUri(null);
    setMediaType(null);
    setCaption('');
    setDifficulty('easy');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>New Post</Text>
          <TouchableOpacity onPress={handlePost}>
            <Text style={styles.postButton}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* Media Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={pickFromGallery} style={styles.mediaButton}>
            <Ionicons name="images-outline" size={24} color="#555" />
            <Text style={styles.mediaButtonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={captureMedia} style={styles.mediaButton}>
            <Ionicons name="camera-outline" size={24} color="#555" />
            <Text style={styles.mediaButtonText}>Camera</Text>
          </TouchableOpacity>
        </View>

        {/* Preview */}
        {mediaUri && (
          <Image source={{ uri: mediaUri }} style={styles.preview} resizeMode="cover" />
        )}

        {/* Difficulty Dropdown */}


        {/* Caption */}
        <TextInput
          placeholder="Write a caption..."
          style={styles.captionInput}
          value={caption}
          onChangeText={setCaption}
          multiline
          returnKeyType="done"
          blurOnSubmit
        />
                <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Difficulty:</Text>
          <Picker
            selectedValue={difficulty}
            onValueChange={(value) => setDifficulty(value)}
            style={styles.picker}
          >
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Hard" value="hard" />
          </Picker>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UploadPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  postButton: {
    color: '#3897f0',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  mediaButton: {
    alignItems: 'center',
  },
  mediaButtonText: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    ...Platform.select({
      android: { color: '#333' },
    }),
  },
  captionInput: {
    fontSize: 16,
    minHeight: 80,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});
