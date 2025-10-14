import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components/common/Button';

const Profile = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>
            <Button title="Edit Profile" onPress={() => alert('Edit Profile Pressed')} />
            {/* Additional profile information can be added here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Profile;