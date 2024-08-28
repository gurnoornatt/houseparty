import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const DUMMY_USER = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://example.com/profile-picture.jpg',
};

function ProfileScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Image source={{ uri: DUMMY_USER.profilePicture }} style={styles.profilePicture} />
                <Text style={styles.name}>{DUMMY_USER.name}</Text>
                <Text style={styles.email}>{DUMMY_USER.email}</Text>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Edit Profile')}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Change Password')}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Notifications Settings')}>
                    <Text style={styles.buttonText}>Notifications Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Privacy Settings')}>
                    <Text style={styles.buttonText}>Privacy Settings</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity style={styles.button} onPress={() => console.log('Help & Support')}>
                    <Text style={styles.buttonText}>Help & Support</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => console.log('About')}>
                    <Text style={styles.buttonText}>About</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => console.log('Logout')}>
                <Text style={[styles.buttonText, styles.logoutButtonText]}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    email: {
        fontSize: 16,
        color: '#666',
    },
    section: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    button: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    buttonText: {
        fontSize: 16,
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#FF5A5F',
        borderRadius: 5,
        marginHorizontal: 20,
    },
    logoutButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
