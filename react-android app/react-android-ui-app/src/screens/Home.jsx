import React from 'react';
import { View, Text } from 'react-native';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import '../styles/global.css';

const Home = () => {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 24 }}>Welcome to the Home Screen!</Text>
            </View>
            <BottomNavigation />
        </View>
    );
};

export default Home;