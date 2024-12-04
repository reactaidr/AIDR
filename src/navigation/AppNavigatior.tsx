import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../components/HomeScreen";
import SymptomForm from "../components/SymptomForm";
import RecommendationsScreen from "../components/RecommendationsScreen";

export type RootStackParamList = {
    Home: undefined;
    SymptomForm: undefined;
    Recommendations: {
        symptoms: string[];
        category: string;
        additionalDetails: { feverDuration?: string; painlevel?: string };
    };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SymptomForm" component={SymptomForm} options={{ title: 'AIDR'}} />
                <Stack.Screen name="Recommendations" component={RecommendationsScreen} options={{ title: 'Recommendations'}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;