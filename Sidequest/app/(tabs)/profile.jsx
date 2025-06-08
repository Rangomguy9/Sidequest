import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from "expo-router"
import colors from '../../constant/colors';
import LevelProgress from '../animations/levelProgress'

import { UserDetailContext } from '../../context/UserDetailContext';
import Svg, { Path } from 'react-native-svg';

const dummyPosts = Array.from({ length: 12 }, (_, i) => ({
  id: i.toString(),
  uri: `https://picsum.photos/id/${i + 10}/300/600`,
}));

const ProfileScreen = () => {
    const Wave = ({fill=colors.PRIMARY_DARK, style}) => (
    <Svg
      height="1000"
      width="220%"
      viewBox="0 0 1440 320"
      style={style}
    >
      <Path
        fill={fill}
    d="
      M0,160 
      C 60,120 120,200 180,160 
      S 300,120 360,160 
      S 480,200 540,160 
      S 660,120 720,160 
      S 840,200 900,160 
      S 1020,120 1080,160 
      S 1200,200 1260,160 
      S 1380,120 1440,160 
      L1440,320 
      L0,320 
      Z"
      />
    </Svg>
    )
  const router = useRouter();
  const { userDetail } = useContext(UserDetailContext);

  return (
    <View style={[styles.container, {backgroundColor: colors.WHITE}]}>
      {/* Header Section */}
      <Wave style={styles.wave} fill= {colors.PRIMARY} />
      <View style={styles.header2}>
        <Text style={styles.username}>Randomguy9</Text>
        <TouchableOpacity onPress={() => router.push('/settings/settingsMain')}>
          <Feather name="menu" size={35} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <View>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }}
            style={styles.avatar}
          />
          <LevelProgress style={{transform: [{scale:0.5}]}}/>
        </View>
        <View style={styles.stats}>
          <Text style={styles.statLabel}>Quests Completed: {userDetail.questsComplete}</Text>
          <Text style={styles.statLabel}>Completion Points: {userDetail.completionPoints}</Text>
          <Text style={styles.statLabel}>Social Points: {userDetail.socialPoints}</Text>
        </View>
      </View>


      {/* Posts Grid */}
      <FlatList
        data={dummyPosts}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.postImage} />
        )}
        contentContainerStyle={styles.postsContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProfileScreen;

const imageSize = Dimensions.get('window').width / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  header2: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginBottom: 12,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  avatar: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  stats: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'left',
    marginLeft: 50,
  },
  statNumber: {
    fontWeight: '700',
    fontSize: 18,
  },
  statLabel: {
    fontSize: 18,
    fontFamily: 'bold',
    color: colors.BLACK,
    marginTop: 11
  },
  bio: {
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  username: {
    fontFamily: 'condensed',
    fontSize: 26,
  },
  bioText: {
    color: '#444',
    marginTop: 4,
  },
  editButton: {
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  postsContainer: {
    paddingBottom: 50,
  },
  postImage: {
    width: imageSize,
    height: imageSize * 2,
  },
  wave: {
    position: 'absolute',
    top: -430,
    left: -100,
    opacity: 0.9,
    zIndex: 0,
    transform: [{rotate: '-175deg'}]
  },
  
});
