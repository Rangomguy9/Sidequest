
import { Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import colors from '../../constant/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Tablayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#007AFF',
            tabBarStyle: {
                paddingBottom: 10,
                height: 80,
                paddingTop: 5,
            },
            tabBarItemStyle: {
                flex: 1
            },
            tabBarIconStyle: {
                marginBottom: 5,
                marginTop: 5
            }
        }}>
            <Tabs.Screen name="quest"
                options={{
                    tabBarIcon: ({ size, color }) => <FontAwesome
                        name="home"
                        size={size + 8}
                        color={color} />,
                }}
            />
            <Tabs.Screen name="search"
                options={{
                    tabBarIcon: ({ color, size }) => <FontAwesome
                        name="search"
                        size={size + 2}
                        color={color} />,
                    tabBarLabel: 'Search'
                }} />
            <Tabs.Screen name="upload"
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons
                        name='plus-box-outline'
                        size={size + 7}
                        color={color} />,
                    tabBarLabel: 'Upload'
                }} />
            <Tabs.Screen name="leaderboard"
                options={{
                    tabBarIcon: ({ color, size }) => <MaterialIcons
                        name="leaderboard"
                        size={size + 8}
                        color={color} />,
                    tabBarLabel: 'Leaderboard'
                }} />


            <Tabs.Screen name="profile"
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons
                        name="person-circle"
                        size={size + 6}
                        color={color} />,
                    tabBarLabel: 'Profile'
                }} />

        </Tabs>
        </GestureHandlerRootView>
    )
}