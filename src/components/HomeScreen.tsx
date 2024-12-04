import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigatior';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image 
              source={require('../assets/doctor-medical-icon.png')}
              style={styles.image}
            />
            <Text style={styles.text}>Welcome to the <Text style={styles.boldText}>AIDR</Text></Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('SymptomForm')}
            >
                <Text style={styles.buttonText}>GET STARTED</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    text: {
        fontSize: 25,
        marginBottom: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    boldText: {
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#527aba',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default HomeScreen;
