import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from '../../constant/colors';
import { useRouter } from "expo-router"
import { getAuth, signOut } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { UserDetailContext } from '../../context/UserDetailContext';
import { useContext } from "react";

export default function SettingsScreen() {
    const auth = getAuth();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isPrivateAccount, setIsPrivateAccount] = useState(true);

    const updateUserField = async (isSignedIn, value, uid) => {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, {
            [isSignedIn]: value,
        });
        setUserDetail((prev) => ({
            ...prev,
            isSignedIn: false,
        }));
    };
    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout', onPress: () => {
                    signOut(auth)
                        .then(() => {
                            console.log('User signed out!');
                            console.log(userDetail.uid);
                            updateUserField('isSignedIn', false, userDetail.uid)
                            console.log(userDetail);
                            router.replace('/')
                        })
                        .catch((error) => {
                            console.error('Sign out error:', error);
                        });
                }
            },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingTop: 20 }}>

                <Text style={styles.header}>Settings</Text>
                <TouchableOpacity onPress={() => router.replace('/profile')}>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 5
                    }}>
                        <Ionicons name="chevron-back" size={23} color='#000' />

                        <Text style={{
                            fontFamily: 'bold',
                            color: colors.BLACK,
                            fontSize: 17,
                            paddingTop: 2
                        }}>Back</Text>

                    </View>
                </TouchableOpacity>
            </View>
            {/* Section 1: Preferences */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferences</Text>

                <View style={styles.optionRow}>
                    <Text style={styles.optionText}>Dark Mode</Text>
                    <Switch
                        value={isDarkMode}
                        onValueChange={setIsDarkMode}
                    />
                </View>

                <View style={styles.optionRow}>
                    <Text style={styles.optionText}>Private Account</Text>
                    <Switch
                        value={isPrivateAccount}
                        onValueChange={setIsPrivateAccount}
                    />
                </View>
            </View>

            {/* Section 2: Navigation Links */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>

                <TouchableOpacity style={styles.linkRow}>
                    <Text style={styles.linkText}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.linkRow}>
                    <Text style={styles.linkText}>Notification Settings</Text>
                </TouchableOpacity>
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    section: {
        marginBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    optionText: {
        fontSize: 16,
    },
    linkRow: {
        paddingVertical: 12,
        borderBottomWidth: 0.5,
        borderColor: '#ccc',
    },
    linkText: {
        fontSize: 16,
        color: '#007AFF',
    },
    logoutButton: {
        marginTop: 'auto',
        paddingVertical: 12,
        alignItems: 'center',
    },
    logoutText: {
        color: 'red',
        fontSize: 16,
        fontWeight: '500',
    },
});
