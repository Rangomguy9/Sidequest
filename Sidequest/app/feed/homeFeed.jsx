import React, { useState, useRef, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet from '@gorhom/bottom-sheet';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import colors from '../../constant/colors';
import { useRouter } from 'expo-router';

const { height } = Dimensions.get('window');

const videos = [
  { id: '1', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '2', uri: 'https://media.w3.org/2010/05/sintel/trailer.mp4' },
];

function VideoItem({ video, openComments }) {
  const [liked, setLiked] = useState(false);
  const player = useVideoPlayer({
    source: { uri: video.uri },
    shouldPlay: true,
    isMuted: false,
  });

  return (
    <View style={styles.videoContainer}>
      <VideoView style={styles.video} player={player} />

      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => openComments(video.id)}
      >
        <FontAwesome6 name="comment-dots" size={35} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => setLiked(!liked)}
      >
        <FontAwesome
          name={liked ? 'heart' : 'heart-o'}
          size={35}
          color={liked ? 'red' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function VideoFeed() {
  const router = useRouter();
  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '90%'], []);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');

  const openComments = (videoId) => {
    console.log("Opening comments for video:", videoId);
    setSelectedVideo(videoId);
    sheetRef.current?.snapToIndex(0); // Show bottom sheet
  };

  const submitComment = () => {
    if (newComment.trim()) {
      setComments((prev) => ({
        ...prev,
        [selectedVideo]: [...(prev[selectedVideo] || []), newComment],
      }));
      setNewComment('');
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.replace('/quest')}
      >
        <Ionicons name="chevron-back" size={23} color={colors.BLACK} style={styles.backIcon} />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <FlatList
        data={videos}
        renderItem={({ item }) => (
          <VideoItem video={item} openComments={openComments} />
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
      />

      <BottomSheet
        ref={sheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={() => setSelectedVideo(null)}
      >
        <KeyboardAvoidingView
          style={styles.modalContent}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Text style={styles.commentHeader}>Comments</Text>

          <FlatList
            data={comments[selectedVideo] || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.comment}>{item}</Text>}
            style={{ flex: 1 }}
          />

          <TextInput
            style={styles.input}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Add a comment..."
            onSubmitEditing={submitComment}
          />

          <TouchableOpacity onPress={submitComment} style={styles.submitButton}>
            <Text style={{ color: '#fff' }}>Post</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    paddingRight: 5,
  },
  backText: {
    fontFamily: 'regular',
    color: colors.BLACK,
    fontSize: 18,
  },
  videoContainer: {
    height,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  commentButton: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    backgroundColor: colors.gray300,
    padding: 10,
    borderRadius: 25,
    opacity: 0.5,
  },
  likeButton: {
    position: 'absolute',
    bottom: 200,
    right: 30,
    backgroundColor: colors.gray300,
    padding: 10,
    borderRadius: 25,
    opacity: 0.5,
  },
  modalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  commentHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  comment: {
    fontSize: 16,
    paddingVertical: 6,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: '#2196F3',
    padding: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
});
