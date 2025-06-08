import React, { useState, useContext, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { UserDetailContext } from '../../context/UserDetailContext';
import { fetchAllUsers } from '../../config/firebaseConfig'; // adjust path
import colors from '../../constant/colors';
import { LinearGradient } from 'expo-linear-gradient';
const isTournament = true;
const TABS = ['Weekly', 'All-Time', ...(isTournament ? ['Tournament'] : [])];

const Leaderboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedTab, setSelectedTab] = useState('Weekly');
  const { userDetail } = useContext(UserDetailContext);

  useEffect(() => {
    const getUsers = async () => {
      const users = await fetchAllUsers();
      setAllUsers(users);
    };
    getUsers();
  }, []);

  // Calculate rank points and sort
  const rankedUsers = allUsers.map(user => ({
    ...user,
    rankPoints: (user.socialPoints || 0) + (user.completionPoints || 0),
  }));

  const sorted = [...rankedUsers].sort((a, b) => b.rankPoints - a.rankPoints);
  const yourIndex = sorted.findIndex(u => u.id === userDetail.uid) + 1;
  const topFive = sorted.slice(0, 5);

  const getColor = (rank) => {
    switch (rank) {
      case 1: return '#FFA500';
      case 2: return '#FFB347';
      case 3: return '#FFD700';
      case 4: return '#FFE135';
      case 5: return '#FFF380';
      default: return '#FFF380';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.TERTIARY, colors.SECONDARY]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <View style={styles.tabs}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setSelectedTab(tab)}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.title}>{selectedTab} Leaderboard</Text>

        {topFive.map((user, index) => (
          <View key={user.id} style={[styles.card, { backgroundColor: getColor(index + 1) }]}>
            <Text style={styles.rank}>#{index + 1}</Text>
            <Text style={styles.name}>{user.fullName || user.username}</Text>
            <Text style={styles.points}>{user.rankPoints} pts</Text>
          </View>
        ))}

        
      
      <View style={styles.divider} />
      {yourIndex > 0 && (
        <View style={[styles.card, styles.yourRankCard]}>
          <Text style={styles.rank}>#{yourIndex}</Text>
          <Text style={styles.name}>You</Text>
          <Text style={styles.points}>
            {sorted.find(u => u.id === userDetail.uid)?.rankPoints} pts
          </Text>
        </View>
      )}
</LinearGradient>
    </ScrollView>
  );
};

export default Leaderboard;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray100, // Soft background
  },
  title: {
    fontSize: 24,
    fontFamily: 'ExtraBold',
    marginBottom: 20,
    color: colors.WHITE,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFD580',
    marginHorizontal: 6,
  },
  activeTab: {
    backgroundColor: '#FF8C00',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#FFB347',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  rank: {
    fontWeight: 'bold',
    fontSize: 18,
    width: 40,
    color: '#333',
  },
  name: {
    fontSize: 18,
    flex: 1,
    color: '#333',
    paddingLeft: 10,
  },
  points: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  divider: {
    marginTop:10,
    borderBottomWidth: 2,
    borderColor: '#FFD580',
  },
  yourRankCard: {
    backgroundColor: '#FFECB3',
    borderWidth: 1,
    borderColor: '#FFB347',
    marginTop: 15
  },
  gradient: {
    flex: 1,
    paddingTop: 16,
    marginTop: 80,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    minHeight: '100%'
  },
});