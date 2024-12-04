import React, { useEffect, useState} from "react";
import {
    View, 
    Text, 
    StyleSheet,
    FlatList,
    TouchableOpacity, 
    ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../navigation/AppNavigatior";
import {
    fetchSymptomRecommendations,
    Recommendation,
} from "../services/SymptomService";

type RecommendationsScreenProps = NativeStackScreenProps<RootStackParamList, 'Recommendations'>;

const RecommendationsScreen: React.FC<RecommendationsScreenProps> = ({
    route, 
    navigation
}) => {
    const { category, additionalDetails } = route.params;
    console.log("route params",  route.params);
    
    const [recommendations, setRecommendations] = useState<Recommendation | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchRecommendations();
    }, []);

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            const data = await fetchSymptomRecommendations(category);
            setRecommendations(data);
        } catch (error) {
            setError('Failed to fetch recommendations');
        } finally {
            setLoading(false);
        }
    };

    const getSeverityColor = () => {
        if (additionalDetails.painlevel) {
            const painLevel = parseInt(additionalDetails.painlevel);
            if (painLevel >= 7) return 'red';
            if (painLevel >= 4) return 'yellow';
            return 'green';
        }

        if (additionalDetails.feverDuration) {
            const feverDuration = parseInt(additionalDetails.feverDuration);
            if (feverDuration > 12) return 'red';
            if (feverDuration >= 5) return 'yellow';
            return 'green';
        }

        return 'green'; // Default color if no additional details
    };

    // const renderRecommendations = ({ item }: { item: string }) => (
    //     <View style={styles.recommendationItem}>
    //         <Text style={styles.recommendationText}>. {item}</Text>
    //     </View>
    // );
    const renderRecommendations = ({ item }: { item: string }) => (
        <View style={[styles.recommendationItem, { backgroundColor: getSeverityColor() }]}>
            <Text style={styles.recommendationText}>. {item}</Text>
        </View>
    );


    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#007bff" />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity 
                  style={styles.retryButton}
                  onPress={fetchRecommendations}
                >
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Recommendations for {category}
            </Text>

            {recommendations && (
                <FlatList 
                  data={recommendations}
                  renderItem={renderRecommendations}
                  keyExtractor={(item, index) => index.toString()}
                //   ListHeaderComponent={() => (
                //     <View style={styles.additionalDetailsContainer}>
                //         {recommendations.feverDuration && (
                //             <Text style={styles.detailText}>
                //                 Fever Duration: {recommendations.feverDuration} hours
                //             </Text>
                //         )}
                //         {recommendations.painLevel && (
                //             <Text style={styles.detailText}>
                //                 Pain level: {recommendations.painLevel}/10
                //             </Text>
                //         )}
                //     </View>
                //   )}
                />
            )}

            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => navigation.navigate('Home')}
            >
                <Text style={styles.backButtonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f4f4f4",
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    recommendationItem: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 5,
        borderRadius: 10,
    },
    recommendationText: {
        fontSize: 16,
    },
    additionalDetailsContainer: {
        backgroundColor: '#e6f2ff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        fontSize: 16,
    },
    backButton: {
        backgroundColor: '#527aba',
        padding: 15,
        // borderRadius: 5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
    },
    backButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});


export default RecommendationsScreen;

